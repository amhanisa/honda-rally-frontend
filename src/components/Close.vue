<template>
  <div class="flex flex-col justify-center items-center">
    <Header title="Scoreboard Closed"></Header>
    <p>Tunggu Pengumumannya Sore Nanti</p>
  </div>
</template>
<script>
import Header from "./Header.vue";
import axios from "axios";
import CONFIG from "../config/config";

export default {
  components: { Header },

  data() {
    return {
      interval: null,
    };
  },

  mounted() {
    this.check();
    this.interval = setInterval(() => {
      this.check();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    check() {
      if (localStorage.getItem("user-password")) {
        return;
      }

      axios.get(`${CONFIG.API_URL}/checkAccess`).then((res) => {
        console.log(res);
        const enableWebsite = res.data;
        if (enableWebsite) {
          this.$router.push({ name: "home" });
        }
      });
    },
  },
};
</script>