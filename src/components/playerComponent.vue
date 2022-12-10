<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { audioOutput } from 'src/composables/useDevices.js'
import { player } from 'src/composables/usePlayer.js'

const props = defineProps({
  id: Number
})

const name = ['Light', 'Touch', 'Fill']
const audio = ref([])
const status = ref([false, false, false])
const deviceId = ref(null)

const audioPlay = (index) => {
  try {
    if (audio.value[index].readyState < 2) {
      return FN.onRequest({
        type: 'log',
        level: 'warn',
        message: `player id: ${id.value}, index: ${index} id not ready`
      })
    }
    if (status.value[index]) {
      audio.value[index].pause()
      audio.value[index].load()
    } else {
      audio.value[index].play()
    }
    status.value[index] = !status.value[index]
  } catch (err) {
    status.value[index] = false
  }
}

const setDevice = () => {
  for (let i = 0; i < 3; i++) {
    audio.value[i].setSinkId(player.value[props.id].deviceId)
  }
  FN.onRequest({
    command: 'setDevice',
    id: props.id,
    deviceId: player.value[props.id].deviceId
  })
}

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    audio.value[i].setSinkId(player.value[props.id].deviceId)
  }
})
</script>

<template>
  <q-item class="bg-grey-10 round-border">
    <q-item-section avatar>
      <q-avatar round color="primary">{{ id + 1 }}</q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="q-gutter-y-sm">
        <!-- list for -->
        <div
          v-for="(file, index) in player[id].files"
          :key="index"
          class="row no-wrap justify-between items-center"
        >
          <div>
            <q-item-label>{{ name[index] }}</q-item-label>
            <q-item-label caption>
              {{ file }}
            </q-item-label>
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
            <q-btn round flat color="yellow" size="sm" icon="folder"></q-btn>
          </div>
          <!-- audio tag -->
          <audio
            ref="audio"
            :src="`local://${file}`"
            @ended="status[index] = false"
          />
        </div>

        <q-separator />

        <!-- device selector -->
        <div>
          <q-select
            v-model="player[id].deviceId"
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
      <q-btn :color="player[id].playlink ? 'primary' : 'grey-10'">LINK</q-btn>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
