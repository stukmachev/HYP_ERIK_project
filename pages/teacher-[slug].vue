<script setup>
import ClickableCard from "~/components/ClickableCard.vue"
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useNuxtApp, useSeoMeta } from '#app'

const { $supabase } = useNuxtApp()
const route = useRoute()

const rawSlug = route.params.slug
const id = rawSlug.split('-').pop()

const teacher = ref(null)
const teacherActivities = ref([])
const error = ref(null)
const pending = ref(true)
const extra_photos = ref([])

const windowWidth = ref(0)

//start value if on server
if (process.client) {
  windowWidth.value = window.innerWidth
}

//responsive size
const responsiveWidth = computed(() => {
  if (windowWidth.value < 440) {
    return 300 * (windowWidth.value / 440)
  } else {
    return 300
  }
})

onMounted(async () => {
  pending.value = true
  try {
    // First: load teacher
    const { data: teacherData, error: teacherError } = await $supabase
        .from('Teachers')
        .select('*')
        .eq('id', id)
        .single()

    if (teacherError) throw teacherError
    if (!teacherData) throw new Error(`Teacher with id ${id} not found`)
    teacher.value = teacherData

    // Load activities for this teacher from TeachersActivity
    const { data: activityJoinData, error: joinError } = await $supabase
        .from('TeachersActivity')
        .select(`
        Activities (
          id,
          name,
          description,
          photos,
          highlighted
        )
      `)
        .eq('teacher_id', id)

    if (joinError) throw joinError

    // Flatten the join result into a list of activities
    teacherActivities.value = activityJoinData
        .map(item => item.Activities)
        .filter(Boolean)

    // Optional: prepare extra photos
    extra_photos.value = Array.isArray(teacherData.photos)
        ? teacherData.photos.slice(1)
        : []

    //Handles ClickableCards responsiveness
    function updateViewWidth() {
      windowWidth.value = window.innerWidth;
    }
    window.addEventListener('resize', updateViewWidth);

    // SEO
    useSeoMeta({
      title: `${teacher.value.name} ${teacher.value.surname}`,
      description: `This is ${teacher.value.name} ${teacher.value.surname}'s page, where their courses, experiences and skills can be found.`,
    })
  } catch (err) {
    console.error('Error loading teacher or activities:', err)
    error.value = err
  } finally {
    pending.value = false
  }
})
</script>

<template>

  <Navbar></Navbar>

  <div v-if="pending" class="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>

  <div v-else>

    <div class="teacher-body">

      <div class="personal-info">
        <h1 class="title">{{teacher.name}} {{teacher.surname}}</h1>
        <h2 class="subtitle">{{teacher.qualification}}</h2>
      </div>

      <div class="main-information">

        <img class="teacher-profile-picture" :src="teacher.photos[0].path" :alt="teacher.name + ' ' + teacher.surname + ' picture'" />

        <div class="information-text certificate">
          <p class="description" style="font-style: italic">{{teacher.description}}</p>
          <div class="education-certification-wrapper">
            <h3 style="font-weight: 700">Education & Certifications:</h3>
            <ul>
              <li class="certification" v-for="c in teacher.cv.education">{{c}}</li>
            </ul>
          </div>
        </div>

        <div class="information-text skills">
          <h3 style="font-weight: 700">Main Expertise:</h3>
          <ul>
            <li class="certification" v-for="e in teacher.cv.skills">{{e}}</li>
          </ul>
        </div>

        <div class="photos-wrapper" v-if="extra_photos.length !== 0">
          <div class="photos" v-for="photo in extra_photos" :key="photo">
            <img class="extra-teacher-photos" :src="photo.path" :alt="teacher.name + ' ' + teacher.surname + ' at work.'"/>
          </div>
        </div>

        <div v-else class="placeholder"></div>

      </div>

      <h2 class="learn-with-teacher">Learn with {{teacher.name}}</h2>

      <div class="related-activities">
        <ClickableCard
            v-for="activity in teacherActivities"
            :key="activity.id"
            :img_src="activity.photos[0].path"
            :to="'/activities/'+activity.name.toLowerCase()+ '-' + activity.id"
            :label="activity.name"
            :card_width="responsiveWidth"
            :card_height="responsiveWidth">
        </ClickableCard>
      </div>

      <div class="button-wrapper">
        <InteractiveButton label="Back to All Teachers" to="/allTeachers" :width="responsiveWidth"></InteractiveButton>
      </div>

    </div>
  </div>

  <Footer></Footer>
