<script setup>
import { ref } from 'vue'
const props = defineProps({
  name: Array,
  status: Array,
  files: Array
})

const emit = defineEmits(['playBtnEvent', 'openFile'])
</script>

<template>
  <div>
    <div
      v-for="(state, index) in status"
      :key="index"
      class="row no-wrap justify-between items-center"
    >
      <div class="row no-wrap items-center q-gutter-x-md">
        <div>{{ name[index] }}</div>
        <div class="text-grey" style="font-size: 0.7rem">
          {{ files[index] }}
        </div>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          round
          flat
          size="sm"
          :color="status[index] ? 'red' : 'green'"
          :icon="status[index] ? 'stop' : 'play_arrow'"
          @click="emit('playBtnEvent', index)"
        ></q-btn>
        <q-btn
          round
          flat
          color="yellow"
          size="sm"
          icon="folder"
          @click="emit('openFile', index)"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
