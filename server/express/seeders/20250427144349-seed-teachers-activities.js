'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TeachersActivities', [
      { teacher_id: 1, activity_id: 1, timetable: JSON.stringify({ monday: '08:00-09:00' }) },
      { teacher_id: 1, activity_id: 2, timetable: JSON.stringify({ wednesday: '10:00-11:00' }) },
      { teacher_id: 1, activity_id: 3, timetable: JSON.stringify({ friday: '18:00-19:00' }) },

      { teacher_id: 2, activity_id: 4, timetable: JSON.stringify({ monday: '19:00-20:00' }) },
      { teacher_id: 2, activity_id: 5, timetable: JSON.stringify({ thursday: '17:00-18:00' }) },
      { teacher_id: 2, activity_id: 6, timetable: JSON.stringify({ saturday: '20:00-21:00' }) },

      { teacher_id: 3, activity_id: 7, timetable: JSON.stringify({ tuesday: '07:00-08:30' }) },
      { teacher_id: 3, activity_id: 8, timetable: JSON.stringify({ thursday: '18:00-19:00' }) },
      { teacher_id: 3, activity_id: 9, timetable: JSON.stringify({ sunday: '06:30-07:00' }) },

      { teacher_id: 4, activity_id: 10, timetable: JSON.stringify({ sunday: '15:00-16:30' }) },
      { teacher_id: 4, activity_id: 11, timetable: JSON.stringify({ monday: '12:00-13:00' }) },
      { teacher_id: 4, activity_id: 12, timetable: JSON.stringify({ saturday: '08:00-09:00' }) },

      { teacher_id: 5, activity_id: 13, timetable: JSON.stringify({ sunday: '10:00-11:30' }) },
      { teacher_id: 5, activity_id: 14, timetable: JSON.stringify({ wednesday: '17:00-18:00' }) },
      { teacher_id: 5, activity_id: 15, timetable: JSON.stringify({ thursday: '20:00-21:00' }) },

      { teacher_id: 1, activity_id: 5, timetable: JSON.stringify({ friday: '17:00-18:00' }) },
      { teacher_id: 2, activity_id: 8, timetable: JSON.stringify({ monday: '09:00-10:00' }) },
      { teacher_id: 3, activity_id: 12, timetable: JSON.stringify({ saturday: '09:00-10:00' }) },
      { teacher_id: 4, activity_id: 14, timetable: JSON.stringify({ thursday: '19:00-20:00' }) },
      { teacher_id: 5, activity_id: 2, timetable: JSON.stringify({ tuesday: '11:00-12:00' }) }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TeachersActivities', null, {});
  }
};