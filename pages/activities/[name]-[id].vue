<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Timetable from '@/components/Timetable.vue'

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
const route = useRoute()
const activity = ref(null)

const slug = route.params.id
const id = slug.split('-').pop()

interface Activity {
  id: number
  name: string
  description: string
  activity_category_id: number
  additional_info?: {
    benefits?: string[]
    bring_with_you?: string[]
  }
  photos: { path: string, priority: number }[]
  teachers: TeacherWithSchedule[]
}

interface TeacherWithSchedule {
  id: number
  name: string
  surname: string
  photos: {
    path: string
    priority: number
  }[]
  timetable: Record<string, string> // например: { monday: '09:00–10:00' }
}


const activityData = ref<Activity>(null)
// First query: fetch activity by ID
const { data, error } = await useFetch<{ success: boolean; data: Offer[] }>(
    '/api/activity/getActivityById?id='+String(id),
    {
      server: true,
      lazy: false
    }
)

if (error.value) {
  console.error('Fetch error:', error.value)
} else {
  activityData.value = {
    ...data.value,
    photos: Array.isArray(data.value?.photos) ? data.value.photos : []
  }
}

const teachers=ref<TeacherWithSchedule[]>([])

// Second query: fetch teachers and their timetable from join table
const {data: teacherData, error: teacherError } = await useFetch<{ success: boolean; data}>(
    `/api/teacher/getTeacherByActivity?id=${id}`,
    {
      server: true,
      lazy: false
    }
)

if (teacherError.value) {
  console.error('Fetch error:', teacherError.value)
} else {
  teachers.value = teacherData.value?.data?.filter(item => item.Teachers)
      .map(item => ({
        ...item.Teachers,
        timetable: JSON.parse(item.timetable),
        photos: Array.isArray(item.Teachers.photos) ? item.Teachers.photos : []
      }))
}
activity.value = {
  ...activityData.value.data,
  Teachers: teachers
}

useSeoMeta({
  title: activity.name,
  description: "Page contains information about activity, teachers who teach this activity and timetable",
})
const getImageUrl = (path) => {
  return path ? `/img/activities/${path.split('/').pop()}` : ''
}

const getTeacherImage = (name) => {
  const lower = name.toLowerCase()
  return `/img/teachers/${lower}1.png`
}

const roomImageMap = {
  ashtanga: 'ashtanga-room.jpg',
  breath: 'breath-room.jpg',
  chakra: 'chakra-room.png',
  flexibility: 'flexibility-room.jpg',
  hatha: 'hatha-room.jpg',
  kundalini: 'kundalini-room.jpg',
  meditation: 'meditation-room.jpg',
  nidra: 'nidra-room.jpg',
  power: 'power-room.jpg',
  prenatal: 'prenatal-room.jpg',
  restorative: 'restorative-room.jpg',
  sound: 'sound-room.jpg',
  stretch: 'stretch-room.png',
  vinyasa: 'vinyasa-room.jpg',
  walking: 'walking-room.jpg'
}

const getRoomImage = () => {
  const rawName = activity.value?.name?.toLowerCase() || ''
  for (const keyword in roomImageMap) {
    if (rawName.includes(keyword)) {
      return `/img/activities/rooms/${roomImageMap[keyword]}`
    }
  }
  return '/img/activities/rooms/default.jpg'
}
</script>

<template>

  <Navbar />

  <div class="activity-page">
    <div v-if="activity" class="activity-container">
      <div class="header-section">
        <div class="text-section">
          <h1 class="activity-title">{{ activity.name }}</h1>

          <p class="activity-description">{{ activity.description }}</p>

        </div>

        <img
            :src="getImageUrl(activity.photos?.[0]?.path)"
            :alt="activity.name"
            class="activity-image"
        />

      </div>

      <div class="experience-section">
        <div class="experience-text">

          <h3>Benefits:</h3>

          <ul>
            <li v-for="(item, i) in activity.additional_info?.benefits || []" :key="'ben' + i">{{ item }}</li>
          </ul>

          <h3>Recommended accessories:</h3>

          <p>{{ (activity.additional_info?.bring_with_you || []).join(', ') }}</p>

        </div>

        <img class="room-image" :src="getRoomImage()" alt="Yoga Room" />

      </div>

      <div v-if="activity.Teachers?.length" class="teachers-section">
        <h2>Teachers</h2>

        <div class="teacher-cards">
          <div class="teacher-cards">
            <NuxtLink
                v-for="teacher in activity.Teachers"
                :key="teacher.id"
                :to="'/teacher'+'-'+teacher.name.toLowerCase()+'-'+teacher.surname.toLowerCase()+'-'+teacher.id"
                class="teacher-card"
            >
              <img :src="getTeacherImage(teacher.name)" :alt="teacher.name" />

              <p>{{ teacher.name }} {{ teacher.surname }}</p>

            </NuxtLink>

          </div>

        </div>

        <Timetable v-if="activity?.Teachers?.length" :teachers="activity.Teachers" />

      </div>

    </div>

    <div v-else class="loading">Loading activity...</div>

  </div>

  <Footer />

</template>

<style scoped>

.activity-page {
  max-width: 1100px;
  margin: 60px auto;
  font-family: 'Montserrat', sans-serif;
  padding: 0 20px;
  color: #333;
}

.header-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 40px;
}

.text-section {
  max-width: 50%;
}

.activity-title {
  font-size: var(--font-small-title);
  font-weight: 700;
}

.activity-description {
  font-style: italic;
  font-size: var(--font-text);
  line-height: 1.8;
  margin-top:  40px;

}

.activity-image {
  width: 48%;
  border-radius: 16px;
  object-fit: cover;
  margin-top: 26px;
}

.experience-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 40px;
  flex-wrap: wrap;
  margin-left: 49px;
  line-height: 1.8;
}



.experience-text {
  flex: 1;
}

.experience-text h3 {
  font-size: var(--font-sub-subtitle);
  margin-top: 60px;
  font-weight: 600;

}

.experience-text ul {
  padding-left: 20px;
  line-height: 1.8;
  margin-top: 8px;
  font-size: var(--font-text);
}

.experience-text p {
  margin-top: 8px;
  font-size: var(--font-text);
}

.room-image {
  flex-shrink: 0;
  min-width: 300px;
  border-radius: 16px;
  object-fit: cover;
  width: 100%;
  max-width: 400px;
  height: auto;
}

.teachers-section {
  margin-top: 90px;
  text-align: center;
}

.teachers-section h2 {
  font-size: var(--font-small-subtitle);
  font-weight: 600;
  margin-bottom: 0;
}

.teacher-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  margin-bottom:  20px;
}

.teacher-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  text-align: center;
  background-color: #eaeaea;
  border-radius: 20px;
  padding-bottom: 4px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.teacher-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
}

.teacher-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: block;
}

.teacher-card p {
  font-weight: 700;
  font-size: var(--font-medium-text);
  margin: 8px 0 2px;
  color: #222;
}

.loading {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: var(--font-text);
  padding: 40px;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .text-section {
    max-width: 100%;
    order: 1;
  }

  .activity-image {
    width: 90%;
    margin: 20px 0;
    order: 2;
  }

  .activity-description {
    order: 3;
    margin-top: 20px;
  }

  .experience-section {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
    text-align: center;
  }

  .room-image {
    max-width: 90%;
    margin: 20px 0;
  }
}
</style>