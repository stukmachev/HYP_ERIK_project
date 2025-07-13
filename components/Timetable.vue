<template>
  <div class="timetable-section" v-if="timetableMatrix.length">
    <h2 class="timetable-title">Timetable</h2>
    <table class="timetable-table">
      <thead>
      <tr>
        <th scope="col" class="sr-only">Teacher</th>
        <th v-for="day in days" :key="day">
          {{ day.charAt(0).toUpperCase() + day.slice(1) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in timetableMatrix" :key="index">
        <td class="teacher-name" data-label="Teacher">
          {{ row.name }}
        </td>
        <td
            v-for="day in days"
            :key="day"
            :data-label="day.charAt(0).toUpperCase() + day.slice(1)"
            :class="{ 'empty-day': !row.schedule[day] }"
        >
          {{ row.schedule[day] || '—' }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="timetable-button-wrapper">
    <InteractiveButton
        label="Other Yoga Styles"
        to="/activities"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  teachers: {
    type: Array,
    required: true
  }
})

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const timetableMatrix = computed(() => {
  const matrix = []
  const daysSet = new Set(days)
  const groupedById = {}

  for (const teacher of props.teachers) {
    const id = teacher.id
    const fullName = `${teacher.name} ${teacher.surname}`

    if (!groupedById[id]) {
      groupedById[id] = {
        name: fullName,
        schedule: Object.fromEntries(days.map(d => [d, []]))
      }
    }

    const timetable = teacher?.timetable
    if (timetable) {
      try {
        const parsed = typeof timetable === 'string'
            ? JSON.parse(timetable)
            : timetable
        for (const [day, time] of Object.entries(parsed)) {
          const dayLower = day.toLowerCase()
          if (daysSet.has(dayLower)) {
            groupedById[id].schedule[dayLower].push(time)
          }
        }
      } catch (e) {
        console.warn(`❌ Failed to parse timetable for ${fullName}:`, timetable)
      }
    }
  }

  for (const entry of Object.values(groupedById)) {
    for (const day of days) {
      entry.schedule[day] = entry.schedule[day].join(', ')
    }
    matrix.push(entry)
  }

  return matrix
})
</script>

<style scoped>
.timetable-section {
  margin-top: 80px;
  text-align: center;
}

.timetable-title {
  font-size: var(--font-small-subtitle);
  font-weight: 600;
  margin-bottom: 40px;
}

.timetable-table {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 40px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: var(--font-small-text);
  background: white;
  border-radius: 5px;
  overflow: hidden;
}

.timetable-table th,
.timetable-table td {
  padding: 12px 16px;
  border: 1px solid #2724284A;
  text-align: center;
  white-space: nowrap;
}

.timetable-table thead {
  background-color: #CDB4DB7D;
  color: #333;
}

.teacher-name {
  background-color: #CDB4DB7D;
  font-weight: 500;
  text-align: left;
}

.timetable-button-wrapper {
  margin: 50px 0 70px;
  text-align: center;
}


@media (max-width: 768px) {
  .timetable-table,
  .timetable-table thead,
  .timetable-table tbody,
  .timetable-table th,
  .timetable-table td,
  .timetable-table tr {
    display: block;
  }

  .timetable-table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .timetable-table tr {
    margin-bottom: 1.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }

  .timetable-table td {
    position: relative;
    padding-left: 50%;
    text-align: left;
    border: none;
    border-bottom: 1px solid #eee;
    white-space: normal;
  }

  .timetable-table td:before {
    content: attr(data-label);
    position: absolute;
    top: 16px;
    left: 16px;
    font-weight: 500;
    white-space: nowrap;
  }

  .timetable-table td.empty-day {
    display: none;
  }

  .timetable-table td:not(.empty-day):last-child {
    border-bottom: none;
  }
}
</style>
