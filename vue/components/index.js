import Organisms from "./organisms";

export const install = Vue => {
    Vue.use(Organisms);
};

export * from "./organisms";

export default install;
