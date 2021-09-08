<template>
  <div class="flex flex-col justify-center items-center">
    <Header title="Scoreboard Closed"></Header>
    <p>Tunggu Pengumumannya Sore Nanti</p>
    <BackHome class="mt-4" />
  </div>
</template>
<script>
import Header from "./Header.vue";
import BackHome from "./BackHome.vue";

export default {
  components: { Header, BackHome },
};
</script>