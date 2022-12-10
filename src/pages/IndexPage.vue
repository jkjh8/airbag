<script setup>
import { ref } from 'vue'
import PlayerComponent from '/src/components/playerComponent'
import { player } from 'src/composables/usePlayer.js'

const audioplayer = ref([])
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
