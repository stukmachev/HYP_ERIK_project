<template>
  <Navbar />

  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title"><span>Yoga House -</span></h1>
      <h2 class="hero__subtitle">where you come<br /> home to yourself.</h2>
      <InteractiveButton label="Our Classes" to="/activities" class="hero__button" />
    </div>
    <div class="hero__image">
      <img src="@/assets/images/main-meditation-woman.png" alt="Meditating woman" />
    </div>
  </section>

  <section class="activity-types">
    <h2 class="text-wrapper">Our activities</h2>
    <div class="frame">
      <NuxtLink to="/activities?category=body">
        <div class="BODY">
          <div class="overlap-group">
            <img class="body" src="/icons/body.png" alt="body icon" />
            <div class="div">BODY</div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/activities?category=mind">
        <div class="MIND">
          <div class="overlap">
            <img class="mind" src="/icons/mind.png" alt="mind icon" />
            <div class="text-wrapper-2">MIND</div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/activities?category=soul">
        <div class="SOUL">
          <div class="overlap-2">
            <img class="soul" src="/icons/soul.png" alt="soul icon" />
            <div class="text-wrapper-3">SOUL</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>

  <section class="special-offers">
    <h2 class="special-offers__title">Special Offers</h2>

    <div v-if="offers.length > 0" class="special-offers__grid">
      <div v-for="offer in offers" :key="offer.id" class="offer-card">
        <div class="offer-card__container">
          <div class="offer-card__content-wrapper">
            <div class="offer-card__image-wrapper">
              <img :src="getPriorityOneImage(offer.photos)" class="offer-card__image" :alt="`Image for offer: ${offer.name}`" />
            </div>
            <div class="offer-card__content">
              <p class="offer-card__description" v-html="offer.promotional_text"></p>
              <div class="offer-card__button-wrapper">
                <InteractiveButton :to="`/activities/${offer.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${offer.id}`"
                                             label="See Full Program" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="special-offers__empty">
      Come back later, new offers will appear soon!
    </div>
  </section>

  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Offer {
  id: number
  name: string
  photos: string | { path: string, priority: number }[]
  promotional_text: string
}

const offers = ref<Offer[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/activities?highlighted=true&limit=2')
    const result = await response.json()
    offers.value = result.data
  } catch (error) {
    console.error("Failed to fetch offers:", error)
  }
})

function getPriorityOneImage(photos: string | { path: string, priority: number }[]): string {
  try {
    const parsed = Array.isArray(photos) ? photos : JSON.parse(photos)
    const found = parsed.find((p: any) => p.priority === 1)
    return found?.path || ''
  } catch (e) {
    console.error("Invalid photo data:", photos)
    return ''
  }
}
</script>

<style scoped src="@/assets/index.css"></style>
