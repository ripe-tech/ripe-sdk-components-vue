import { RipeConfigurator } from "./ripe-configurator/ripe-configurator.vue";
import { RipeImage } from "./ripe-image/ripe-image.vue";
import { RipeImageZoom } from "./ripe-image-zoom/ripe-image-zoom.vue";
import { RipeImageZoomMouse } from "./ripe-image-zoom-mouse/ripe-image-zoom-mouse.vue";
import { RipePickers } from "./ripe-pickers/ripe-pickers.vue";
import { RipePrice } from "./ripe-price/ripe-price.vue";

const install = Vue => {
    Vue.component("ripe-configurator", RipeConfigurator);
    Vue.component("ripe-image", RipeImage);
    Vue.component("ripe-image-zoom", RipeImageZoom);
    Vue.component("ripe-image-zoom-mouse", RipeImageZoomMouse);
    Vue.component("ripe-pickers", RipePickers);
    Vue.component("ripe-price", RipePrice);
};

export { RipeConfigurator, RipeImage, RipeImageZoom, RipeImageZoomMouse, RipePickers, RipePrice };

export default install;
