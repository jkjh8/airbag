<script setup>
import { onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { setup } from 'src/composables/useSetup'
import { required, minPort, maxPort } from 'src/composables/useRules'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

onMounted(() => {
  FN.onRequest({ command: 'getSetup' })
})

const onSubmit = () => {
  onDialogOK(setup.value)
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="q-gutter-x-sm row items-center">
            <q-icon name="settings" size="sm" />
            <div class="name">SETUP</div>
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <q-input
              v-model="setup.port"
              type="number"
              filled
              dense
              lazy-rules
              :rules="[required, minPort, maxPort]"
              label="Port"
            />
            <q-input
              v-model="setup.delay"
              type="number"
              filled
              dense
              lazy-rules
              :rules="[required, minPort]"
              label="Delay"
            />
            <q-select
              v-model="setup.mode"
              :options="['Simple', 'Advanced']"
              filled
              dense
              lazy-rules
              :rules="[required]"
              label="Delay"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
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
