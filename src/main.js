import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import VueRouter from "./router";
import component from "./components/ui";
import store from "./store";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

component.forEach((component) => {
  app.component(component.name, component);
});

app.use(VueAxios, axios).use(VueRouter).use(store).mount("#app");
