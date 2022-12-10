<script setup>
import { ref, computed, onMounted } from 'vue'
import { audioOutput } from 'src/composables/useDevices.js'

const props = defineProps({
  id: Number,
  file1: String,
  file2: String,
  file3: String,
  deviceId: String,
  playlink: Boolean
})

const audio1 = ref(null)
const audio2 = ref(null)
const audio3 = ref(null)
const status1 = ref(false)
const status2 = ref(false)
const status3 = ref(false)
const deviceId = ref(null)

const source1 = computed(() => {
  return `local://${props.file1}`
})

const source2 = computed(() => {
  return `local://${props.file1}`
})

const source3 = computed(() => {
  return `local://${props.file1}`
})

const audio1Play = () => {
  if (status1.value) {
    audio1.value.pause()
    audio1.value.load()
  } else {
    audio1.value.play()
  }
  status1.value = !status1.value
}

const audio2Play = () => {
  if (status2.value) {
    audio2.value.pause()
    audio2.value.load()
  } else {
    audio2.value.play()
  }
  status2.value = !status2.value
}

const audio3Play = () => {
  if (status3.value) {
    audio3.value.pause()
    audio3.value.load()
  } else {
    audio3.value.play()
  }
  status3.value = !status3.value
}

const setDevice = (id) => {
  if (id) {
    deviceId.value = id
  }
  audio1.value.setSinkId(deviceId.value)
  audio2.value.setSinkId(deviceId.value)
  audio3.value.setSinkId(deviceId.value)
  FN.onRequest({ command: 'setDevice', id: props.id, deviceId: deviceId.value })
}

onMounted(() => {
  if (props.deviceId) {
    deviceId.value = props.deviceId
  }
})
</script>

<template>
  <q-item class="bg-grey-10 round-border">
    <q-item-section avatar>
      <q-avatar round color="primary" size="sm">{{ props.id }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="q-gutter-y-sm">
        <!-- FILE1 -->
        <div class="row no-wrap justify-between items-center">
          <div>
            <q-item-label>Light</q-item-label>
            <q-item-label caption>
              {{ props.file1 }}
            </q-item-label>
          </div>
          <div class="q-gutter-x-sm">
            <q-btn
              round
              flat
              size="sm"
              :color="status1 ? 'red' : 'green'"
              :icon="status1 ? 'stop' : 'play_arrow'"
              @click="audio1Play"
            ></q-btn>
            <q-btn round flat color="yellow" size="sm" icon="folder"></q-btn>
          </div>
        </div>
        <!-- FILE2 -->
        <div class="row no-wrap justify-between items-center">
          <div>
            <q-item-label>Touch</q-item-label>
            <q-item-label caption>
              {{ props.file2 }}
            </q-item-label>
          </div>
          <div class="q-gutter-x-sm">
            <q-btn
              round
              flat
              size="sm"
              :color="status2 ? 'red' : 'green'"
              :icon="status2 ? 'stop' : 'play_arrow'"
              @click="audio2Play"
            ></q-btn>
            <q-btn round flat color="yellow" size="sm" icon="folder"></q-btn>
          </div>
        </div>
        <!-- FILE3 -->
        <div class="row no-wrap justify-between items-center">
          <div>
            <q-item-label>Fill Air</q-item-label>
            <q-item-label caption>
              {{ props.file3 }}
            </q-item-label>
          </div>
          <div class="q-gutter-x-sm">
            <q-btn
              round
              flat
              size="sm"
              :color="status3 ? 'red' : 'green'"
              :icon="status3 ? 'stop' : 'play_arrow'"
              @click="audio3Play"
            ></q-btn>
            <q-btn round flat color="yellow" size="sm" icon="folder"></q-btn>
          </div>
        </div>

        <q-separator />

        <!-- device selector -->
        <div>
          <q-select
            v-model="deviceId"
            :options="audioOutput"
            label="Audio Output Device"
            dense
            options-dense
            filled
            option-value="deviceId"
            option-label="label"
            emit-value
            map-options
            @update:model-value="setDevice"
          ></q-select>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <q-btn>LINK</q-btn>
    </q-item-section>
  </q-item>
  <audio ref="audio1" controls :src="source1" @ended="status1 = false"></audio>
  <audio ref="audio2" controls :src="source2" @ended="status2 = false"></audio>
  <audio ref="audio3" controls :src="source3" @ended="status3 = false"></audio>
</template>

<style scoped></style>
