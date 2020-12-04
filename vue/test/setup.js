require("jsdom-global")(undefined, {
    url: "https://mock.ripe-pulse.platforme.com/"
});
window.HTMLCanvasElement.prototype.getContext = () => {
    return {};
};
global.fetch = require("node-fetch");
