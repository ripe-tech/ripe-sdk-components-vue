<template>
    <div class="ripe-image-zoom">
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
            v-bind:initials-group="initialsGroup"
            v-bind:initials-builder="initialsBuilder"
            v-bind:state="state"
            v-bind:ripe="ripe"
            v-bind:name="name"
            v-bind:style="zoomStyle"
        />
    </div>
</template>

<style scoped>
.ripe-image-zoom {
    display: inline-block;
    overflow: hidden;
}
</style>

<script>
/**
 * The component that contains the RIPE SDK's image,
 * for the static render of compositions.
 */
export const RipeImageZoom = {
    name: "ripe-image-zoom",
    props: {
        /**
         * The brand of the model to be rendered into
         * the target image.
         */
        brand: {
            type: String,
            default: null
        },
        /**
         * The name of the model to be rendered into
         * the target image.
         */
        model: {
            type: String,
            default: null
        },
        /**
         * The version of the build.
         */
        version: {
            type: Number,
            default: null
        },
        /**
         * The parts of the customized build as a dictionary mapping the
         * name of the part to an object of material and color.
         */
        parts: {
            type: Object,
            default: null
        },
        /**
         * The name of the frame to be shown in the configurator using
         * the normalized frame format (eg: side-1).
         */
        frame: {
            type: String,
            default: null
        },
        /**
         * The size (in pixels) of the image shown in the configurator.
         */
        size: {
            type: Number,
            default: null
        },
        /**
         * The format of the configurator image, (eg: png, jpg, svg, etc.).
         */
        format: {
            type: String,
            default: null
        },
        /**
         * Indicates that the image composition is to be cropped.
         * Crops the current image according to the minimal possible
         * bounding box in both x and y axis
         */
        crop: {
            type: Boolean,
            default: null
        },
        /**
         * Indicates if the personalization should be shown.
         */
        showInitials: {
            type: Boolean,
            default: false
        },
        /**
         * The group in which the image initials belongs to.
         */
        initialsGroup: {
            type: String,
            defailt: null
        },
        /**
         * A function that receives the initials and engraving as strings
         * and the img element that will be used and returns a map with
         * the initials and a profile list.
         */
        initialsBuilder: {
            type: Function,
            default: null
        },
        /**
         * An object containing the state of the personalization. For each
         * group of the model it can contain the initials and the corresponding
         * engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}).
         */
        state: {
            type: Object,
            default: () => ({})
        },
        /**
         * An initialized RIPE instance form the RIPE SDK, if not defined,
         * a new SDK instance will be initialized.
         */
        ripe: {
            type: Object,
            default: null
        },
        /**
         * Name of the image.
         */
        name: {
            type: String,
            default: null
        },
        /**
         * Zoom percentage that controls the level of zoom over the original image.
         */
        zoom: {
            type: Number,
            default: 100
        },
        /**
         * The z and y coordinates of the pivot point where the zoom will be applied to.
         */
        pivot: {
            type: Object,
            default: null
        }
    },
    computed: {
        zoomStyle() {
            const base = { transform: `scale(${this.zoom / 100})` };
            if (this.pivot) {
                base.transform += ` translate(${-1 * this.pivot.x}px, ${-1 * this.pivot.y}px)`;
            }
            return base;
        }
    }
};

export default RipeImageZoom;
</script>
