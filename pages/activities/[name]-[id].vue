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
          <h2>What you'll experience:</h2>
          <ul>
            <li v-for="(item, i) in activity.additional_info?.experience || []" :key="'exp' + i">{{ item }}</li>
          </ul>
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

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Timetable from '@/components/Timetable.vue'

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $supabase } = useNuxtApp()
const route = useRoute()
const activity = ref(null)

onMounted(async () => {

  try {
    const slug = route.params.id
    const id = slug.split('-').pop()

    // First query: fetch activity by ID
    const { data: activityData, error: activityError } = await $supabase
        .from('Activities')
        .select('*')
        .eq('id', id)
        .single()

    if (activityError) throw activityError
    if (!activityData) throw new Error(`Activity with id ${id} not found`)

    // Second query: fetch teachers and their timetable from join table
    const { data: linkData, error: linkError } = await $supabase
        .from('TeachersActivity')
        .select(`
        timetable,
        Teachers (
          id,
          name,
          surname,
          photos
        )
      `)
        .eq('activity_id', id)

    if (linkError) throw linkError

    // Extract and attach timetable
    const teachers = linkData
        .filter(item => item.Teachers) // only valid links
        .map(item => ({
          ...item.Teachers,
          timetable: item.timetable,
          photos: Array.isArray(item.Teachers.photos) ? item.Teachers.photos : []
        }))

    // Merge into one object
    activity.value = {
      ...activityData,
      Teachers: teachers
    }
    console.log(activity.value)
    useSeoMeta({
      title: activity.value.name,
      description: "Page contains information about activity, teachers who teach this activity and timetable",
    })
  } catch (err) {
    console.error('Error loading activity:', err)
  }
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
  align-items: center;
  margin-bottom: 40px;
  gap: 40px;
}

.text-section {
  max-width: 50%;
}

.activity-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 26px;
  margin-top: 36px;

}

.activity-description {
  font-style: italic;
  font-size: 18px;
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
  font-size: 26px;
  margin-top: 60px;
  font-weight: 600;

}

.experience-text ul {
  padding-left: 20px;
  line-height: 1.8;
  margin-top: 8px;
}

.experience-text p {
  margin-top: 8px;
  font-size: 16px;
}

.room-image {
  flex: 1;
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
  font-size: 28px;
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
  font-size: 16px;
  margin: 8px 0 2px;
  color: #222;
}

.loading {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: 18px;
  padding: 40px;
}

</style>