import "regenerator-runtime/runtime";
import { createApp } from "vue";
import router from "./router";
import App from "./components/App.vue";
import "./styles/main.scss";

createApp(App)
  .use(router)
  .mount("#app");
