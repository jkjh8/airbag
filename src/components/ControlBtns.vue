<script setup>
import { useQuasar } from "quasar";
import TooltipDelay from "src/components/TooltipDelay.vue";

const $q = useQuasar();
</script>

<template>
  <div class="q-pa-sm q-gutter-x-sm row">
    <q-btn icon="settings" color="grey-4" round flat>
      <TooltipDelay msg="Setting" />
    </q-btn>

    <q-btn icon="refresh" color="grey-4" round flat>
      <TooltipDelay msg="Device reload" />
    </q-btn>
  </div>
</template>

<style scoped></style>
