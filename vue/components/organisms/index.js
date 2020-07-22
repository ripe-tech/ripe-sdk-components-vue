import { RipeConfigurator } from "./configurator/configurator.vue";

const install = Vue => {
    Vue.component("ripe-configurator", RipeConfigurator);
};

export { RipeConfigurator };

export default install;
