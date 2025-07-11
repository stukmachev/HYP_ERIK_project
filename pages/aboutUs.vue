<template>
  <Navbar></Navbar>
  <div class="about-us">
    <section class="hero">
      <img
          style="background: lightgray 50% / cover no-repeat"
          class="hero-bg"
          src="@/assets/images/about-us.png"
          alt="Background"
      />
      <div class="hero-card-front">
        <h1 class="hero-title">Our Story & Vision</h1>
        <p class="hero-description">
          Born from a deep love for healing, movement, and conscious living,
          Yoga House was created as a sanctuary for anyone seeking connection
          — to self, to others, to nature, and to something greater.<br />
          We believe that healing begins the moment we slow down, listen
          inward, and honor the wisdom of the body, the intelligence of the
          mind, and the calling of the soul. Our vision is to offer a safe,
          nurturing, and uplifting space where people from all walks of life
          can explore transformation at their own rhythm.<br />
          Whether you are starting your journey or deepening your practice,
          our center is a place to return to yourself — to remember your
          wholeness, your joy, your truth.
        </p>
      </div>
    </section>

    <section class="approach">
      <div class="approach-content">
        <h2 class="approach-title">Our approach</h2>
        <p class="approach-intro">
          We guide from the understanding that true transformation is
          holistic. That’s why our philosophy honors the integration of:
        </p>
        <ul class="approach-list">
          <li><strong><NuxtLink class="clickable-link" to="activities?category=body">Body</NuxtLink></strong> – through intentional movement, stillness, and embodied awareness</li>
          <li><strong><NuxtLink class="clickable-link" to="/activities?category=mind">Mind</NuxtLink></strong> – through meditation, breathwork, and reflective practices</li>
          <li><strong><NuxtLink class="clickable-link" to="/activities?category=soul">Soul</NuxtLink></strong> – through ritual, sound, energy work, and spiritual connection</li>
        </ul>
        <p class="approach-description">
          We don’t follow one fixed method. Instead, we weave together ancient traditions and modern wisdom to create meaningful experiences — personal, powerful, and deeply human. Our space is inclusive, trauma-aware, and rooted in reverence. No experience is needed — just a willingness to explore.
        </p>
            <div class="gallery">
              <div
                  v-for="(image, index) in galleryImages"
                  :key="index"
                  class="gallery-item"
                >
                <img
                    :src="image.src"
                    :alt="image.alt"
                    class="gallery-img"
                  />
              </div>
            </div>
      </div>
    </section>

    <section class="contact">
      <h2 class="contact-title">Need a little more clarity?</h2>
      <p class="contact-text">
        Sometimes one breath — or one message — is all it takes.
      </p>
      <InteractiveButton label="Contact Us" to="/contactUs"></InteractiveButton>
    </section>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import approach1 from "@/assets/images/our-approach-1.png";
import approach2 from "@/assets/images/our-approach-2.png";
import approach3 from "@/assets/images/our-approach-3.png";
import approach4 from "@/assets/images/our-approach-4.png";

useSeoMeta({
  title: "About us",
  description: "Page contains general information about Yoga center",
})

const galleryImages = [
  { src: approach1, alt: "Yoga woman square" },
  { src: approach2, alt: "White flower scene" },
  { src: approach3, alt: "Yoga studio square" },
  { src: approach4, alt: "Yoga woman square" },
];
</script>

<style scoped src="@/assets/about-us.css"></style>