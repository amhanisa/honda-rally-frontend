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
    <div class="container mx-auto">
      <div class="max-w-xl sm:mx-auto p-5 rounded-md shadow-xl mx-5 mt-8">
        <div class="list-complete-item mb-4">
          <span class="w-28 font-bold text-2xl">Rank</span>
          <span class="w-96 font-bold text-2xl">Team Name</span>
          <span class="w-28 font-bold text-2xl">Score</span>
        </div>
        <hr class="mb-5 border-t-2" />
        <transition-group name="list-complete" tag="ul">
          <li
            v-for="(item, index) in teams"
            :key="item.id"
            class="list-complete-item my-2"
          >
            <span v-if="index === 0" class="w-28">
              <img
                src="../assets/rank1.svg"
                alt="Rank 1"
                class="w-12 mx-auto"
              />
            </span>
            <span v-else-if="index === 1" class="w-28">
              <img
                src="../assets/rank2.svg"
                alt="Rank 2"
                class="w-12 mx-auto"
              />
            </span>
            <span v-else-if="index === 2" class="w-28">
              <img
                src="../assets/rank3.svg"
                alt="Rank 3"
                class="w-12 mx-auto"
              />
            </span>
            <span v-else class="w-28">{{ index + 1 }}</span>

            <span v-if="index < 3" class="w-96 font-bold text-2xl">{{
              item.team
            }}</span>
            <span v-else class="w-96">{{ item.team }}</span>

            <span v-if="index < 3" class="w-28 font-bold text-2xl">{{
              item.score
            }}</span>
            <span v-else class="w-28">{{ item.score }}</span>
          </li>
        </transition-group>
      </div>
    </div>
    <footer class="py-3 mt-14">
      created by <a href="https://dealpro.id">dealpro.id</a>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import CONFIG from "../config/config";

export default {
  name: "ScoreBoard",
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
