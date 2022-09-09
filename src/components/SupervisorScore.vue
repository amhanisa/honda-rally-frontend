<template>
  <div>
    <Header :title="this.title" />
    <LastUpdate :updateTime="this.updateTime" />
    <Scoreboard :teams="teams"></Scoreboard>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import CONFIG from "../config/config";
import Header from "./Header.vue";
import Scoreboard from "./ScoreBoard";
import LastUpdate from "./LastUpdate.vue";
import Footer from "./Footer.vue";

export default {
  name: "SupervisorScore",
  components: {
    Header,
    Scoreboard,
    LastUpdate,
    Footer,
  },

  data() {
    return {
      type: "SUPERVISOR",
      teams: [],
      updateTime: null,
      interval: null,
      title: "Scoreboard",
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
      this.checkAccess();

      axios.get(`${CONFIG.API_URL}/getRanks?type=${this.type}`).then((res) => {
        // console.log(res);
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
    checkAccess() {
      if (localStorage.getItem("user-password")) {
        return;
      }

      axios.get(`${CONFIG.API_URL}/checkAccess`).then((res) => {
        console.log(res);
        const enableWebsite = res.data;
        if (!enableWebsite) {
          this.$router.push({ name: "close" });
        }
      });
    },
  },
};
</script>
