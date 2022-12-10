<script setup>
import PlayerComponent from '/src/components/playerComponent'
import { player } from 'src/composables/usePlayer.js'
</script>

<template>
  <q-page class="q-pa-md">
    <PlayerComponent
      :id="1"
      :file1="player[0].file1"
      :file2="player[0].file2"
      :file3="player[0].file3"
      :deviceId="player[0].deviceId"
      :playlink="player[0].playlink"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
