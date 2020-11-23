import { RipeConfigurator } from "./ripe-configurator/ripe-configurator.vue";
import { RipeImage } from "./ripe-image/ripe-image.vue";
import { RipeImageZoom } from "./ripe-image-zoom/ripe-image-zoom.vue";
import { RipeImageZoomHover } from "./ripe-image-zoom-hover/ripe-image-zoom-hover.vue";
import { RipePickers } from "./ripe-pickers/ripe-pickers.vue";
import { RipePrice } from "./ripe-price/ripe-price.vue";

const install = Vue => {
    Vue.component("ripe-configurator", RipeConfigurator);
    Vue.component("ripe-image", RipeImage);
    Vue.component("ripe-image-zoom", RipeImageZoom);
    Vue.component("ripe-image-zoom-hover", RipeImageZoomHover);
    Vue.component("ripe-pickers", RipePickers);
    Vue.component("ripe-price", RipePrice);
};

export { RipeConfigurator, RipeImage, RipeImageZoom, RipeImageZoomHover, RipePickers, RipePrice };

export default install;
