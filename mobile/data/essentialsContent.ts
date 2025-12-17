export const essentialsContent = {
    products: [
        {
            id: 'pads',
            title: 'Pads',
            teaser: 'Different options for different days', // NEW
            icon: '🤍',
            image: require('../assets/icon-pad.png'),
            sections: {
                // ... (sections content unchanged)
                // Orientation (What this is)
                orientation: 'Pads are worn outside the body to absorb menstrual flow. They come in different shapes and sizes, and people choose them for different reasons.',

                // Variations (Exploration)
                variations: [
                    { label: 'Thinner pads', desc: 'Some people use these on lighter days.' },
                    { label: 'Thicker pads', desc: 'Often used for heavy flow or overnight.' },
                    { label: 'With wings', desc: 'Wraps around underwear to stay in place.' },
                    { label: 'Reusable', desc: 'Washable cloth options that last for years.' }
                ],

                // Usage (Experience-based, NOT instructions)
                usage: 'People usually change pads when they feel uncomfortable or when it feels full. This is often every 4 to 8 hours to stay dry.',

                // Feeling (Emotional framing)
                feeling: 'Some people feel more secure using pads because nothing goes inside the body. Others like that they are easy to check quickly.',

                // Normalization (Reassurance)
                normalization: 'There’s no "right" option — people switch preferences over time depending on what feels best.'
            },
            // KEEPING TUTORIALS for hidden toggle
            tutorial: [
                'Unwrap the pad from its wrapper',
                'Peel off the paper backing strip to reveal the sticky side',
                'If your pad has wings, unfold them',
                'Place the sticky side down onto the center of your underwear',
                'If there are wings, wrap them around the sides of your underwear and press to stick',
                'When it\'s time to change, roll it up in toilet paper or the wrapper and dispose of it'
            ]
        },
        {
            id: 'tampons',
            title: 'Tampons',
            teaser: 'Worn inside for freedom of movement',
            icon: '🔹',
            image: require('../assets/tampoon.png'),
            sections: {
                orientation: 'Tampons are small plugs made of soft material that absorb flow inside the body before it leaves.',
                variations: [
                    { label: 'Applicator', desc: 'Has a smooth tube helper for insertion.' },
                    { label: 'Non-applicator', desc: 'Uses your finger to guide it in (less waste).' },
                    { label: 'different sizes', desc: 'Light, Regular, or Super absorbency.' }
                ],
                usage: 'They are worn inside the vagina with a string hanging out. People usually change them every 4 to 8 hours.',
                feeling: 'Some people prefer them because they aren\'t bulky. You can swim, run, and play sports without feeling them.',
                normalization: 'It takes practice to get comfortable with them. If it hurts, it might just be the wrong angle.'
            },
            tutorial: [
                'Wash your hands',
                'Unwrap the tampon',
                'Hold the applicator where the smaller tube meets the larger tube',
                'Relax and find a comfortable position (sitting or standing with one leg up)',
                'Gently insert the applicator, angling it toward your lower back',
                'Push the smaller tube until it\'s fully inside the larger tube',
                'Remove the applicator, leaving the string hanging outside',
                'To remove, gently pull the string downward'
            ]
        },
        {
            id: 'cups',
            title: 'Menstrual Cups',
            teaser: 'Reusable, longer-wear option',
            icon: '🏆',
            image: require('../assets/cups.png'),
            sections: {
                orientation: 'A small flexible cup made of silicone. It sits inside the vagina and collects flow instead of absorbing it.',
                variations: [
                    { label: 'Soft vs Firm', desc: 'Softer can be more comfortable, firmer pops open easier.' },
                    { label: 'Stem shapes', desc: 'Rings, stems, or balls to help grip for removal.' },
                    { label: 'Sizes', desc: 'Usually Size A or B depending on age/birth history.' }
                ],
                usage: 'It can be worn for up to 12 hours. You empty it into the toilet, rinse it, and put it back in.',
                feeling: 'Many people like that they don\'t have to change it as often during the school day. It feels very clean.',
                normalization: 'There is a learning curve. It is normal for it to take a few cycles to get the hang of it.'
            },
            tutorial: [
                'Wash your hands and the cup',
                'Fold the cup (try a C-fold or punch-down fold)',
                'Find a comfortable position',
                'Relax and gently insert the folded cup',
                'Let it pop open inside (you might feel or hear a small pop)',
                'Run your finger around the base to make sure it\'s fully open',
                'To remove: wash hands, bear down slightly, pinch the base to release suction, and gently pull out',
                'Empty into toilet, rinse, and reinsert'
            ]
        },
        {
            id: 'discs',
            title: 'Menstrual Discs',
            teaser: 'Sits differently for anatomy-based fit',
            icon: '◎',
            image: require('../assets/disk.png'),
            sections: {
                orientation: 'Similar to a cup but sits higher up, right under the cervix. It stays in place behind the pubic bone.',
                variations: [
                    { label: 'Disposable', desc: 'Single-use, looks like soft plastic film.' },
                    { label: 'Reusable', desc: 'Silicone disc that lasts for years.' }
                ],
                usage: 'It can also be worn for 12 hours. Removal involves hooking a finger under the rim.',
                feeling: 'Some people find them more comfortable than cups because they don\'t use suction to stay in place.',
                normalization: 'Removal can be a little messier than pads at first. Practicing at home helps.'
            },
            tutorial: [
                'Wash your hands',
                'Squeeze the disc in half lengthwise',
                'Find a comfortable position',
                'Insert the disc, pushing it back and down',
                'Tuck the front rim up behind your pubic bone',
                'To remove: hook your finger under the front rim and gently pull down and out',
                'Empty, rinse (if reusable), and reinsert or dispose'
            ]
        },
        {
            id: 'underwear',
            title: 'Period Underwear',
            teaser: 'Feels just like regular clothes',
            icon: '🩲',
            image: null,
            sections: {
                orientation: 'Looks just like regular underwear but has special absorbent layers built in to catch flow.',
                variations: [
                    { label: 'Light flow', desc: 'Good for backup or spotting.' },
                    { label: 'Heavy flow', desc: 'Can replace pads or tampons completely.' },
                    { label: 'Styles', desc: 'Bikini, boyshort, brief.' }
                ],
                usage: 'You wear them all day like normal underwear, then rinse in cold water and machine wash.',
                feeling: 'Very secure. You don\'t have to adjust anything or carry wrappers to the bathroom.',
                normalization: 'They can feel a tiny bit thicker than normal underwear, but usually people forget they are wearing them.'
            },
            tutorial: [
                'Put them on just like regular underwear',
                'Wear throughout the day (check absorbency level for your flow)',
                'When ready to change, remove like normal underwear',
                'Rinse in cold water until water runs clear',
                'Wash in washing machine (follow care instructions)',
                'Hang dry or tumble dry on low',
                'Store clean and dry until next use'
            ]
        },
        {
            id: 'heat',
            title: 'Heating Pads',
            teaser: 'Soothing comfort for cramps',
            icon: '🔥',
            image: require('../assets/heating pads.png'),
            sections: {
                orientation: 'Heat helps relax the muscles in the uterus that cause cramps.',
                variations: [
                    { label: 'Electric pad', desc: 'Plugs into the wall.' },
                    { label: 'Hot water bottle', desc: 'Filled with warm water.' },
                    { label: 'Stick-on patch', desc: 'Warm patch worn under clothes at school.' }
                ],
                usage: 'Placed gently on the lower belly or lower back for 15-20 minutes.',
                feeling: 'It creates a warm, cozy feeling that can make cramps hurt less.',
                normalization: 'Non-medicine ways to feel better are very powerful.'
            },
            tutorial: [
                'Choose your heat source (electric pad, hot water bottle, or heat patch)',
                'If using electric: plug in and set to desired temperature',
                'If using hot water bottle: fill with hot (not boiling) water and seal tightly',
                'If using heat patch: peel backing and stick to underwear or clothing',
                'Place on lower belly or lower back where you feel cramping',
                'Use for 15-20 minutes at a time',
                'Take breaks to avoid skin irritation'
            ]
        }
    ],
    reproductiveHealth: {
        cycle: {
            title: 'Understanding Your Body', // NEW Title
            teaser: 'Why things change over time', // New Teaser
            // State-based tiles logic
            states: [
                {
                    title: 'Before your period',
                    text: 'Some people notice mood changes, feeling tired, or skin changes. Energy might feel lower.'
                },
                {
                    title: 'During your period',
                    text: 'Rest and comfort often matter more. You might feel relief as hormones shift.'
                },
                {
                    title: 'After your period',
                    text: 'Some people feel lighter, more energetic, and more social.'
                },
                {
                    title: 'Between cycles',
                    text: 'Things often feel more steady and balanced.'
                }
            ],
            normalization: 'Every body follows its own rhythm. Irregular cycles are very common, especially in the first few years.'
        },
        discharge: {
            title: 'Vaginal Discharge',
            teaser: 'Healthy patterns to know',
            // Pattern-based logic
            patterns: [
                {
                    label: 'Clear & Stretchy',
                    desc: 'Often happens in the middle of your cycle. It is healthy.'
                },
                {
                    label: 'White or Creamy',
                    desc: 'Very common for many people at different times.'
                },
                {
                    label: 'Slightly Yellow',
                    desc: 'Can look this way when it dries on underwear.'
                }
            ],
            normalization: 'Bodies change everyday. Variation is healthy and just your body doing its job.'
        }
    },
    stainRemoval: [
        {
            id: 'fresh',
            title: 'Fresh Stains',
            subtitle: 'Best results',
            steps: [
                'Rinse the stained area with cold water as soon as possible',
                'Let the water run through the fabric from the back of the stain',
                'Gently rub the fabric together to loosen the stain',
                'Wash as usual after rinsing'
            ],
            goodToKnow: 'Hot water can set stains, so cold water works better first.'
        },
        {
            id: 'dried',
            title: 'Dried Stains',
            subtitle: 'Already set',
            steps: [
                'Soak the fabric in cold water for 30–60 minutes',
                'Apply a small amount of gentle soap or detergent to the stain',
                'Gently rub the area using your fingers',
                'Rinse with cold water',
                'Repeat if needed before washing'
            ],
            goodToKnow: 'Dried stains can take more than one try — that’s normal.'
        },
        {
            id: 'soap',
            title: 'Using Soap or Detergent',
            subtitle: '',
            steps: [
                'Wet the stained area with cold water',
                'Apply a small amount of mild soap or laundry detergent',
                'Gently rub until the stain starts to fade',
                'Rinse thoroughly with cold water'
            ],
            goodToKnow: 'Gentle soaps work well and are safer for most fabrics.'
        },
        {
            id: 'scrub',
            title: 'Gentle Scrubbing',
            subtitle: 'For tougher stains',
            steps: [
                'Wet the stain with cold water',
                'Apply soap or detergent',
                'Use a soft brush or clean cloth',
                'Rub gently in small circles',
                'Rinse and check before washing'
            ],
            goodToKnow: 'Be gentle — rough scrubbing can damage fabric.'
        },
        {
            id: 'prewash',
            title: 'Before Putting It in the Wash',
            subtitle: '',
            steps: [
                'Check that the stain is mostly gone',
                'If it’s still visible, repeat the steps above',
                'Wash only after the stain has faded'
            ],
            goodToKnow: 'Dryers can lock in stains if they aren’t fully removed.'
        },
        {
            id: 'reassurance',
            title: 'Reassurance',
            subtitle: 'Always visible',
            steps: [], // Empty steps means it's a static card
            goodToKnow: 'Stains happen to a lot of people. It doesn’t mean you did anything wrong.'
        }
    ]
};
