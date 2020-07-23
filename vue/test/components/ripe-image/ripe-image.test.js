const assert = require("assert");
const base = require("../../base");

describe("RipeImage", () => {
    it("should instantiate the component", async () => {
        const component = base.getComponent("RipeImage", {
            props: { brand: "dummy", model: "cube", version: 52, size: 1000 }
        });

        assert.strictEqual(component.emitted("loading").length, 1);
    });

    it("should return error when instantiating the component", async () => {
        const component = base.getComponent("RipeImage", {
            props: { brand: "dummy_not_valid", model: "cube_not_valid", version: 52, size: 1000 }
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        assert.strictEqual(component.emitted("error").length, 1);
    });
});
