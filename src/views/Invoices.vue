<template>
  <div>
    <h2>Invoices</h2>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave } from "vue-router";

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    "Are you sure to leave Invoices page? It is super cool."
  );

  if (!answer) {
    return false;
  }
});
</script>
