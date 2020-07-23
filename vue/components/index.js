import Atoms from "./atoms";
import Organisms from "./organisms";

export const install = Vue => {
    Vue.use(Atoms);
    Vue.use(Organisms);
};

export * from "./atoms";
export * from "./organisms";

export default install;
