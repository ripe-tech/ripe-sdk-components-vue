import Vue from "vue";
import GlobalEvents from "vue-global-events";
import { configure } from "@storybook/vue";

import { install as RipeSdkComponentsVue } from "../vue";

import "./styles.css";

Vue.use(RipeSdkComponentsVue);
Vue.component("global-events", GlobalEvents);

const req = require.context("../vue", true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
