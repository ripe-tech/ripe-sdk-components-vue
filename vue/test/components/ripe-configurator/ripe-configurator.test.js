const assert = require("assert");
const base = require("../../base");

class MockErrorRipeApi {
    bindConfigurator() {
        return {
            bind() {},
            resize() {}
        };
    }

    config() {
        throw new Error("Error");
    }
}

describe("RipeConfigurator", () => {
    it("should instantiate the component", () => {
        const component = base.getComponent("RipeConfigurator", {
            props: { brand: "dummy", model: "cube", version: 52, size: 1000 }
        });

        const loader = component.find(".loader");

        assert.strictEqual(loader.exists(), true);
        assert.strictEqual(component.emitted("loading").length, 1);
    });

    it("should return error when instantiating the component", () => {
        const component = base.getComponent("RipeConfigurator", {
            props: {
                brand: "dummy_not_valid",
                model: "cube_not_valid",
                version: 52,
                size: 1000,
                ripeSdk: new MockErrorRipeApi()
            }
        });

        assert.strictEqual(component.emitted("error").length, 1);
    });
});
