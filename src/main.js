import { createApp, h } from "vue";
import CommunityDashboard from "./components/CommunityDashboard.vue";
import CommunityScore from "./components/CommunityScore.vue";
import NotFound from "./components/NotFound.vue";
import "./styles/main.scss";

const routes = {
  "/": CommunityScore,
  "/app": CommunityDashboard,
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
