<template>
  <img
    alt="Honda Challenge 2.0 Logo"
    src="../assets/logo-cirebon.png"
    class="max-w-xs mx-auto"
  />
  <h1 class="text-4xl font-bold">{{ this.title }}</h1>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>