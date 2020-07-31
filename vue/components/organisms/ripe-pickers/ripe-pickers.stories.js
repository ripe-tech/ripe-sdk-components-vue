import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipePickers", () => ({
        props: {
            locale: {
                type: String,
                default: text("Locale", "en_us")
            }
        },
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
        methods: {
            onUpdateParts(parts) {
                console.log(parts);
            }
        },
        template: `
            <ripe-pickers
                v-bind:locale="locale"
                v-bind:ripe="ripe"
                v-on:update:parts="onUpdateParts"
            />
        `
    }));
