<template>
  <div class="timetable-section" v-if="timetableMatrix.length">
    <h2 class="timetable-title">Timetable</h2>
    <table class="timetable-table">
      <thead>
      <tr>
        <th scope="col" class="sr-only">Teacher</th>
        <th v-for="day in days" :key="day">{{ day.charAt(0).toUpperCase() + day.slice(1) }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in timetableMatrix" :key="index">
        <td class="teacher-name">{{ row.name }}</td>
        <td v-for="day in days" :key="day">{{ row.schedule[day] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="timetable-button-wrapper">
    <NuxtLink to="/activities" class="yoga-button">
      Other Yoga Styles
    </NuxtLink>
  </div>

</template>

<script setup>
  const props = defineProps({
  teachers: {
  type: Array,
  required: true
}
})

  import { computed } from 'vue'

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const timetableMatrix = computed(() => {
  const matrix = []
  const daysSet = new Set(days)
  const groupedById = {}

  for (const teacher of props.teachers) {
  const id = teacher.id
  const fullName = `${teacher.name} ${teacher.surname}`

  // Initialize the row for this teacher if not already
  if (!groupedById[id]) {
  groupedById[id] = {
  name: fullName,
  schedule: Object.fromEntries(days.map(day => [day, []]))
}
}

    const timetable = teacher?.timetable
    if (timetable) {
      try {
        const parsed = typeof timetable === 'string' ? JSON.parse(timetable) : timetable
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

  // Convert arrays like ['08:00', '15:00'] → '08:00, 15:00'
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
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 40px;
}

.timetable-table {
  margin: 0 auto;
  margin-bottom: 40px;
  border-collapse: collapse;
  width: 100%;
  max-width: 900px;
  font-size: 16px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

.timetable-table th,
.timetable-table td {
  padding: 12px 16px;
  border: 1px solid #2724284A;
  text-align: center;

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
  margin-top: 50px;
  margin-bottom:  70px;
  text-align: center;
}

.yoga-button {
  background-color: #87609a;
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: inline-block;
  transform: translateY(0);
}

.yoga-button:hover {
  background-color: #a473bb;
  box-shadow: 0 10px 20px rgba(164, 115, 187, 0.4);
  transform: translateY(-3px) scale(1.03);
}



</style>
