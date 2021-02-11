import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

storiesOf("Components/Organisms/Ripe Price", module)
    .addDecorator(withKnobs)
    .add("Ripe Price", () => ({
        props: {
            brand: {
                type: String,
                default: text("Brand", "dummy")
            },
            model: {
                type: String,
                default: text("Model", "cube")
            },
            version: {
                type: Number,
                default: number("Version", 52)
            },
            parts: {
                type: Object,
                default: () => ({
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
                })
            },
            currency: {
                type: String,
                default: text("Currency", "USD")
            },
            ripe: {
                default: () => new Ripe()
            }
        },
        template: `
            <ripe-price
                v-bind:brand="brand"
                v-bind:model="model"
                v-bind:version="version"
                v-bind:parts="parts"
                v-bind:currency="currency"
                v-bind:ripe="ripe"
                v-bind:config="true"
            />
        `
    }));
