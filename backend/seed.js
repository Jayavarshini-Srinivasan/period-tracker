const { db } = require('./firebase');

const seedData = async () => {
  const questions = [
    {
      ageRange: '15-16',
      category: 'Periods',
      text: 'Is it normal for periods to be irregular in the first year?',
      timestamp: Date.now() - 3600000,
      answers: [
        {
          text: 'Yes, totally normal! It can take a year or two for your cycle to become more regular. Your body is still figuring things out.',
          helpfulCount: 12,
        },
        {
          text: 'It was like that for me too. Some months were closer together, some further apart. It eventually evened out.',
          helpfulCount: 8,
        },
      ],
    },
    {
      ageRange: '13-14',
      category: 'Symptoms',
      text: 'Why do I feel so tired the day before my period starts?',
      timestamp: Date.now() - 7200000,
      answers: [
        {
          text: "Hormones can make you feel more tired. It's really common and nothing to worry about. Rest when you need to.",
          helpfulCount: 5,
        },
      ],
    },
    {
      ageRange: '17-18',
      category: 'Managing',
      text: 'What do you do when cramps wake you up at night?',
      timestamp: Date.now() - 86400000,
      answers: [
        {
          text: 'I keep a heating pad by my bed. Sometimes just moving around gently helps too.',
          helpfulCount: 15,
        },
        {
          text: 'Drinking water and trying to relax my body usually helps me. Deep breathing too.',
          helpfulCount: 7,
        },
      ],
    },
  ];

  console.log('Seeding data...');

  for (const q of questions) {
    const qData = {
      text: q.text,
      previewText: q.text,
      category: q.category,
      ageRange: q.ageRange,
      timestamp: q.timestamp,
      createdAt: new Date().toISOString(),
      isExpired: false,
      answerCount: q.answers.length,
      userId: 'seed_user', // anonymous
    };

    const docRef = await db.collection('questions').add(qData);
    console.log(`Added question: ${docRef.id}`);

    for (const a of q.answers) {
      await docRef.collection('answers').add({
        text: a.text,
        helpfulCount: a.helpfulCount,
        isHelpfulByUser: false,
        userId: 'seed_helper',
        createdAt: new Date().toISOString(),
      });
    }
  }

  console.log('Done!');
  process.exit(0);
};

seedData().catch(console.error);
