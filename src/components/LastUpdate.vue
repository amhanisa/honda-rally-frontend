<template>
  <div class="mb-4">
    <p class="text-sm">Last updated on</p>
    <p class="text-xs">{{ this.updateTime }}</p>
  </div>
</template>
<script>
export default {
  props: ["updateTime"],
};
</script>