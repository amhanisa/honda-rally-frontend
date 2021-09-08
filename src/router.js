import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import CommunityScore from "./components/CommunityScore.vue";
import ConsumentScore from "./components/ConsumentScore.vue";
import MediaScore from "./components/MediaScore.vue";
import ManagerScore from "./components/ManagerScore.vue";
import Dashboard from "./components/Dashboard.vue";
import AllScore from "./components/AllScore.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/community", component: CommunityScore },
  { path: "/consument", component: ConsumentScore },
  { path: "/media", component: MediaScore },
  { path: "/manager", component: ManagerScore },
  { path: "/app", component: Dashboard },
  { path: "/all", component: AllScore },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

export default router;
