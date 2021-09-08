<template>
  <div>
    <router-link to="/" class="btn my-3 max-w-xs">
      <IconBack class="h-4 mr-2" /> Back Home
    </router-link>
  </div>
</template>
<script>
import IconBack from "../assets/IconBack.vue";

export default {
  name: "BackHome",
  components: {
    IconBack,
  },
};
</script>