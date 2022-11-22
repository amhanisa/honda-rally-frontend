<template>
  <div>
    <Header :title="this.title" />
    <LastUpdate :updateTime="this.updateTime" />
    <BackHome />
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
import BackHome from "./BackHome.vue";
import Footer from "./Footer.vue";

export default {
  name: "CustomerScore",
  components: {
    Header,
    Scoreboard,
    LastUpdate,
    BackHome,
    Footer,
  },

  data() {
    return {
      type: "CUSTOMER",
      teams: [],
      updateTime: null,
      interval: null,
      title: "Customer Scoreboard",
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
  },
};
</script>
