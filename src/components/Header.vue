<template>
  <img alt="Logo Gala" src="../assets/logo-gala.png" class="max-w-xs mx-auto" />
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