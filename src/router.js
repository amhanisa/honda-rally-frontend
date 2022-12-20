import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import SPK from "./components/SPK.vue";
import Dashboard from "./components/Dashboard.vue";
import Close from "./components/Close.vue";
import NotFound from "./components/NotFound.vue";
import TheProtector from "./components/TheProtector.vue";
import DealerOne from "./components/DealerOne.vue";
import DealerTwo from "./components/DealerTwo.vue";
import DealerThree from "./components/DealerThree.vue";
import DealerFour from "./components/DealerFour.vue";
import DealerFive from "./components/DealerFive.vue";
import DealerSix from "./components/DealerSix.vue";
import DealerSeven from "./components/DealerSeven.vue";
// import axios from "axios";
// import CONFIG from "./config/config";

// const checkAccess = () => {
//     if (localStorage.getItem("user-password")) {
//         return;
//     }

//     return axios.get(`${CONFIG.API_URL}/checkAccess`).then((res) => {
//         console.log(res);
//         const enableWebsite = res.data;
//         if (!enableWebsite) {
//             return router.push({ path: "/close" });
//         }
//     });
// };

const checkAdmin = () => {
    if (!localStorage.getItem("user-password")) {
        return router.push({ path: "/theprotector" });
    }
    return true;
};

const routes = [
    { path: "/", component: Home },
    { path: "/spk", component: SPK, beforeEnter: [checkAdmin] },
    { path: "/app", component: Dashboard, beforeEnter: [checkAdmin] },
    { path: "/dealer1", component: DealerOne },
    { path: "/dealer2", component: DealerTwo },
    { path: "/dealer3", component: DealerThree },
    { path: "/dealer4", component: DealerFour },
    { path: "/dealer5", component: DealerFive },
    { path: "/dealer6", component: DealerSix },
    { path: "/dealer7", component: DealerSeven },
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
