<template>
  <div>
    <Header :title="this.title" />
    <div class="flex justify-around stopper-cheat">
      <h2 class="font-bold text-xl">COMMUNITY</h2>
      <h2 class="font-bold text-xl">CONSUMENT</h2>
      <h2 class="font-bold text-xl">MEDIA</h2>
      <h2 class="font-bold text-xl">MANAGER</h2>
    </div>
    <div class="flex justify-center">
      <Scoreboard class="mx-2" :teams="communityTeams"></Scoreboard>
      <Scoreboard class="mx-2" :teams="consumentTeams"></Scoreboard>
      <Scoreboard class="mx-2" :teams="mediaTeams"></Scoreboard>
      <Scoreboard class="mx-2" :teams="managerTeams"></Scoreboard>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import CONFIG from "../config/config";
import Header from "./Header.vue";
import Scoreboard from "./Scoreboard";
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
      communityTeams: [],
      consumentTeams: [],
      mediaTeams: [],
      managerTeams: [],
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
          axios.get(`${CONFIG.API_URL}/getRanks?type=COMMUNITY`),
          axios.get(`${CONFIG.API_URL}/getRanks?type=CONSUMENT`),
          axios.get(`${CONFIG.API_URL}/getRanks?type=MEDIA`),
          axios.get(`${CONFIG.API_URL}/getRanks?type=MANAGER`),
        ])
        .then(
          axios.spread((...res) => {
            this.communityTeams = res[0].data.ranks;
            console.log(res);
            this.consumentTeams = res[1].data.ranks;
            this.mediaTeams = res[2].data.ranks;
            this.managerTeams = res[3].data.ranks;
          })
        );
    },
  },
};
</script>
