import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Interaction Structure", () => ({
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
        data: function() {
            return {
                structureData: {
                    brand: this.brand.brand,
                    model: this.brand.model,
                    version: this.brand.version,
                    parts: null,
                    initials: this.initials,
                    engraving: this.engraving
                }
            };
        },
        watch: {
            brand(value) {
                this.structureData = {
                    ...this.structureData,
                    brand: value.brand,
                    model: value.model,
                    version: value.version
                };
            },
            parts(value) {
                this.structureData = {
                    ...this.structureData,
                    parts: value
                };
            },
            initials(value) {
                this.structureData = {
                    ...this.structureData,
                    initials: value
                };
            },
            engraving(value) {
                this.structureData = {
                    ...this.structureData,
                    engraving: value
                };
            }
        },
        template: `
            <div>
                <ripe-configurator
                    v-bind:structure.sync="structureData"
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
