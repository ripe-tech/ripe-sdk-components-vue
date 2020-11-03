import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

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
            <ripe-image
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
            />
        `
    }));
