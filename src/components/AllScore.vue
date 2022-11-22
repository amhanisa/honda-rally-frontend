<template>
  <div>
    <Header :title="this.title" />
    <div class="flex justify-around stopper-cheat">
      <h2 class="font-bold text-xl">CUSTOMER</h2>
      <h2 class="font-bold text-xl">SUPERVISOR</h2>
    </div>
    <div class="flex justify-center">
      <Scoreboard class="mx-2" :teams="customerTeams"></Scoreboard>
      <Scoreboard class="mx-2" :teams="supervisorTeams"></Scoreboard>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import CONFIG from "../config/config";
import Header from "./Header.vue";
import Scoreboard from "./ScoreBoard";
import Footer from "./Footer.vue";

export default {
  name: "ManagerScore",
  components: {
    Header,
    Scoreboard,
    Footer,
  },

  data() {
    return {
      customerTeams: [],
      supervisorTeams: [],
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
      axios
        .all([
          axios.get(`${CONFIG.API_URL}/getRanks?type=CUSTOMER`),
          axios.get(`${CONFIG.API_URL}/getRanks?type=SUPERVISOR`),
          axios.get(`${CONFIG.API_URL}/getRanks?type=MEDIA`),
          axios.get(`${CONFIG.API_URL}/getRanks?type=MANAGER`),
        ])
        .then(
          axios.spread((...res) => {
            this.customerTeams = res[0].data.ranks;
            this.supervisorTeams = res[1].data.ranks;
          })
        );
    },
  },
};
</script>
