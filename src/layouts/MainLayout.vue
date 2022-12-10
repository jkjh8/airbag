<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { getDevices } from 'src/composables/useDevices.js'
import { updateSetup } from 'src/composables/useSetup.js'
import ControlBtns from 'src/components/ControlBtns.vue'
import AboutWindow from 'src/components/dialogs/aboutDialog.vue'

const $q = useQuasar()

$q.dark.set(true)

onMounted(async () => {
  await getDevices()
  FN.onResponse((args) => {
    console.log(args)
    switch (args.type) {
      case 'setup':
        updateSetup(args.value)
        break
      default:
        FN.onRequset({
          command: 'log',
          level: 'info',
          message: 'unknown message from backend'
        })
        break
    }
  })
  FN.onRequest({ command: 'start' })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-grey-2" style="background: #00000000">
      <q-toolbar class="row justify-between">
        <div class="q-pa-sm q-gutter-x-md row items-center">
          <q-avatar class="pointer" color="green" size="24px">A </q-avatar>
          <div class="row justify-start">
            <div class="header-font">AIRBAG SOUND</div>
          </div>
        </div>
        <!-- control buttons -->
        <ControlBtns />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
