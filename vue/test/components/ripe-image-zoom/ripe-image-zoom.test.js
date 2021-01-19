const assert = require("assert");
const base = require("../../base");
const config = require("../../config");

describe("RipeImageZoom", () => {
    this.timeout(config.TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const component = base.getComponent("RipeImageZoom", {
            props: {
                brand: "dummy",
                model: "cube",
                version: 52,
                size: 1000,
                zoom: 100,
                pivot: { x: 0, y: 0 }
            }
        });

        assert.strictEqual(component.exists(), true);
    });
});
