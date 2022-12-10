<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import info from '../../../package.json'

const $q = useQuasar()

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin confirmDialog">
      <q-card-section>
        <div class="row no-wrap justify-center q-pt-md">
          <q-icon name="svguse:icons.svg#logo" size="100px" />
        </div>
        <div class="column items-center">
          <div>{{ info.productName }} {{ info.version }}</div>
          <div>{{ info.author }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <div>Muticast Address: 230.185.185.112:56432</div>
        </div>
      </q-card-section>
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
