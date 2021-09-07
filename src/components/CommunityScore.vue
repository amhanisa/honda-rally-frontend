<template>
  <div class="hello">
    <img
      alt="Honda Challenge 2.0 Logo"
      src="../assets/hc2-logo.png"
      class="max-w-xs mx-auto"
    />
    <h1 class="text-4xl font-bold">Scoreboard</h1>
    <p class="text-sm">Last updated on</p>
    <p class="text-xs">{{ this.updateTime }}</p>
    <Scoreboard :teams="teams"></Scoreboard>
    <footer class="py-3 mt-14">
      created by <a href="https://dealpro.id">dealpro.id</a>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import CONFIG from "../config/config";
import Scoreboard from "./Scoreboard";

export default {
  name: "CommunityScore",
  components: {
    Scoreboard,
  },

  data() {
    return {
      teams: [],
      updateTime: null,
      interval: null,
    };
  },

  mounted() {
    this.updateRanks();
    this.interval = setInterval(() => {
      this.updateRanks();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    updateRanks() {
      axios.get(`${CONFIG.API_URL}/getRanks`).then((res) => {
        console.log(res);
        this.teams = res.data.ranks;
        const date = new Date(res.data.updateTime);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        this.updateTime = date.toLocaleDateString("en-US", options);
      });
    },
  },
};
</script>
