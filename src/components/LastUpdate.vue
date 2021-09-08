<template>
  <p class="text-sm">Last updated on</p>
  <p class="text-xs">{{ this.updateTime }}</p>
</template>
<script>
export default {
  props: ["updateTime"],
};
</script>