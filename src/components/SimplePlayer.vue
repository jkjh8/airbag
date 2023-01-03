<script setup>
import { ref } from 'vue'
const props = defineProps({
  name: Array,
  status: Array
})

const emit = defineEmits(['playBtnEvent'])
</script>

<template>
  <div class="row justify-between items-center">
    <div v-for="(state, index) in status" :key="index" class="row items-center">
      <div>{{ name[index] }}</div>
      <q-btn
        round
        flat
        size="sm"
        :color="state ? 'red' : 'green'"
        :icon="state ? 'stop' : 'play_arrow'"
        @click="emit('playBtnEvent', index)"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped></style>
