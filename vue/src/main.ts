import { createApp } from "vue";
import App from "./App.vue";
import { VueWriterPlugin } from "@human-writes/aio/vue";

const app = createApp(App);
app.use(VueWriterPlugin, { textSpeed: 20, textTypos: false });
app.mount("#app");
