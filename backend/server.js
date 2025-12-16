const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { db } = require('./firebase');
const { z } = require('zod');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Utilities ---
const handleServiceError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ error: message, details: error.message });
};

// --- Routes ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// 2. Auth Placeholder
// Since we are using Firestore "Anonymous/Standard", client usually sends a token.
// For now, we assume public access or we can add a middleware later to verify ID tokens.
// app.use(verifyFirebaseToken); // Future middleware

// 3. User Register (Or just Profile Creation)
app.post('/api/users', async (req, res) => {
  const schema = z.object({
    uid: z.string().min(1),
    ageRange: z.enum(['13-14', '15-16', '17-18']),
    email: z.string().email().optional(),
  });

  try {
    const data = schema.parse(req.body);
    // Create or update user doc
    await db.collection('users').doc(data.uid).set({
      ...data,
      createdAt: new Date().toISOString()
    }, { merge: true });

    res.status(201).json({ message: 'User profile updated', uid: data.uid });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);
    handleServiceError(res, error, 'Failed to create user');
  }
});

// 4. Tracker: Add/Update Entry
app.post('/api/tracker', async (req, res) => {
  // Schema: userId is required to know WHO is tracking
  const schema = z.object({
    userId: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
    isPeriodDay: z.boolean(),
    mood: z.enum(['okay', 'low', 'anxious', 'irritable']).nullable(),
    symptoms: z.array(z.string()),
  });

  try {
    const data = schema.parse(req.body);
    // We can store as a subcollection: users/{userId}/entries/{date}
    // This allows easy querying of "my entries"
    const entryRef = db.collection('users').doc(data.userId).collection('entries').doc(data.date);
    
    await entryRef.set({
      ...data,
      updatedAt: new Date().toISOString()
    });

    res.status(200).json({ message: 'Entry saved', date: data.date });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);
    handleServiceError(res, error, 'Failed to save tracker entry');
  }
});

// 5. Tracker: Get Entries
app.get('/api/tracker/:userId', async (req, res) => {
  try {
    const snapshot = await db.collection('users').doc(req.params.userId).collection('entries').get();
    const entries = [];
    snapshot.forEach(doc => entries.push(doc.data()));
    res.json(entries);
  } catch (error) {
    handleServiceError(res, error, 'Failed to fetch entries');
  }
});

// 6. Feed: Get Questions (Filtered by Age Range)
app.get('/api/feed', async (req, res) => {
  const { ageRange } = req.query;
  console.log(`GET /api/feed called with ageRange: ${ageRange}`); // DEBUG
  try {
    let query = db.collection('questions');
    if (ageRange) {
      query = query.where('ageRange', '==', ageRange);
    }
    
    // REMOVED orderBy('timestamp') to avoid "Index Required" error. 
    // Sorting will happen on client side or we need to create index in Firebase Console.
    const snapshot = await query.get();
    const questions = [];
    
    // We need to fetch answers for these questions efficiently.
    // Ideally, store answerCount on the question doc to avoid extra reads.
    
    snapshot.forEach(doc => {
      questions.push({ id: doc.id, ...doc.data() });
    });

    res.json(questions);
  } catch (error) {
    handleServiceError(res, error, 'Failed to fetch feed');
  }
});

// 7. Feed: Post Question
app.post('/api/feed/questions', async (req, res) => {
  console.log('Received POST /api/feed/questions with body:', req.body); // DEBUG
  const schema = z.object({
    userId: z.string().min(1), // Anonymous ID
    ageRange: z.enum(['13-14', '15-16', '17-18']),
    category: z.string(),
    text: z.string().min(2), // Relaxed from 5 to 2 for testing
  });

  try {
    const data = schema.parse(req.body);
    const newQ = {
      ...data,
      previewText: data.text.length > 80 ? data.text.substring(0, 80) + '...' : data.text,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
      isExpired: false,
      answerCount: 0 // Initialize count
    };

    const docRef = await db.collection('questions').add(newQ);
    console.log('Document written with ID: ', docRef.id);
    res.status(201).json({ id: docRef.id, ...newQ });
  } catch (error) {
    console.error('Error adding question:', error);
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);
    handleServiceError(res, error, 'Failed to post question');
  }
});

// 8. Feed: Get Answers for a Question
app.get('/api/feed/questions/:questionId/answers', async (req, res) => {
  try {
    const snapshot = await db.collection('questions')
      .doc(req.params.questionId)
      .collection('answers')
      .orderBy('helpfulCount', 'desc')
      .limit(20)
      .get();
      
    const answers = [];
    snapshot.forEach(doc => answers.push({ id: doc.id, ...doc.data() }));
    res.json(answers);
  } catch (error) {
    handleServiceError(res, error, 'Failed to fetch answers');
  }
});

// 9. Feed: Post Answer
app.post('/api/feed/questions/:questionId/answers', async (req, res) => {
  const schema = z.object({
    userId: z.string().min(1),
    text: z.string().min(1),
  });

  try {
    const data = schema.parse(req.body);
    const questionRef = db.collection('questions').doc(req.params.questionId);
    
    // Use transaction to update count
    await db.runTransaction(async (t) => {
      const qDoc = await t.get(questionRef);
      if (!qDoc.exists) throw new Error('Question not found');
      
      const newAnswerRef = questionRef.collection('answers').doc();
      t.set(newAnswerRef, {
        ...data,
        helpfulCount: 0,
        createdAt: new Date().toISOString()
      });
      
      // Increment answer count
      const currentCount = qDoc.data().answerCount || 0;
      t.update(questionRef, { answerCount: currentCount + 1 });
    });

    res.status(201).json({ message: 'Answer posted' });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);
    handleServiceError(res, error, 'Failed to post answer');
  }
});

// 10. Feed: Toggle Helpful Vote
app.post('/api/feed/questions/:questionId/answers/:answerId/helpful', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const answerRef = db.collection('questions').doc(req.params.questionId)
    .collection('answers').doc(req.params.answerId);
  const voteRef = db.collection('votes').doc(`${userId}_${req.params.answerId}`);

  try {
    await db.runTransaction(async (t) => {
      const voteDoc = await t.get(voteRef);
      const answerDoc = await t.get(answerRef);

      if (!answerDoc.exists) throw new Error('Answer not found');

      const currentHelpful = answerDoc.data().helpfulCount || 0;

      if (voteDoc.exists) {
        // Remove vote
        t.delete(voteRef);
        t.update(answerRef, { helpfulCount: Math.max(0, currentHelpful - 1) });
        return { action: 'removed' };
      } else {
        // Add vote
        t.set(voteRef, {
          userId,
          answerId: req.params.answerId,
          questionId: req.params.questionId,
          timestamp: Date.now()
        });
        t.update(answerRef, { helpfulCount: currentHelpful + 1 });
        return { action: 'added' };
      }
    });

    res.json({ message: 'Vote updated' });
  } catch (error) {
    handleServiceError(res, error, 'Failed to toggle vote');
  }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on http://0.0.0.0:${PORT}`);
});
