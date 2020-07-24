const assert = require("assert");
const base = require("../../base");

describe("RipeConfigurator", () => {
    it("should instantiate the component", () => {
        const component = base.getComponent("RipeConfigurator", {
            props: {
                brand: "dummy",
                model: "cube",
                version: 52,
                size: 1000
            }
        });

        const loader = component.find(".loader");

        assert.strictEqual(loader.exists(), true);
        assert.strictEqual(component.emitted("loading").length, 1);
    });
});
