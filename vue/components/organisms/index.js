import {
    RipeConfigurator
} from "./ripe-configurator/ripe-configurator.vue";
import {
    RipeImage
} from "./ripe-image/ripe-image.vue";

const install = Vue => {
    Vue.component("ripe-configurator", RipeConfigurator);
    Vue.component("ripe-image", RipeImage);
};

export {
    RipeConfigurator,
    RipeImage
};

export default install;
