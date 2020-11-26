import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Interaction", () => ({
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
            initials: {
                default: text("Initials", "")
            },
            engraving: {
                default: text("Engraving", "")
            },
            currency: {
                default: text("Currency", "EUR")
            },
            frame: {
                type: String,
                default: text("Frame", "side-0")
            }
        },
        computed: {
            structure() {
                return {
                    brand: this.brand,
                    model: this.model,
                    version: this.version,
                    parts: null,
                    currency: this.currency,
                    initials: this.initials,
                    engraving: this.engraving,
                    initials_extra: {}
                };
            }
        },
        template: `
            <div>
                <ripe-configurator
                    v-bind:structure="structure"
                    v-bind:size="400"
                    style="display: inline-block"
                />
                <ripe-image 
                    v-bind:structure="structure" 
                    v-bind:frame="frame"
                    v-bind:size="400"
                />
                <ripe-price v-bind:structure="structure" />
                <ripe-pickers v-bind:structure="structure" />
            </div>
        `
    }));
