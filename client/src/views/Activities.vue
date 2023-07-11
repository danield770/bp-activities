<script setup>
import Activity from '../components/Activity.vue';
</script>

<template>
  <div class="wpr">
    <h1 class="heading">Timeline</h1>
    <Activity />
  </div>
</template>

<style scoped>
.wpr {
  max-width: 1600px;
  margin: auto;
  color: var(--primary);
  padding: 12px;
}
.heading {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
</style>
