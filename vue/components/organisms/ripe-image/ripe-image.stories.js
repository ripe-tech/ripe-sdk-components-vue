import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeImage", () => ({
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
            initials: {
                default: text("Initials", "")
            },
            engraving: {
                default: text("Engraving", "style:black")
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
            ripe: {
                default: () => new Ripe()
            }
        },
        template: `
            <ripe-image
                v-bind:brand="brand"
                v-bind:model="model"
                v-bind:version="version"
                v-bind:parts="parts"
                v-bind:initials="initials"
                v-bind:engraving="engraving"
                v-bind:frame="frame"
                v-bind:size="size"
                v-bind:format="format"
                v-bind:crop="crop"
                v-bind:show-initials="showInitials"
                v-bind:initials-group="'main'"
                v-bind:ripe="ripe"
                v-bind:config="true"
            />
        `
    }));
