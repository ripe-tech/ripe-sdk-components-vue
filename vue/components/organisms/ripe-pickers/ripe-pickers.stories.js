import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

storiesOf("Components/Organisms/RipePickers", module)
    .addDecorator(withKnobs)
    .add("RipePickers", () => ({
        data: function() {
            return {
                ripe: null
            };
        },
        created: function() {
            this.ripe = new Ripe("dummy", "cube", {
                version: 52,
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
            });
        },
        template: `
            <ripe-pickers
                v-bind:ripe="ripe"
            />
        `
    }));
