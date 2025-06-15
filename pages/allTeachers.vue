<script setup lang="ts">
import ClickableCard from "@/components/ClickableCard.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
const items = Array.from({ length: 12 }, (_, i) => `Option ${i + 1}`)
const { data, error, pending } = await useFetch('http://localhost:8080/api/v1/teachers/')
const teachers = data.value.data;

useSeoMeta({
  title: "All teachers",
  description: "In this page are listed all Yoga House teachers.",
})

</script>

<template>
  <Navbar/>
  <div class="page-wrapper">
    <h1 class="sr-only">Our Teachers</h1>
    <main class="main-content">
      <div class="grid-wrapper">
        <div v-for="(teacher, index) in teachers" :key="index" class="grid-item">
          <ClickableCard :img_src="teacher.photos[0].path" :to="'teacher-'+teacher.name.toLowerCase()+'-'+teacher.surname.toLowerCase()+'-'+teacher.id" :label="teacher.name+' '+teacher.surname"/>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
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