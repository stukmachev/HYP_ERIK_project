<template>
  <Navbar />
  <div class="page-wrapper">
    <h1 class="sr-only">Our Teachers</h1>
    <div class="category-icons">
      <div
          class="category"
          :class="{ active: selectedCategory === cat.key }"
          v-for="cat in categoryMap"
          :key="cat.key"
          @click="selectCategory(cat.key)"
      >
        <img :src="`/icons/${cat.key}.png`" :alt="cat.key" />
        <span :class="`text-${cat.key}`">{{ cat.label }}</span>
      </div>
    </div>

    <div
        v-if="selectedCategory !== 'all'"
        :class="['category-banner', selectedCategory]"
    >
      <p>{{ categoryData?.description || '...' }}</p>
    </div>
    <transition-group name="fade" tag="div" class="activity-grid">
      <ClickableCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          :label="activity.name.toUpperCase()"
          :img_src="`/img/activities/${activity.photos?.[0]?.path?.split('/').pop()}`"
          :to="`/activities/${activity.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${activity.id}`"
      />
    </transition-group>

  </div>
  <Footer />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ClickableCard from '@/components/ClickableCard.vue'
import { useNuxtApp } from '#app'

const { $supabase } = useNuxtApp()
const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: "Activities",
  description: "Page contains all activities with filtering by categories",
})

const categoryMap = [
  { key: 'body', id: 1, label: 'Body' },
  { key: 'soul', id: 2, label: 'Soul' },
  { key: 'mind', id: 3, label: 'Mind' }
]

const selectedCategory = ref(route.query.category || 'all')

watch(() => route.query.category, (newVal) => {
  selectedCategory.value = newVal || 'all'
})

const selectCategory = (key) => {
  router.replace({ query: { category: key } })
}

const categoryId = computed(() =>
    categoryMap.find(c => c.key === selectedCategory.value)?.id
)

// Данные
const categoryData = ref(null)
const allActivities = ref([])

// Загрузка данных
onMounted(async () => {
  try {

    const { data: activities, error: actErr } = await $supabase
        .from('Activities')
        .select('*')
        .order('name', { ascending: true })

    if (actErr) throw actErr
    allActivities.value = activities

    if (categoryId.value) {
      const { data: cat, error: catErr } = await $supabase
          .from('Categories')
          .select('*')
          .eq('id', categoryId.value)
          .single()

      if (catErr) throw catErr
      categoryData.value = cat
    }
    console.log(categoryData)
  } catch (err) {
    console.error('Data load error:', err)
  }
})
watch(categoryId, async (newId) => {
  if (!newId) {
    categoryData.value = null
    return
  }

  try {
    const { data: cat, error: catErr } = await $supabase
        .from('Categories')
        .select('*')
        .eq('id', newId)
        .single()

    if (catErr) throw catErr
    categoryData.value = cat
  } catch (err) {
    console.error('Failed to load category data:', err)
  }
})

// Category filter
const filteredActivities = computed(() => {
  if (selectedCategory.value === 'all') return allActivities.value
  return allActivities.value.filter(a => a.activity_category_id === categoryId.value)
})
</script>

<style scoped>
.page-wrapper {
  font-family: 'Montserrat', sans-serif;
  margin: 0 auto;
  width: 100%;
  padding: 1rem 0;
}

.category-icons {
  display: flex;
  justify-content: center;
  gap: 200px;
  margin: 40px auto 20px;
  overflow-x: auto;
  padding: 1rem 1rem;
}
.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.category.active {
  transform: scale(1.15);
}
.category img {
  width: 75px;
  height: 75px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.category:hover img {
  transform: scale(1.1);
  opacity: 0.8;
}
.category span {
  margin-top: 0.5rem;
  transition: color 0.3s ease;
}

.text-body { color: #1d7d5e; }
.text-mind { color: #275481; }
.text-soul { color: #653f52; }

.category-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  border-radius: 12px;
  padding: 14px 42px;
  margin: 30px auto;
  color: white;
  font-weight: 600;
  font-size: var(--font-medium-text);
  text-align: center;
  width: 80%;
  max-width: 960px;
  height: 50px;
}
.category-banner.body { background-color: #1d7d5e; }
.category-banner.mind { background-color: #275481; }
.category-banner.soul { background-color: #653f52; }

.activity-grid {
  padding: 0 171px 87px;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content: center;
  justify-items: center;
  gap: 72px;
}

.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.95); }

@media (max-width: 1200px) {
  .activity-grid {
    padding: 0 2rem 2rem;
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    gap: 2rem;
  }
}
@media (max-width: 768px) {
  .category-icons { gap: 1rem; }
  .category img { width: 60px; height: 60px; }
  .category span { font-size: 0.9rem; }

  .category-banner {
    width: 90%;
    padding: 12px 20px;
    font-size: 1rem;
  }

  .activity-grid {
    padding: 0 1rem 2rem;
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>