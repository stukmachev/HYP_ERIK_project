'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Activities', [
      {
        activity_category_id: 1,
        name: 'Vinyasa Flow',
        description: 'Vinyasa Flow is a vibrant and invigorating yoga practice that synchronizes breath with fluid movement. This dynamic sequence of postures creates a meditative flow that builds internal heat, enhances cardiovascular health, strengthens muscles, and increases flexibility. Ideal for practitioners seeking a lively, expressive, and creative yoga journey, Vinyasa offers both physical challenge and mental clarity.',
        photos: JSON.stringify([{ path: 'img/activities/vinyasa1.png', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [
            'Boosts cardiovascular endurance through rhythmic sequences',
            'Enhances core and full-body strength',
            'Deepens the connection between body, breath, and mind',
            'Improves balance, agility, and posture'
          ],
          bring_with_you: [
            'Comfortable yoga mat for seamless transitions',
            'Reusable water bottle to stay hydrated',
            'Sweat towel for cooling down after intense flows'
          ]
        }),


      highlighted: true,
        promotional_text: '<b>Ignite your energy</b> with <i>Vinyasa Flow</i> — <b>move, breathe, transform</b>!'
      },
      {
        activity_category_id: 1,
        name: 'Hatha Yoga Basics',
        description: 'Hatha Yoga is a grounding and restorative practice that emphasizes mindful movement, controlled breathing, and static postures. Designed to align and calm the body, mind, and spirit, it offers a slower-paced experience that’s perfect for beginners or anyone seeking balance, stress relief, and increased awareness. With a focus on proper alignment and breath control, Hatha Yoga nurtures both strength and serenity.',
        photos: JSON.stringify([{ path: 'img/activities/hatha1.png', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: ['Improves posture and body alignment',
            'Promotes mental clarity and stress reduction',
            'Increases flexibility and joint mobility',
            'Builds foundational strength and balance'],
          bring_with_you: ['Yoga mat with good grip for stability',
            'Comfortable clothing for ease of movement',
            'Water bottle to stay hydrated throughout the session']
        }),
        highlighted: false
      },
      {
        activity_category_id: 2,
        name: 'Meditation & Mindfulness',
        description: 'Meditation & Mindfulness offers a serene journey inward, guiding practitioners toward greater mental clarity, emotional balance, and present-moment awareness. This practice focuses on breath, stillness, and guided introspection to calm the nervous system, reduce stress, and cultivate lasting inner peace. Perfect for anyone seeking mental well-being, stress relief, or a deeper connection to self in a tranquil, supportive environment.',
          photos: JSON.stringify([{ path: 'img/activities/meditation1.png', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: ['Reduces anxiety, stress, and mental fatigue',
            'Enhances focus, concentration, and emotional resilience',
            'Supports restful sleep and overall well-being',
            'Promotes awareness and self-compassion'],
          bring_with_you: ['Comfortable cushion or meditation bench',
            'Light blanket or shawl for warmth',
            'Journal or notebook for post-session reflections']
        }),
        highlighted: true,
        promotional_text: '<b>Discover inner peace</b> through <i>Mindfulness Meditation</i> — <b>calm your mind</b> and awaken your soul.'
      },
      {
        activity_category_id: 1,
        name: 'Power Yoga',
        description: 'Power Yoga is a vigorous, fitness-based approach to yoga that blends strength, flexibility, and endurance into one dynamic practice. With powerful sequences and a faster pace, it’s designed to build heat, tone the body, and sharpen mental focus. Ideal for those who love a challenge, Power Yoga pushes physical limits while grounding the mind through breath and discipline.',
        photos: JSON.stringify([{ path: 'img/activities/power1.png', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: ['Builds full-body strength and muscular endurance',
            'Boosts metabolism and cardiovascular fitness',
            'Enhances focus and mental toughness',
            'Supports weight management and body toning'],
          bring_with_you: ['Non-slip yoga mat for high-intensity movement',
            'Water bottle to stay well-hydrated',
            'Towel to manage sweat during practice']
        }),
        highlighted: false
      },
      {
        activity_category_id: 2,
        name: 'Sound Healing Meditation',
        description: 'Sound Healing Meditation is a deeply soothing experience that uses harmonic vibrations from instruments like singing bowls, gongs, and chimes to promote relaxation, balance, and healing. As sound waves gently wash over the body and mind, they help release tension, lower stress levels, and guide participants into a meditative, restorative state. Perfect for anyone seeking emotional release, energetic alignment, or simply deep rest.',
        photos: JSON.stringify([{ path: 'img/activities/sound1.png', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Reduces stress and promotes emotional healing',
            'Balances energy and clears mental blockages',
            'Improves sleep and supports deep relaxation',
            'Enhances meditation through sound-induced focus'],
          bring_with_you: ['Yoga mat or blanket to lie down comfortably',
            'Eye mask for deeper sensory relaxation',
            'Water bottle to hydrate after the session']
        }),
        highlighted: true,
        promotional_text: '<b>Heal your soul</b> with the <i>vibrations of sound</i> — <b>relax, release, renew</b>.'
      },
      {
        activity_category_id: 3,
        name: 'Yoga Nidra',
        description: 'Yoga Nidra, often called "yogic sleep", is a guided meditation practice that leads you into a state between wakefulness and sleep. Through deep body awareness and visualization, it activates the parasympathetic nervous system, promoting profound physical and mental relaxation. Ideal for relieving stress, improving sleep quality, and restoring inner balance, Yoga Nidra is a transformative journey inward — accessible to all levels and needs.',
        photos: JSON.stringify([{ path: 'img/activities/nidra1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: ['Promotes deep relaxation and stress release',
            'Improves sleep and combats insomnia',
            'Supports emotional healing and inner clarity',
            'Balances the nervous system and calms the mind'],
          bring_with_you: [ 'Comfortable mat or padded surface for lying down',
            'Blanket or shawl for warmth',
            'Optional: eye mask or bolster for added comfort']
        }),
        highlighted: false
      },
      {
        activity_category_id: 1,
        name: 'Ashtanga Yoga Primary Series',
        description: 'Ashtanga Yoga is a rigorous and structured style of yoga that follows a set sequence of postures linked by breath and movement. Known for its discipline and intensity, it builds strength, flexibility, and stamina while cultivating inner focus and resilience. This practice is ideal for those who appreciate consistency, challenge, and personal growth through a physically demanding yet deeply meditative flow.',
        photos: JSON.stringify([{ path: 'img/activities/ashtanga1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: ['Enhances physical strength, endurance, and flexibility',
            'Improves breath control and energy flow',
            'Cultivates discipline and mental clarity',
            'Promotes detoxification through heat and movement'],
          bring_with_you: ['Durable, non-slip yoga mat',
            'Towel for sweat and a change of clothes if needed',
            'Water bottle to rehydrate after class']
        }),
        highlighted: false
      },
      {
        activity_category_id: 3,
        name: 'Breathwork for Stress Relief',
        description: 'Breathwork for Stress Relief is a gentle yet powerful practice that uses conscious breathing techniques to release tension, calm the nervous system, and restore emotional balance. By regulating the breath, participants experience reduced anxiety, increased clarity, and a sense of grounded calm. This practice is accessible to all and is especially supportive for those navigating stress, overwhelm, or emotional fatigue.',
        photos: JSON.stringify([{ path: 'img/activities/breathwork1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: ['Reduces anxiety, overwhelm, and chronic stress',
            'Regulates the nervous system and improves emotional resilience',
            'Increases mental clarity and focus',
            'Supports relaxation and a sense of inner peace'],
          bring_with_you: ['Yoga mat or cushion for seated or lying-down comfort',
            'Blanket or shawl for warmth during stillness',
            'Notebook for post-session reflections if desired']
        }),
        highlighted: true,
        promotional_text: '<h2>✨ Breathwork for Stress Relief ✨</h2>\n' +
            '  <p><strong>Feeling overwhelmed?</strong> Breathe your way to calm with our guided breathwork sessions designed to reduce stress, clear your mind, and restore inner balance.</p>\n' +
            '  <p><em>Experience the power of breath in a safe, supportive space.</em></p>\n' +
            '  <ul>\n' +
            '    <li>🧘‍♀️ Learn calming breathing techniques</li>\n' +
            '    <li>🌿 Reduce anxiety and tension</li>\n' +
            '    <li>💬 Guided by certified instructors</li>\n' +
            '  </ul>\n' +
            '  <p><strong>Bring a friend and both get <span style="color: purple;">15% OFF</span> your first class!</strong></p>'
      },
      {
        activity_category_id: 1,
        name: 'Morning Stretch Yoga',
        description: 'Morning Stretch Yoga is a gentle, revitalizing practice designed to awaken the body and mind at the start of your day. Through slow, intentional movements and deep stretching, it helps release overnight stiffness, improve circulation, and set a positive, grounded tone for the hours ahead. Perfect for all levels, this session brings lightness, clarity, and energy into your morning routine.',
        photos: JSON.stringify([{ path: 'img/activities/stretch1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Gently awakens muscles and joints',
            'Improves circulation and energy flow',
            'Enhances flexibility and posture awareness',
            'Promotes a calm, focused mindset to start the day'],
          bring_with_you: ['Yoga mat for gentle movements and stretches',
            'Comfortable, breathable clothing',
            'Water bottle to hydrate after your morning flow']
        }),
        highlighted: false
      },
      {
        activity_category_id: 2,
        name: 'Chakra Activation Yoga',
        description: 'Chakra Activation Yoga is a deeply energizing and harmonizing practice that combines breathwork, movement, sound, and meditation to awaken and balance the body’s seven energy centers. Each session focuses on aligning physical, emotional, and spiritual well-being, guiding participants through postures and techniques designed to activate each chakra. Ideal for those seeking inner alignment, emotional healing, and elevated awareness.',
        photos: JSON.stringify([{ path: 'img/activities/chakra1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Balances and energizes the seven chakras',
            'Enhances emotional stability and mental clarity',
            'Promotes energetic alignment and inner healing',
            'Supports spiritual awareness and personal growth'],
          bring_with_you: [ 'Yoga mat and optional bolster or cushion',
            'Water bottle to stay hydrated',
            'Journal for personal insights or post-session notes']
        }),
        highlighted: true,
        promotional_text: '<h2>🌈 Chakra Activation Yoga – 50% OFF!</h2>\n' +
            '  <p><strong>Awaken your energy centers</strong> and elevate your well-being through our transformative Chakra Activation Yoga program.</p>\n' +
            '  <p><em>Balance your body, mind, and spirit with weekly sessions guided by expert instructors.</em></p>\n' +
            '  <ul>\n' +
            '    <li>🌀 Deep chakra alignment</li>\n' +
            '    <li>✨ Weekly guided sessions</li>\n' +
            '    <li>💫 Emotional and energetic healing</li>\n' +
            '  </ul>\n' +
            '  <p><strong>Sign up for a <span style="color: purple;">1-year pass</span> and get <span style="color: darkred;">50% OFF</span>!</strong></p>'
      },
      {
        activity_category_id: 1,
        name: 'Prenatal Yoga',
        description: 'Prenatal Yoga is a gentle, empowering practice designed specifically for expectant mothers to support physical health, emotional well-being, and deep connection with the growing baby. Through modified postures, breathwork, and relaxation techniques, it helps relieve common pregnancy discomforts, build strength for childbirth, and promote calmness during all stages of pregnancy. This class creates a safe and supportive space to move, breathe, and bond.',
        photos: JSON.stringify([{ path: 'img/activities/prenatal1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Relieves pregnancy-related tension and discomfort',
            'Supports pelvic strength and posture',
            'Promotes relaxation and better sleep',
            'Fosters emotional connection with baby and body awareness'],
          bring_with_you: [ 'Yoga mat and any pregnancy-safe props (bolster, block)',
            'Water bottle for hydration',
            'Comfortable, stretchy clothing that accommodates movement']
        }),
        highlighted: false
      },
      {
        activity_category_id: 3,
        name: 'Meditative Walking Yoga',
        description: 'Meditative Walking Yoga blends the principles of mindful walking with gentle, intentional movement and breath awareness. Practiced slowly and in silence, it invites participants to connect deeply with the rhythm of their steps, the sensations of the body, and the surrounding environment. This practice is ideal for cultivating presence, grounding energy, and finding calm through movement in nature or peaceful indoor settings.',
        photos: JSON.stringify([{ path: 'img/activities/walking1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Enhances mindfulness through movement',
            'Promotes grounding and emotional balance',
            'Improves coordination and body awareness',
            'Reduces mental clutter and fosters inner stillness'],
          bring_with_you: [ 'Comfortable walking shoes or barefoot-friendly environment',
            'Weather-appropriate clothing if practiced outdoors',
            'Water bottle to stay hydrated after your walk']
        }),
        highlighted: false
      },
      {
        activity_category_id: 2,
        name: 'Kundalini Awakening Yoga',
        description: 'Kundalini Awakening Yoga is a transformative practice that combines dynamic movement, breathwork (pranayama), chanting (mantras), and meditation to awaken the dormant spiritual energy known as Kundalini. This practice aims to elevate consciousness, balance the chakras, and ignite deep inner awareness. Powerful and deeply purifying, it’s ideal for those seeking spiritual growth, emotional release, and energetic renewal.',
        photos: JSON.stringify([{ path: 'img/activities/kundalini1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Stimulates spiritual awakening and higher consciousness',
            'Cleanses and balances the chakra system',
            'Boosts vitality and mental clarity',
            'Releases emotional blockages and promotes deep transformation'],
          bring_with_you: [ 'Yoga mat and cushion for seated kriyas and meditation',
            'Light shawl or scarf for comfort during stillness',
            'Water bottle to hydrate after intense breathwork']
        }),
        highlighted: true,
        promotional_text: '<b>Awaken your potential</b> through <i>Kundalini Yoga</i> — <b>rise your spirit</b>!'
      },
      {
        activity_category_id: 1,
        name: 'Yoga for Flexibility',
        description: 'Yoga for Flexibility is a gentle and effective practice designed to lengthen muscles, open joints, and release physical tension. Through deep stretches, mindful movement, and focused breathwork, this class helps improve your range of motion and body awareness over time. It’s perfect for beginners, athletes, or anyone seeking to move with greater ease and comfort in daily life.',
        photos: JSON.stringify([{ path: 'img/activities/flexibility1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Increases muscle and joint flexibility',
            'Improves posture and mobility',
            'Reduces stiffness and enhances circulation',
            'Supports relaxation and body awareness'],
          bring_with_you: ['Yoga mat with a good grip',
            'Yoga strap or block for deeper stretches (optional)',
            'Comfortable clothing that allows free movement']
        }),
        highlighted: false
      },
      {
        activity_category_id: 1,
        name: 'Restorative Yoga',
        description: 'Restorative Yoga is a deeply relaxing and meditative practice that uses supportive props and prolonged holds to promote healing, recovery, and inner stillness. With minimal movement and an emphasis on comfort, it allows the body to fully surrender, releasing tension and activating the parasympathetic nervous system. Ideal for those seeking rest, stress relief, or gentle recovery from physical or emotional fatigue.',
        photos: JSON.stringify([{ path: 'img/activities/restorative1.jpg', priority: 1 }]),
        additional_info: JSON.stringify({
          benefits: [ 'Promotes deep physical and mental relaxation',
            'Reduces stress, anxiety, and fatigue',
            'Supports recovery and emotional balance',
            'Improves sleep quality and inner calm'],
          bring_with_you: [  'Yoga mat or padded surface for comfort',
            'Bolster, blanket, and eye pillow for full support',
            'Warm, soft clothing to enhance relaxation']
        }),
        highlighted: true,
        promotional_text: '<b>Relax, restore, rejuvenate</b> with <i>Restorative Yoga</i> — <b>your journey to serenity</b>.'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Activities', null, {});
  }
};
