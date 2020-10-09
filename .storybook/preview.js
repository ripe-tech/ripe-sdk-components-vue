import Vue from "vue";
import GlobalEvents from "vue-global-events";

import { install as RipeSdkComponentsVue } from "../vue";

import "./styles.css";

Vue.use(RipeSdkComponentsVue);
Vue.component("global-events", GlobalEvents);
