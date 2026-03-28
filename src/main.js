import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import VueCodemirror from 'vue-codemirror'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(VueCodemirror, {
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: '请输入代码...'
});

app.mount("#app");
