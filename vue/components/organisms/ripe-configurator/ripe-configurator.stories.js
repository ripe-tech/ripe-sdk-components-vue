import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeConfigurator", () => ({
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
            frame: {
                type: String,
                default: text("Frame", "side-4")
            },
            size: {
                type: Number,
                default: number("Size", 1000)
            }
        },
        data: function() {
            return {
                frameData: this.frame
            };
        },
        watch: {
            frame(value) {
                this.frameData = value;
            }
        },
        template: `
            <div>
                <p>Frame: {{ frameData }}</p>
                <ripe-configurator
                    v-bind:brand="brand"
                    v-bind:model="model"
                    v-bind:version="version"
                    v-bind:frame.sync="frameData"
                    v-bind:size="size"
                />
            </div>
        `
    }));
