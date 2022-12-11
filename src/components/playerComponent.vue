<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { info, warn, error } from 'src/composables/useLogs'
import { audioOutput } from 'src/composables/useDevices.js'
import {
  player,
  updateFileToDb,
  updatePlaylinkToDb
} from 'src/composables/usePlayer.js'

const props = defineProps({
  id: Number
})

const name = ['Light', 'Touch', 'Fill']
const audio = ref([])
const status = ref([false, false, false])
const files = ref(['', '', ''])
const playlink = ref(false)
const deviceId = ref(null)

const audioPlay = (idx) => {
  try {
    if (audio.value[idx].readyState < 2) {
      return warn(`player id: ${props.id}, idx: ${idx} id not ready`)
    }
    if (status.value[idx]) {
      audio.value[idx].pause()
      audio.value[idx].load()
    } else {
      audio.value[idx].play()
    }
    status.value[idx] = !status.value[idx]
  } catch (err) {
    status.value[idx] = false
    error(`player id: ${props.id}, idx: ${idx} play error`)
  }
}
const openFile = async (idx) => {
  files.value[idx] = await FN.onPromise({ command: 'getFilePath' })
  audio.value[idx].src = `local://${files.value[idx]}`
  updateFileToDb(props.id, files.value)
}

const setDevice = () => {
  setSink()
  FN.onRequest({
    command: 'setDevice',
    id: props.id,
    deviceId: deviceId.value
  })
}

const setSink = () => {
  for (let i = 0; i < 3; i++) {
    audio.value[i].setSinkId(deviceId.value)
  }
}

const setPlaylink = () => {
  playlink.value = !playlink.value
  updatePlaylinkToDb(props.id, playlink.value)
}
onMounted(async () => {
  try {
    const value = await FN.onPromise({ command: 'getPlayer', id: props.id })
    if (value.files && value.files.length) {
      value.files.forEach((file, idx) => {
        files.value[idx] = file
        audio.value[idx].src = `local://${file}`
      })
    }
    if (value.deviceId) {
      deviceId.value = value.deviceId
      setSink()
    }
    if (value.playlink) {
      playlink.value = true
    }
  } catch (err) {
    error(`Player is not activated ${err}`)
  }
})
</script>

<template>
  <q-item class="bg-grey-10 round-border">
    <q-item-section avatar>
      <q-avatar round color="primary">{{ id + 1 }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <div>
        <!-- list for -->
        <div
          v-for="(file, index) in files"
          :key="index"
          class="row no-wrap justify-between items-center"
        >
          <div class="row no-wrap items-center q-gutter-x-md">
            <div>{{ name[index] }}</div>
            <div class="text-grey" style="font-size: 0.7rem">
              {{ file }}
            </div>
          </div>
          <div class="q-gutter-x-sm">
            <q-btn
              round
              flat
              size="sm"
              :color="status[index] ? 'red' : 'green'"
              :icon="status[index] ? 'stop' : 'play_arrow'"
              @click="audioPlay(index)"
            ></q-btn>
            <q-btn
              round
              flat
              color="yellow"
              size="sm"
              icon="folder"
              @click="openFile(index)"
            ></q-btn>
          </div>
          <!-- audio tag -->
          <audio ref="audio" @ended="status[index] = false" />
        </div>

        <q-separator class="q-my-sm" />

        <!-- device selector -->
        <div>
          <q-select
            v-model="deviceId"
            :options="audioOutput"
            label="Audio Output Device"
            dense
            filled
            hide-bottom-space
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
      <q-btn :color="playlink ? 'primary' : 'grey-10'" @click="setPlaylink"
        >LINK</q-btn
      >
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
