const assert = require("assert");
const base = require("../../base");

describe("RipeImage", () => {
    it("should instantiate the component", () => {
        const component = base.getComponent("RipeImage", {
            props: {
                brand: "dummy",
                model: "cube",
                version: 52,
                size: 1000
            }
        });

        assert.strictEqual(component.emitted("loading").length, 1);
    });
});
