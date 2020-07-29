import { RipeConfigurator } from "./ripe-configurator/ripe-configurator.vue";
import { RipeImage } from "./ripe-image/ripe-image.vue";
import { RipePrice } from "./ripe-price/ripe-price.vue";

const install = Vue => {
    Vue.component("ripe-configurator", RipeConfigurator);
    Vue.component("ripe-image", RipeImage);
    Vue.component("ripe-price", RipePrice);
};

export { RipeConfigurator, RipeImage, RipePrice };

export default install;