</template>



<style scoped>

.teacher-body {
  min-height: 88vh;
  position: relative;
  background-color: rgba(230, 218, 248, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 100px;
  box-sizing: border-box;
  gap: 69px;
}

.personal-info {
  display: flex;
  height: fit-content;
  padding: 15px 397px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}

.title{
  color: var(--Black);
  min-width: 476px;
  text-align: center;
  font-size: 66px;
  font-style: normal;
  font-weight: 700;
}

.subtitle {
  min-width: 476px;
  color: var(--Black);
  text-align: center;
  font-size: 23px;
  font-style: normal;
  font-weight: 600;
}

.main-information{
  position: relative;
  max-width: 1060px;
  width: 90%;
  height: min-content;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  row-gap: 40px;
  column-gap: 5px;
  font-size: var(--font-size-2xl);
}

.certificate{
  grid-column: 2;
  grid-row: 1;
  min-width: 600px;
  margin-left: 40px;
  position: static;
  height: auto;
}

.information-text{
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.description{
  margin-bottom: 20px;
}

.certification{
  margin: 0;
  font-size: inherit;
  padding-left: var(--padding-9xl);
}

.skills{
  grid-column: 1;
  grid-row: 2;
  max-width: 460px;
  position: static;
  line-height: 30px;
  text-align: right;
  display: inline-block;
}

.teacher-profile-picture{
  grid-column: 1;
  grid-row: 1;
  position: static;
  border-radius: var(--br-xl);
  width: 266px;
  height: 325px;
  object-fit: cover;
  object-position: 0 2px;
}

.placeholder{
  width:460px;
  height: 260px;
  grid-row: 2;
  grid-column: 2;
}

.photos-wrapper{
  grid-column: 2;
  grid-row: 2;
  justify-content: center;
  position: static;
  right: 150px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: min-content;
}

.photos{
  flex: none;
}

.extra-teacher-photos{
  position: relative;
  border-radius: var(--br-xl);
  width: 178px;
  height: 260px;
  object-fit: cover;
}

.learn-with-teacher{
  max-width: 838px;
  height: fit-content;
  color: #000;
  text-align: center;
  font-size: 36px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}

.related-activities{
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  gap: 72px;
  margin-bottom: 30px;
}

.button-wrapper{
  width: 100%;
  display: flex;
  justify-content: center;
  height: fit-content;
}

@media (max-width: 1000px) {

  .personal-info{
    margin: 15px 20px 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 0;
  }

  .title{
    min-width: 240px;
    font-size: 45px;
  }

  .subtitle {
    min-width: 240px;
    font-size: 17px;
  }

  .information-text {
    font-size: 15px;
  }

  .description{
    text-align: center;
  }

  .certification{
    padding: 0;
    margin-left: 30px;
  }

  .main-information{
    top: -60px;
    display: grid;
    grid-template-columns: 1fr !important;
    grid-auto-rows: auto;
    gap: 10px;
  }

  .teacher-profile-picture{
    grid-column: 1;
    grid-row: 1;
    position: relative;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
    scale: 0.8;
  }

  .education-certification-wrapper{
    width: fit-content;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .certificate{
    grid-column: 1;
    grid-row: 2;
    position: static;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
    min-width: 200px;
    width: 86%;
  }

  .skills{
    grid-column: 1;
    grid-row: 3;
    position: static;
    height: auto;
    text-align: left;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    width: 86%;
  }

  .photos-wrapper {
    grid-column: 1;
    grid-row: 4;
    position: static;
    height: auto;
    justify-content: center;
    right: 0;
    padding-right: 15px;
    padding-left: 15px;
  }

  .placeholder{
    grid-row: 4;
    position: static;
    height: auto;
    grid-column: 1;
    width: 86%;
  }

  .learn-with-teacher{
    margin-top: -100px;
    font-size: 30px;
  }

  .related-activities{
    width: fit-content;
    grid-template-columns: 1fr !important;
    margin-right: auto;
    margin-left: auto;
    gap: 45px;
  }
}

</style>