import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import CommunityScore from "./components/CommunityScore.vue";
import ConsumentScore from "./components/ConsumentScore.vue";
import MediaScore from "./components/MediaScore.vue";
import ManagerScore from "./components/ManagerScore.vue";
import Dashboard from "./components/Dashboard.vue";
import AllScore from "./components/AllScore.vue";
import Close from "./components/Close.vue";
import NotFound from "./components/NotFound.vue";
import TheProtector from "./components/TheProtector.vue";
import axios from "axios";
import CONFIG from "./config/config";

const checkAccess = () => {
  if (localStorage.getItem("user-password")) {
    return;
  }

  return axios.get(`${CONFIG.API_URL}/checkAccess`).then((res) => {
    console.log(res);
    const enableWebsite = res.data;
    if (!enableWebsite) {
      return router.push({ path: "/close" });
    }
  });
};

const checkAdmin = () => {
  if (!localStorage.getItem("user-password")) {
    return router.push({ path: "/theprotector" });
  }
  return true;
};

const routes = [
  { path: "/", component: Home },
  { path: "/community", component: CommunityScore, beforeEnter: [checkAccess] },
  { path: "/consument", component: ConsumentScore, beforeEnter: [checkAccess] },
  { path: "/media", component: MediaScore, beforeEnter: [checkAccess] },
  { path: "/manager", component: ManagerScore, beforeEnter: [checkAccess] },
  { path: "/app", component: Dashboard, beforeEnter: [checkAdmin] },
  { path: "/all", component: AllScore, beforeEnter: [checkAdmin] },
  { path: "/close", component: Close },
  { path: "/theprotector", component: TheProtector },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

export default router;
