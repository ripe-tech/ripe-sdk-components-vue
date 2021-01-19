import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Interaction", () => ({
        props: {
            brand: {
                default: select(
                    "Model",
                    {
                        Cube: {
                            brand: "dummy",
                            model: "cube",
                            version: 52
                        },
                        "Sergio Rossi": {
                            brand: "sergio_rossi",
                            model: "sr1_pump075"
                        }
                    },
                    {
                        brand: "dummy",
                        model: "cube",
                        version: 52
                    }
                )
            },
            initials: {
                default: text("Initials", "RIPE")
            },
            engraving: {
                default: text("Engraving", "style:black")
            },
            currency: {
                default: text("Currency", "EUR")
            },
            frame: {
                type: String,
                default: text("Frame", "side-0")
            },
            ripe: {
                default: () => new Ripe()
            }
        },
        template: `
            <div>
                <ripe-configurator
                    v-bind:brand="brand.brand"
                    v-bind:model="brand.model"
                    v-bind:version="brand.version"
                    v-bind:initials="initials"
                    v-bind:engraving="engraving"
                    v-bind:currency="currency"
                    v-bind:config="true"
                    v-bind:ripe="ripe"
                    v-bind:size="400"
                    style="display: inline-block"
                />
                <ripe-image
                    v-bind:frame="frame"
                    v-bind:show-initials="true"
                    v-bind:ripe="ripe"
                    v-bind:size="400"
                />
                <ripe-price v-bind:ripe="ripe" />
                <ripe-pickers v-bind:ripe="ripe" />
            </div>
        `
    }));
