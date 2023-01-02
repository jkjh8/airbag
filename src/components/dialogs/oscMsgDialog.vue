<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { oscMsg } from 'src/composables/useOsc'
const $q = useQuasar()
const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin confirmDialog">
      <q-card-section>
        <div class="row no-wrap justify-center q-pt-md">OSC Message</div>
        <div class="column items-center q-pt-md">
          <div>{{ oscMsg.oscMsg }}</div>
        </div>
      </q-card-section>
      <q-card-actions class="row no-wrap" align="right">
        <q-btn class="btn" flat rounded @click="onDialogCancel">닫기</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.confirmDialog {
  border-radius: 0.5rem;
  background: rgba(30, 30, 30, 0.8);
}
.caption {
  font-size: 0.6rem;
  color: grey;
}
</style>
