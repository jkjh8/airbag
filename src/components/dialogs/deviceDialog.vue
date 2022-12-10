<script setup>
import { onMounted, reactive } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import {
  required,
  minPort,
  maxAmp,
  chkIpaddress
} from 'src/composables/useRules'
import { poweramps } from 'src/composables/usePoweramps'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const device = reactive({
  id: 0,
  name: ''
})

onMounted(() => {
  console.log('getPowerAmps')
  FN.onRequest({ command: 'getPowerAmps' })
})

const onSubmit = () => {
  onDialogOK({
    id: Number(device.id),
    name: device.name
  })
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="q-gutter-x-sm row items-center">
            <q-icon name="add_circle" size="sm" color="primary" />
            <div class="name">디바이스 추가</div>
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <q-input
              v-model="device.id"
              type="number"
              filled
              dense
              label="ID"
              lazy-rules
              :rules="[required, maxAmp, minPort]"
            />
            <q-input
              v-model="device.name"
              filled
              dense
              label="Name"
              lazy-rules
              :rules="[required]"
            />
          </div>
        </q-card-section>

        <q-card-actions class="row no-wrap" align="right">
          <q-btn class="btn" flat rounded @click="onDialogCancel">취소</q-btn>
          <q-btn class="btn" flat rounded color="green" type="submit"
            >확인</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.btn {
  width: 4rem;
}
</style>
