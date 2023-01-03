<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { info, warn, error } from 'src/composables/useLogs'
import { audioOutput } from 'src/composables/useDevices.js'
import { setup } from 'src/composables/useSetup'
import {
  player,
  updateFileToDb,
  updatePlaylinkToDb,
  updateDeviceToDb,
  setSink,
  setAudioFiles,
  initAudioTags,
  fnPlayBtn,
  isPlaying,
  fnRemotePlay
} from 'src/composables/usePlayer.js'

import Simple from 'src/components/SimplePlayer'
import Advenced from 'src/components/AdvencedPlayer'

const props = defineProps({
  id: Number
})

const name = ['Light', 'Breathing', 'Refill']
const audio = ref([])
const status = ref([false, false, false])
const files = ref(['', '', ''])
const playlink = ref(false)
const deviceId = ref(null)
let delayedPlay

const play = (idx) => {
  console.log(idx)
  status.value[idx] = fnPlayBtn(audio.value, props.id, idx, playlink.value)
}

const remotePlay = (idx) => {
  status.value[idx] = fnRemotePlay(audio.value, props.id, idx, playlink.value)
}

const stop = () => {
  audio.value.forEach((ad) => {
    ad.pause()
    ad.load()
  })
}

const playing = (e, idx) => {
  status.value[idx] = true
}

const openFile = async (idx) => {
  const file = await FN.onPromise({ command: 'getFilePath' })
  if (file) {
    files.value[idx] = file[0]
    audio.value[idx].src = `local://${files.value[idx]}`
    updateFileToDb(props.id, files.value)
  }
  // files.value[idx] = await FN.onPromise({ command: 'getFilePath' })
}

const setDevice = () => {
  setSink(audio.value, deviceId.value)
  updateDeviceToDb(props.id, deviceId.value)
}

const setPlaylink = () => {
  playlink.value = !playlink.value
  updatePlaylinkToDb(props.id, playlink.value)
}

onMounted(async () => {
  try {
    const playerInfo = await initAudioTags(audio.value, props.id)
    files.value = playerInfo.files
    deviceId.value = playerInfo.deviceId
    playlink.value = playerInfo.playlink === 'true' ? false : true
    // loggger
    info(`player ID: ${props.id} init value: ${playerInfo}`)
  } catch (err) {
    error(`Player is not activated ${err}`)
  }
})

defineExpose({
  play,
  remotePlay,
  stop
})
</script>

<template>
  <q-item class="bg-grey-10 round-border">
    <q-item-section avatar>
      <q-avatar round color="primary">{{ id + 1 }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <Simple
        v-if="setup.mode === 'Simple'"
        :name="name"
        :status="status"
        :files="files"
        @playBtnEvent="play"
      />
      <Advenced
        v-else
        :name="name"
        :status="status"
        :files="files"
        @playBtnEvent="play"
        @openFile="openFile"
      />
      <div>
        <!-- list for -->
        <div
          v-for="(file, index) in files"
          :key="index"
          class="row no-wrap justify-between items-center"
        >
          <audio
            ref="audio"
            @playing="playing($event, index)"
            @ended="status[index] = false"
          />
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
      <q-btn
        rounded
        :color="playlink ? 'primary' : 'grey-10'"
        @click="setPlaylink"
        >LINK</q-btn
      >
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
