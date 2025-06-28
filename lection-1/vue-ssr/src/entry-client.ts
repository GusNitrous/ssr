import { createApp } from "vue";
import "./style.css";

import App from "./App.vue";

const app = createApp(App);

try {
  const serverState = document.getElementById("server_state")?.innerHTML;
  const serverData = serverState ? JSON.parse(serverState) : {};
  app.provide("products", serverData.products);
  app.provide("location", window.location);
} catch {}

app.mount("#app");
