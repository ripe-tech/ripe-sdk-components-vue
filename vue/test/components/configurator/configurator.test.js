const assert = require("assert");
const base = require("../../base");

describe("Configurator", () => {
    it("should instantiates the component", () => {
        const component = base.getComponent("Configurator", {
            props: { brand: "dummy", model: "cube", version: 52, size: 1000 }
        });
        assert.strictEqual(component.emitted("loading").length, 1);
    });
});
