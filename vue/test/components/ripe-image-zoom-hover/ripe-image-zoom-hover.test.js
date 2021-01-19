const assert = require("assert");
const base = require("../../base");
const config = require("../../config");

describe("RipeImageZoomHover", function() {
    this.timeout(config.TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const component = base.getComponent("RipeImageZoomHover", {
            props: {
                brand: "dummy",
                model: "cube",
                version: 52,
                size: 1000,
                zoom: 100
            }
        });

        assert.strictEqual(component.exists(), true);
    });
});
