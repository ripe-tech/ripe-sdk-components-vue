const assert = require("assert");
const base = require("../../base");

const ripe = require("ripe-sdk").ripe;

class MockRipeSdk {
    constructor() {
        this.sdk = new ripe.Ripe({ init: false });
        this.choices = {
            side: {
                available: true,
                materials: {
                    crocodile_cbe: {
                        available: true,
                        colors: { black: { available: true }, chestnut: { available: true } }
                    },
                    leather_cbe: {
                        available: true,
                        colors: {
                            black: { available: true },
                            blue: { available: true },
                            brown: { available: true },
                            red: { available: true }
                        }
                    },
                    suede_cbe: {
                        available: true,
                        colors: {
                            blue: { available: true },
                            fuchsia: { available: true },
                            red: { available: true }
                        }
                    }
                }
            },
            top0_bottom: {
                available: true,
                materials: {
                    crocodile_cbe: {
                        available: true,
                        colors: { black: { available: true }, chestnut: { available: true } }
                    },
                    leather_cbe: {
                        available: true,
                        colors: {
                            black: { available: true },
                            blue: { available: true },
                            brown: { available: true },
                            red: { available: true }
                        }
                    },
                    suede_cbe: {
                        available: true,
                        colors: {
                            blue: { available: true },
                            fuchsia: { available: true },
                            red: { available: true }
                        }
                    }
                }
            },
            patch: {
                available: true,
                materials: {
                    patch_cbe: {
                        available: true,
                        colors: { smiley: { available: true }, egg: { available: true } }
                    }
                }
            }
        };
        this.options = {
            parts: {
                side: {
                    color: "black",
                    material: "crocodile_cbe",
                    face: "side"
                },
                shadow: {
                    color: "default",
                    hidden: true,
                    material: "default"
                },
                top0_bottom: {
                    color: "fuchsia",
                    face: "side",
                    material: "suede_cbe"
                }
            }
        };
    }

    isReady() {}
    bind() {}
}

describe("RipePickers", () => {
    it("should instantiate the component", async () => {
        const ripeInstance = new MockRipeSdk();
        const component = await base.getComponent("RipePickers", { props: { ripe: ripeInstance } });

        assert.strictEqual(component.emitted("loading").length, 1);

        await component.vm.$forceUpdate();
        assert.strictEqual(component.find(".select.parts").exists(), true);
        assert.strictEqual(component.find(".select.materials").exists(), true);
        assert.strictEqual(component.find(".select.colors").exists(), true);
    });

    it("should sync selects options", async () => {
        const ripeInstance = new MockRipeSdk();
        const component = await base.getComponent("RipePickers", { props: { ripe: ripeInstance } });

        await component.vm.$forceUpdate();
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 1);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 1);

        await component.setData({ selectedPart: "side" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 1);

        await component.setData({ selectedPart: "patch" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 2);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 3);

        await component.setData({ selectedPart: "top0_bottom" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 1);

        await component.setData({ selectedPart: "side" });
        await component.setData({ selectedMaterial: "crocodile_cbe" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 3);

        await component.setData({ selectedPart: "side" });
        await component.setData({ selectedMaterial: "leather_cbe" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 5);

        await component.setData({ selectedPart: "top0_bottom" });
        await component.setData({ selectedMaterial: "leather_cbe" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 5);

        await component.setData({ selectedPart: "top0_bottom" });
        await component.setData({ selectedMaterial: "suede_cbe" });
        assert.strictEqual(component.find(".select.parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select.colors").findAll("option").length, 4);
    });
});
