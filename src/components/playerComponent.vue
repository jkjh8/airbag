<script setup>
const props = defineProps({ id: Number });
</script>

<template>
  <div class="bg-grey-10 round-border q-pa-sm">player {{ props.id }}</div>
</template>

<style scoped></style>
