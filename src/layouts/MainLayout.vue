<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { getDevices } from 'src/composables/useDevices.js'
import { updateSetup } from 'src/composables/useSetup.js'
import ControlBtns from 'src/components/ControlBtns.vue'
import AboutWindow from 'src/components/dialogs/aboutDialog.vue'

const $q = useQuasar()

$q.dark.set(true)

onBeforeMount(async () => {
  await getDevices()
  updateSetup(await FN.onPromise({ command: 'start' }))
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-grey-2" style="background: #000000">
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
