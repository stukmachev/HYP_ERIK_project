'use strict';

// npx sequelize-cli seed:generate --name seed-teachers
// npx sequelize-cli db:seed:all

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teachers', [
      {
        name: 'Aanya',
        surname: 'Devi',
        qualification: 'Lead Yoga Teacher & Retreat Guide',
        description: 'A poetic guide through body and breath.\n' +
            'With over 15 years of teaching experience across Asia, Europe, and Latin America, Aanya Devi leads yoga classes and retreats with a graceful balance of precision and soul. She is a certified senior yoga teacher (E-RYT 500) with formal training in Hatha, Vinyasa, and Kundalini Yoga.\n',
        photos: JSON.stringify([
          { path: 'img/teachers/aanya1.png', priority: 1 },
          { path: 'img/teachers/aanya2.png', priority: 2 },
          { path: 'img/teachers/aanya3.png', priority: 3 }
        ]),
        cv: JSON.stringify({
          experience: ['10 years in Vinyasa yoga.'],
          education: [
              'E-RYT 500, Yoga Alliance',
              'Certified Kundalini Yoga Instructor – KRI Institute',
              'Trauma-Informed Yoga Training – Yoga for Healing (UK)'
          ],
          skills: [
              'Hatha & Vinyasa Yoga',
              'Embodied Retreat Design',
              'Intuitive Movement & Energy Alignment'
          ]
        })
      },
      {
        name: 'Mateo',
        surname: 'Silva',
        qualification: 'Sound Healer & Meditation Teacher',
        description: 'Healing through vibration and presence.\n' +
            'Mateo is a certified sound therapist and mindfulness teacher whose sound journeys invite deep rest and nervous system healing. He combines ancient instruments with modern frequency tools, holding space for inner stillness and transcendence.',
        photos: JSON.stringify([
          { path: 'img/teachers/mateo1.png', priority: 1 }
        ]),
        cv: JSON.stringify({
          experience: ['7 years teaching Hatha and Ashtanga yoga.'],
          education: [
              'Diploma in Sound Healing – Globe Institute (USA)',
              'MBSR (Mindfulness-Based Stress Reduction) – UC San Diego',
              'Certification in Nada Yoga (Yoga of Sound) – India'
          ],
          skills: [
              'Tibetan Singing Bowls & Gong Bath Therapy',
              'Mindfulness Meditation',
              'Chakra Balancing through Sound',
          ]
        })
      },
      {
        name: 'Lila',
        surname: 'Flores',
        qualification: 'Breathwork Facilitator & Energy Therapist',
        description: 'Soft, grounded, and transformational.\n' +
            'Lila holds space for emotional release and deep transformation through trauma-informed breathwork and somatic energy healing. With a background in psychotherapy and Eastern energy systems, she guides participants safely into their own truth and self-trust.',
        photos: JSON.stringify([
          { path: 'img/teachers/lila1.png', priority: 1 },
        ]),
        cv: JSON.stringify({
          experience: ['Specialized in prenatal yoga with 5 years of experience.'],
          education: [
              'Certified Breathwork Practitioner – Alchemy of Breath',
              'Somatic Therapy for Trauma – Somatic Experiencing Institute',
              'Reiki Master (Usui & Shamanic Lineage)'
          ],
          skills: [
              'Transformational Breathwork',
              'Somatic Emotional Release',
              'Trauma-Aware Healing Spaces'
          ],
        })
      },
      {
        name: 'Nora',
        surname: 'El',
        qualification: 'Creative Arts Therapist & Cacao Ceremony Host\n',
        description: 'Creativity as sacred ritual.\n' +
            'Nora is a multidisciplinary artist and intuitive guide who weaves movement, art, voice, and plant medicine into her offerings. She holds circles for feminine embodiment, soul expression, and cacao-fueled celebration rooted in ancient wisdom and modern play.',
        photos: JSON.stringify([
          { path: 'img/teachers/nora1.png', priority: 1 },
        ]),
        cv: JSON.stringify({
          experience: ['Expert in Bikram yoga, trained in India.'],
          education: [
              'MA in Creative Arts Therapy – University of Barcelona',
              'Certified Cacao Facilitator – Keith’s Cacao (Guatemala)',
              'Feminine Embodiment Training – Awakening Women Institute'
          ],
          skills: [
              'Sacred Art & Mandala Meditation',
              'Cacao Ceremony & Ritual Leadership',
              'Expressive Movement & Voice Activation'
          ],
        })
      },
      {
        name: 'Ligia',
        surname: 'Sanchez',
        qualification: 'Energy Therapist & Healing Specialist',
        description: 'Subtle energy, deep transformation.\n' +
            'Ligia’s approach to healing is intuitive, gentle, and rooted in ancient energy systems. With over a decade of experience in energy medicine and subtle body work, she supports clients in clearing emotional blockages and reconnecting with inner peace and purpose.',
        photos: JSON.stringify([
          { path: 'img/teachers/ligia1.png', priority: 1 },
        ]),
        cv: JSON.stringify({
          experience: ['8 years of restorative and therapy yoga experience.'],
          education: [
              'Advanced Energy Medicine – Eden Method',
              'Pranic Healing – Level II (Institute of Inner Studies)',
              'Crystal & Vibrational Therapy – Healing Arts Institute (Spain)',
          ],
          skills: [
              'Energy Body Clearing',
              'Chakra Rebalancing & Auric Healing',
              'Integration After Ceremony or Trauma'
          ]
        })
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teachers', null, {});
  }
};
