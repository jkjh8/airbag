<script setup>
const props = defineProps({ id: Number })

const getAudioFilePath = () => {
  FN.onRequest({
    command: 'getFilePath'
  })
}
</script>

<template>
  <div class="bg-grey-10 round-border q-pa-sm">
    player {{ props.id }}
    <q-btn
      round
      flat
      color="yellow"
      icon="folder"
      @click="getAudioFilePath"
    ></q-btn>
  </div>
</template>

<style scoped></style>
