import "regenerator-runtime/runtime";
import { createApp } from "vue";
import router from "./router";
import App from "./components/App.vue";
import "./styles/main.scss";
import VueCountdown from "@chenfengyuan/vue-countdown";

createApp(App)
    .use(router)
    .component(VueCountdown.name, VueCountdown)
    .mount("#app");
