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
const props = defineProps({ item: Object })
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const onSubmit = () => {
  onDialogOK({ ...props.item })
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="q-gutter-x-md row items-center">
            <q-icon name="delete" size="sm" color="red-10" />
            <div>{{ item.name }}을 삭제 하시겠습니까?</div>
          </div>
        </q-card-section>

        <q-card-actions class="row no-wrap" align="right">
          <q-btn class="btn" flat rounded @click="onDialogCancel">취소</q-btn>
          <q-btn class="btn" flat rounded color="green" @click="onSubmit"
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
