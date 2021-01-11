import Vue from "vue";
import GlobalEvents from "vue-global-events";

import { install as RipeSdkComponentsVue } from "../vue";

import "./styles.css";

export const parameters = {
    layout: "fullscreen"
};

Vue.use(RipeSdkComponentsVue);
Vue.component("global-events", GlobalEvents);
