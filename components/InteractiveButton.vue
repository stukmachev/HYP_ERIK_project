<script setup lang="js">
import { useRouter } from 'vue-router'
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: false,
    default: 310
  }
});

const button_width = computed(() => ({
  width: `${props.width}px`,
}));

const router = useRouter()

function handleClick() {
  router.push(props.to)
}
</script>

<template>
  <button class="interactive-button" :style="button_width" @click="handleClick">{{ label }}</button>
</template>

<style scoped>
  .interactive-button{
    /*width: 310px;*/
    height: 55px;
    flex-shrink: 0;
    background-color: #87609a; /*#CDB4DB*/
    color: #FFFFFF;
    border-radius: 6px;
    border: 0;
    font-family: "Montserrat", sans-serif;

    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    transition: background-color 0.3s ease;
  }

  .interactive-button:hover {
    background-color: #533263; /* a bit darker */
  }

  .interactive-button:active {
    background-color: #533263;
  }
</style>