const assert = require("assert");
const base = require("../../base");

const ripe = require("ripe-sdk");

describe("RipePickers", () => {
    it("should instantiate the component", () => {
        const ripeInstance = new ripe.Ripe("dummy", "cube", {
            version: 52
        });
        const component = base.getComponent("RipePickers", {
            props: {
                ripe: ripeInstance
            }
        });

        assert.strictEqual(component.emitted("loading").length, 1);
    });
});
