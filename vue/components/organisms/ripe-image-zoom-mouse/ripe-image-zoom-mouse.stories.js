import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeImageZoomMouse", () => ({
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
                default: text("Frame", "side-0")
            },
            size: {
                type: Number,
                default: number("Size", 1000)
            },
            format: {
                type: String,
                default: text("Format", "png")
            },
            crop: {
                type: Boolean,
                default: boolean("Crop", true)
            },
            showInitials: {
                type: Boolean,
                default: boolean("Show Initials", true)
            },
            zoom: {
                type: Number,
                default: number("Zoom", 140)
            },
            scrollZoom: {
                type: Boolean,
                default: boolean("Enable Scroll Zoom", true)
            },
            scrollSensitivity: {
                type: Number,
                default: number("Scroll Zoom Sensitivity", 1)
            },
            state: {
                type: Object,
                default: () => ({
                    initialsExtra: {
                        main: {
                            initials: "A",
                            engraving: "style:white"
                        }
                    }
                })
            }
        },
        template: `
            <ripe-image-zoom-mouse
                v-bind:brand="brand"
                v-bind:model="model"
                v-bind:version="version"
                v-bind:parts="parts"
                v-bind:frame="frame"
                v-bind:size="size"
                v-bind:format="format"
                v-bind:crop="crop"
                v-bind:show-initials="showInitials"
                v-bind:initials-group="'main'"
                v-bind:state="state"
                v-bind:zoom="zoom"
                v-bind:scroll-zoom="scrollZoom"
                v-bind:scroll-sensitivity="scrollSensitivity"
            />
        `
    }));
