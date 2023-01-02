<script setup>
import { ref, onMounted } from 'vue'
import PlayerComponent from '/src/components/playerComponent'
import { player } from 'src/composables/usePlayer.js'
import { oscMsg } from 'src/composables/useOsc'

const audioplayer = ref([])
const audioplayer1 = ref(null)
onMounted(() => {
  FN.onOsc((args) => {
    oscMsg.value = args
    switch (args.command) {
      case 'play':
        if (args.comm === 1) {
          audioplayer.value[args.id].playSingle(args.channel)
        } else {
          audioplayer.value[args.id].remotePlay(args.channel)
        }
    }
  })
})
</script>

<template>
  <q-page class="q-pa-md q-gutter-y-sm">
    <PlayerComponent
      v-for="(item, index) in player"
      ref="audioplayer"
      :key="index"
      :id="index"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
