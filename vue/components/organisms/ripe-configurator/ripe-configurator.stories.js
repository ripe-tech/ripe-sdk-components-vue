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
                default: boolean("Show loader", true)
            },
            selectedPart: {
                type: String,
                default: text("Selected part", "side")
            },
            highlightedPart: {
                type: String,
                default: text("Highlighted part", "side")
            },
            sensitivity: {
                type: Number,
                default: number("Sensitivity", 40)
            },
            useMasks: {
                type: Boolean,
                default: boolean("Use masks", true)
            },
            duration: {
                type: Number,
                default: number("Animation duration", 0)
            },
            configAnimate: {
                type: String,
                default: text("Animation configuration", undefined)
            },
            format: {
                type: String,
                default: text("Format", "png")
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
                    v-bind:parts="parts"
                    v-bind:frame.sync="frameData"
                    v-bind:size="size"
                    v-bind:loader="loader"
                    v-bind:selected-part="selectedPart"
                    v-bind:highlighted-part="highlightedPart"
                    v-bind:sensitivity="sensitivity"
                    v-bind:use-masks="useMasks"
                    v-bind:duration="duration"
                    v-bind:config-animate="configAnimate"
                    v-bind:format="format"
                />
            </div>
        `
    }));
