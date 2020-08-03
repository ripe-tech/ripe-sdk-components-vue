import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

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
                default: number("Size", 800)
            },
            loader: {
                type: Boolean,
                default: boolean("Loader", true)
            },
            selectedPart: {
                type: String,
                default: text("Selected Part", "side")
            },
            highlightedPart: {
                type: String,
                default: text("Highlighted Part", "side")
            },
            sensitivity: {
                type: Number,
                default: number("Sensitivity", 40)
            },
            useMasks: {
                type: Boolean,
                default: boolean("Use Masks", true)
            },
            duration: {
                type: Number,
                default: number("Duration", 1000)
            },
            animation: {
                type: String,
                default: text("Animation", "cross")
            },
            format: {
                type: String,
                default: text("Format", "png")
            }
        },
        data: function() {
            return {
                frameData: this.frame,
                highlightedPartData: this.highlightedPart
            };
        },
        watch: {
            frame(value) {
                this.frameData = value;
            },
            highlightedPart(value) {
                this.highlightedPartData = value;
            }
        },
        template: `
            <div>
                <p>Frame: {{ frameData }}</p>
                <p>Highlighted Part: {{ highlightedPartData }}</p>
                <ripe-configurator
                    v-bind:brand="brand"
                    v-bind:model="model"
                    v-bind:version="version"
                    v-bind:frame.sync="frameData"
                    v-bind:size="size"
                    v-bind:loader="loader"
                    v-bind:selected-part="selectedPart"
                    v-bind:highlighted-part.sync="highlightedPartData"
                    v-bind:sensitivity="sensitivity"
                    v-bind:use-masks="useMasks"
                    v-bind:duration="duration"
                    v-bind:animation="animation"
                    v-bind:format="format"
                />
            </div>
        `
    }));
