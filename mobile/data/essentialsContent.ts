export const essentialsContent = {
    products: [
        {
            id: 'pads',
            title: 'Pads',
            icon: '🤍',
            image: require('../assets/pad.png'),
            description: 'Worn inside your underwear to absorb flow.',
            sections: {
                what: 'Pads are soft, absorbent layers that you stick to the inside of your underwear. They catch your period flow after it leaves your body.',
                types: [
                    'Thinner pads (for lighter days)',
                    'Thicker / Maxi pads (for heavy flow)',
                    'Pads with wings (to help them stay in place)',
                    'Reusable cloth pads (washable)'
                ],
                usage: 'You peel off the backing strip and stick the pad to your underwear. People usually change them every 4-8 hours to stay comfortable and dry.',
                why: 'Some people choose pads because they are easy to use and you don\'t have to insert anything inside your body.',
                reminder: 'It takes a few tries to place it perfectly comfortable. That is totally normal.'
            },
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
            icon: '🔹',
            image: require('../assets/tampon.png'),
            description: 'Worn inside the body to absorb flow.',
            sections: {
                what: 'Tampons are small plugs made of soft cotton-like material. You gently insert them inside your vagina to absorb flow before it leaves your body.',
                types: [
                    'Applicator tampons (have a plastic or cardboard tube helper)',
                    'Non-applicator tampons (you use your finger to push them in)',
                    'Different absorbencies (Light, Regular, Super)'
                ],
                usage: 'You insert the tampon gently, leaving the string hanging outside so you can pull it out later. They should be changed every 4-8 hours.',
                why: 'Some people like them because you can swim while wearing them, and they don\'t feel bulky in your underwear.',
                reminder: 'If it hurts, it might be in slightly wrong, or you might be incorrect size. It is okay to take it out and try again later.'
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
            icon: '🏆',
            image: require('../assets/cup.png'),
            description: 'A small cup that collects flow instead of absorbing it.',
            sections: {
                what: 'A menstrual cup is a small, flexible bell-shaped cup usually made of silicone. It sits inside your vagina and collects the blood.',
                types: [
                    'Different sizes (usually A or B depending on age/birth history)',
                    'Different firmness levels (soft vs firm)',
                    'Different stem shapes (to help you grip it)'
                ],
                usage: 'You fold the cup, insert it, and it pops open to create a seal. You take it out, empty it into the toilet, wash it, and put it back in.',
                why: 'They are reusable for years (eco-friendly) and can be worn for up to 12 hours.',
                reminder: 'There is a learning curve. Getting the hang of it can take a few cycles. Be patient with yourself.'
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
            icon: '◎',
            image: require('../assets/disc.png'),
            description: 'Similar to cups but sits differently inside.',
            sections: {
                what: 'A disc collects flow like a cup but sits higher up, right under your cervix.',
                types: [
                    'Disposable discs (single use)',
                    'Reusable silicone discs'
                ],
                usage: 'You pinch it in half and slide it back. To remove, you hook your finger under the rim and pull it out.',
                why: 'Some people find them more comfortable than cups because they rely on anatomy rather than suction to stay in place.',
                reminder: 'Removing them can be a little messier than pads. It helps to practice at home.'
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
            icon: '🩲',
            image: require('../assets/underwear.png'),
            description: 'Underwear that absorbs flow directly.',
            sections: {
                what: 'These look and feel like regular underwear but have special absorbent layers built in.',
                types: [
                    'Light absorbency (for spotting or backup)',
                    'Heavy absorbency (can replace pads/tampons)',
                    'Different styles (bikini, brief, boy short)'
                ],
                usage: 'You wear them just like regular underwear. Afterward, you rinse them in cold water and then wash them in the machine.',
                why: 'They feel very secure and you don\'t have to adjust anything during the day.',
                reminder: 'They can feel a tiny bit thicker than regular underwear, but usually not much.'
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
            icon: '🔥',
            image: null,
            description: 'Used to help soothe cramps.',
            sections: {
                what: 'Heat helps relax the muscles in your uterus that are causing cramps.',
                types: [
                    'Electric heating pads',
                    'Hot water bottles',
                    'Stick-on heat patches (wearable under clothes)'
                ],
                usage: 'Place it gently on your lower belly or lower back. Don\'t put it directly on skin if it\'s very hot—use a layer of clothes in between.',
                why: 'It is a non-medicine way to feel a lot cleaner and more comfortable.',
                reminder: 'Warm baths or showers work the same way!'
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
            title: 'The Menstrual Cycle',
            content: 'Your cycle is more than just your period. It\'s a continuous loop of hormones changing. Usually, it lasts about a month (`21-35 days`).\n\n1. **Menstruation (The Period):** The lining of the uterus sheds.\n2. **Follicular Phase:** The body prepares an egg.\n3. **Ovulation:** An egg is released.\n4. **Luteal Phase:** The body waits to see if pregnancy happened. If not, the cycle starts over.',
            note: 'Every body follows its own rhythm. Irregular cycles are very common, specially in the first few years.'
        },
        discharge: {
            title: 'Vaginal Discharge',
            content: 'Discharge is healthy fluid that keeps your vagina clean and moist. It changes throughout your cycle.',
            types: [
                '**Clear & Stretchy:** Often happens in the middle of your cycle (near ovulation).',
                '**White or Creamy:** Common at the beginning or end of your cycle.',
                '**Slightly Yellow (when dry):** Normal when it dries on underwear.'
            ],
            reminder: 'Bodies change everyday. Discharge can look different at different times, and that is just your body doing its job.'
        }
    },
    stainRemoval: [
        {
            title: 'Act Fast',
            text: 'The sooner you get to the stain, the easier it is to remove. But don\'t panic if it\'s dried—it just takes a bit more patience.'
        },
        {
            title: 'Cold Water Only',
            text: 'Always rinse blood with **COLD** water. Hot water "cooks" the proteins and sets the stain in, making it harder to get out.'
        },
        {
            title: 'Soap & Soak',
            text: 'Gently rub some hand soap or laundry detergent into the spot. Let it soak in cold water for 15-30 minutes.'
        },
        {
            title: 'Machine Wash',
            text: 'After rinsing and soaking, you can toss it in the washing machine like normal.'
        },
        {
            title: 'Be Kind to Yourself',
            text: 'Leaks happen to literally everyone. It\'s not messy or "gross"—it\'s just biology. A stain doesn\'t ruin your day.'
        }
    ]
};
