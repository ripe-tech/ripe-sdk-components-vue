import { Loader } from "./loader/loader.vue";

const install = Vue => {
    Vue.component("loader", Loader);
};

export { Loader };

export default install;
