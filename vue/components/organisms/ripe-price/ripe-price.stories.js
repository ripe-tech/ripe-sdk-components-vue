import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipePrice", () => ({
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
                        color: "blue",
                        material: "leather_cbe",
                        face: "side"
                    },
                    shadow: {
                        color: "default",
                        hidden: true,
                        material: "default"
                    },
                    top0_bottom: {
                        color: "red",
                        face: "side",
                        material: "leather_cbe"
                    }
                })
            },
            currency: {
                type: String,
                default: text("Currency", "USD")
            }
        },
        template: `
            <ripe-price
                v-bind:brand="brand"
                v-bind:model="model"
                v-bind:version="version"
                v-bind:parts="parts"
                v-bind:currency="currency"
            />
        `
    }));
