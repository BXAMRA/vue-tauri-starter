import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";

// Router Pages
import Home from "@views/Home.vue";
import About from "@views/About.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({ history: createWebHashHistory(), routes });

createApp(App).use(router).mount("#app");
