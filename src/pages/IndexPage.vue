<script setup>
import Player from "/src/components/playerComponent";
</script>

<template>
  <q-page class="q-pa-md">
    <Player :id="1" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
