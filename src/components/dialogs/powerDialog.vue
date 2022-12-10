<script setup>
import { onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { setup } from 'src/composables/useSetup'
import {
  required,
  minPort,
  maxPort,
  chkIpaddress
} from 'src/composables/useRules'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

onMounted(() => {
  console.log('getSetup')
  FN.onRequest({ command: 'getSetup' })
})

const onSubmit = () => {
  onDialogOK(setup.value)
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="q-gutter-x-sm row items-center">
          <q-icon name="power_settings_new" size="sm" color="green" />
          <div class="name">전체 전원 제어</div>
        </div>
      </q-card-section>

      <q-card-section>
        <div>시스템 전체 전원을 ON/OFF 합니다.</div>
      </q-card-section>

      <q-card-actions class="row no-wrap" align="right">
        <q-btn class="btn" flat rounded @click="onDialogCancel">취소</q-btn>
        <q-btn class="btn" flat rounded color="green" @click="onDialogOK(true)"
          >ALL ON</q-btn
        >
        <q-btn
          class="btn"
          flat
          rounded
          color="red-10"
          @click="onDialogOK(false)"
          >ALL OFF</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.btn {
  width: 6rem;
}
</style>
