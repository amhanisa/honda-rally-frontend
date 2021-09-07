import { createApp, h } from "vue";
import Dashboard from "./components/Dashboard.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import NotFound from "./components/NotFound.vue";
import "./styles/main.scss";

const routes = {
  "/": ScoreBoard,
  "/app": Dashboard,
};

const simpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFound;
    },
  },

  render() {
    return h(this.CurrentComponent);
  },
};

createApp(simpleRouter).mount("#app");
