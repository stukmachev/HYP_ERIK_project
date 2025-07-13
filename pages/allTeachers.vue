<script setup lang="ts">
import ClickableCard from "@/components/ClickableCard.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
const items = Array.from({ length: 12 }, (_, i) => `Option ${i + 1}`)
import { useNuxtApp } from '#app'
import { ref, onMounted } from 'vue'

const { $supabase } = useNuxtApp()
const teachers = ref([])

onMounted(async () => {
  const { data, error } = await $supabase
      .from('Teachers')
      .select('*')
      .order('name', { ascending: true })

  if (error) {
    console.error('Error loading teachers:', error)
  } else {
    teachers.value = data
  }
})

useSeoMeta({
  title: "All teachers",
  description: "In this page are listed all Yoga House teachers.",
})
</script>

<template>

  <Navbar/>

  <div class="page-wrapper">
    <div v-if="teachers?.length" class="teachers-section">

    <h1 class="sr-only">Our Teachers</h1>

    <main class="main-content">
      <div class="grid-wrapper">
        <div v-for="(teacher, index) in teachers" :key="index" class="grid-item">
          <ClickableCard :img_src="teacher.photos?.[0]?.path" :to="'teacher-'+teacher.name.toLowerCase()+'-'+teacher.surname.toLowerCase()+'-'+teacher.id" :label="teacher.name+' '+teacher.surname"/>
        </div>

      </div>

    </main>

    </div>

    <div v-else class="loading">Loading teachers...</div>

    <Footer />

  </div>

</template>

<style scoped>
.loading {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: var(--font-text);
  padding: 40px;
}
.page-wrapper {
  min-height: 88vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.grid-wrapper {
  padding: 84px 171px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  gap: 72px;
  align-items: center;
}

</style>