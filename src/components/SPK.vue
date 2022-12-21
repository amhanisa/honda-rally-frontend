<template>
  <div>
    <Header :title="this.title" />
    <LastUpdate :updateTime="this.updateTime" />
    <button type="button" v-if="!counting" class="btn btn-home" :disabled="counting" @click="startCountdown">START
      COUNTDOWN</button>
    <vue-countdown v-if="counting" @end="onCountdownEnd" :time=this.time v-slot="{ minutes, seconds }"
      :transform="transformSlotProps" class="countdown">
      {{ minutes }} : {{ seconds }}
    </vue-countdown>
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
  name: "SPK",
  components: {
    Header,
    Scoreboard,
    LastUpdate,
    Footer,
  },

  data() {
    return {
      type: "SPK",
      teams: [],
      updateTime: null,
      interval: null,
      title: "",
      time: 45 * 60 * 1000,
      counting: false,
    };
  },

  mounted() {
    this.updateRanks();
    this.interval = setInterval(() => {
      this.updateRanks();
    }, 2500);

    let time = localStorage.getItem('time');
    let now = Math.floor(Date.now() / 1000);

    let selisih = now - parseInt(time);

    if (time) {
      this.time = (45 * 60 * 1000) - (selisih * 1000);
      this.counting = true;
    }

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
    startCountdown: function () {
      this.counting = true;

      localStorage.setItem('time', Math.floor(Date.now() / 1000));

    },
    onCountdownEnd: function () {
      // this.counting = false;
      clearInterval(this.interval);
    },
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
  },
};
</script>
