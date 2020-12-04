const assert = require("assert");
const Ripe = require("ripe-sdk").Ripe;

const base = require("../../base");

const _parts = {
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
};
const _choices = {
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

describe("RipePickers", () => {
    it("should instantiate the component", async () => {
        const ripeInstance = new Ripe("dummy", "cube", {
            version: 52,
            parts: _parts
        });
        const component = await base.getComponent("RipePickers", { props: { ripe: ripeInstance } });

        assert.strictEqual(component.emitted("loading").length, 1);

        await ripeInstance.isReady();
        await ripeInstance.trigger("choices", _choices);
        await component.vm.$forceUpdate();
        assert.strictEqual(component.find(".select-parts").exists(), true);
        assert.strictEqual(component.find(".select-materials").exists(), true);
        assert.strictEqual(component.find(".select-colors").exists(), true);
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 1);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 1);
    });

    it("should sync selects options", async () => {
        const ripeInstance = new Ripe("dummy", "cube", {
            version: 52,
            parts: _parts
        });
        const component = await base.getComponent("RipePickers", { props: { ripe: ripeInstance } });

        await ripeInstance.isReady();
        await ripeInstance.trigger("choices", _choices);
        await component.vm.$forceUpdate();
        await component.vm.onSelectPartChange("side");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 1);

        await component.vm.onSelectPartChange("patch");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 2);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 3);

        await component.vm.onSelectPartChange("top0_bottom");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 1);

        await component.vm.onSelectPartChange("side");
        await component.vm.onSelectMaterialChange("crocodile_cbe");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 3);

        await component.vm.onSelectPartChange("side");
        await component.vm.onSelectMaterialChange("leather_cbe");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 5);

        await component.vm.onSelectPartChange("top0_bottom");
        await component.vm.onSelectMaterialChange("leather_cbe");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 5);

        await component.vm.onSelectPartChange("top0_bottom");
        await component.vm.onSelectMaterialChange("suede_cbe");
        assert.strictEqual(component.find(".select-parts").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-materials").findAll("option").length, 4);
        assert.strictEqual(component.find(".select-colors").findAll("option").length, 4);
    });
});
