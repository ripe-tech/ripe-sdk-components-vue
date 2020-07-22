import { Configurator } from "./configurator/configurator.vue";

const install = Vue => {
    Vue.component("ripe-configurator", Configurator);
};

export { Configurator };

export default install;
