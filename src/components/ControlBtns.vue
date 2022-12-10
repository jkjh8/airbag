<script setup>
import { useQuasar } from 'quasar'
import TooltipDelay from 'src/components/TooltipDelay.vue'
import SetupDialog from 'src/components/dialogs/setupDialog.vue'
import AudioFileDialog from 'src/components/dialogs/openFileDialog.vue'

const $q = useQuasar()

const openSetupDialog = () => {
  $q.dialog({
    component: SetupDialog
  }).onOk((args) => {
    console.log(args)
    FN.onRequest({ command: 'setSetup', value: { ...args } })
  })
}

const openFileDialog = () => {
  $q.dialog({
    component: AudioFileDialog
  })
}
</script>

<template>
  <div class="q-pa-sm q-gutter-x-sm row">
    <q-btn
      icon="settings"
      color="grey-4"
      round
      flat
      dense
      @click="openSetupDialog"
    >
      <TooltipDelay msg="Setting" />
    </q-btn>

    <q-btn
      icon="folder"
      color="yellow"
      round
      flat
      dense
      @click="openFileDialog"
    >
      <TooltipDelay msg="Audio Files" />
    </q-btn>

    <q-btn icon="devices" color="grey-4" round flat dense>
      <TooltipDelay msg="Audio Device" />
    </q-btn>
  </div>
</template>

<style scoped></style>
