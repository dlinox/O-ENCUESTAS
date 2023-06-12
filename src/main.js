import { createApp } from "vue";
import App from "./App.vue";
//import { createPinia } from "pinia";
import router from "./router";
import "./style.css";

// const pinia = createPinia();

createApp(App).use(router).mount("#app");
