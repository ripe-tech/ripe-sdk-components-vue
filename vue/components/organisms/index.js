import { RipeImage } from "./ripe-image/ripe-image.vue";

const install = Vue => {
    Vue.component("ripe-image", RipeImage);
};

export { RipeImage };

export default install;
