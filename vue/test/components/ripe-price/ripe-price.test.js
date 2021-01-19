const assert = require("assert");
const base = require("../../base");
const config = require("../../config");

describe("RipePrice", () => {
    this.timeout(config.TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const component = base.getComponent("RipePrice", {
            props: {
                brand: "dummy",
                model: "cube",
                version: 52,
                currency: "USD"
            }
        });

        assert.strictEqual(component.emitted("loading").length, 1);
    });
});
