<template>
    <img class="ripe-image" v-bind:alt="name || model" ref="image" v-on:load="onLoaded" />
</template>

<style scoped>
.ripe-image {
    display: inline-block;
}
</style>

<script>
import { logicMixin } from "../../../mixins";

/**
 * The component that contains the RIPE SDK's image,
 * for the static render of compositions.
 */
export const RipeImage = {
    name: "ripe-image",
    mixins: [logicMixin],
    props: {
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
         * bounding box in both x and y axis.
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
            default: null
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
         * The angle in degrees of the rotation to apply on the model.
         */
        rotation: {
            type: Number,
            default: null
        },
        /**
         * If set flips the current image vertically, this operation is going
         * to be performed before rotation.
         */
        flip: {
            type: Boolean,
            default: null
        },
        /**
         * If set mirrors the current image horizontally, this operation is going
         * to be performed before rotation.
         */
        mirror: {
            type: Boolean,
            default: null
        },
        /**
         * Tuple that defines the target width and height (only one dimension is required)
         * for the "inside" image to be generated, note that if both dimensions are defined
         * image deformation may occur. Example: [100, 100].
         */
        boundingBox: {
            type: Array,
            default: null
        },
        /**
         * The name of the blending algorithm that is going to be
         * used in the blending of the multiple part layers.
         */
        algorithm: {
            type: String,
            default: null
        },
        /**
         * String that defines the color to be applied to the background
         * in the "RRGGBB" hexadecimal format. Example: "ffffff".
         */
        background: {
            type: String,
            default: null
        },
        /**
         * The name of the engine that is going to be used for the composition
         * of the image (eg: base, rust, etc.), if not provided the best available is going
         * to be used for the composition process.
         */
        engine: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles position on the x axis.
         */
        initialsX: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles position on the y axis.
         */
        initialsY: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles width.
         */
        initialsWidth: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles height.
         */
        initialsHeight: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles viewport. Viewport is a window (specified by [x, y, width, height])
         * that defines a region to be shown with a zoom. It is used to showcase the initials.
         */
        initialsViewport: {
            type: Array,
            default: null
        },
        /**
         * Overrides the profiles color to be applied to the initials.
         */
        initialsColor: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles opacity to be applied to the initials. This value ranges from
         * 0 to 1.
         */
        initialsOpacity: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles orientation of the initials to be applied. This field can be
         * left, right or center.
         */
        initialsAlign: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles vertical alignment on the initials. This field can be top,
         * bottom or middle.
         */
        initialsVertical: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles embossing type of the initials. The available options
         * vary with each model.
         */
        initialsEmbossing: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles rotation angle, in degrees, to be applied to the initials.
         */
        initialsRotation: {
            type: Number,
            default: null
        },
        /**
         * Initials' z-index value to be using when composing, ensuring proper layering of the
         * rendered image.
         */
        initialsZindex: {
            type: Number,
            default: null
        },
        /**
         * Algorithm to be used for initials (defaults to 'mask_top').
         */
        initialsAlgorithm: {
            type: String,
            default: null
        },
        /**
         * The background color to be used in the generation of the antialiasing (defaults to '000000').
         */
        initialsBlendColor: {
            type: String,
            default: null
        },
        /**
         * Pattern to be used when tiling.
         */
        initialsPattern: {
            type: String,
            default: null
        },
        /**
         * Texture image to be used when filling the initials.
         */
        initialsTexture: {
            type: String,
            default: null
        },
        /**
         * Parts to exclude when applying the initials.
         */
        initialsExclusion: {
            type: Array,
            default: null
        },
        /**
         * Parts to include when applying the initials.
         */
        initialsInclusion: {
            type: Array,
            default: null
        },
        /**
         * Overrides the profile's rotation angle, in degrees, to be applied to image.
         */
        initialsImageRotation: {
            type: Number,
            default: null
        },
        /**
         * Flip the image around the X axis.
         */
        initialsImageFlip: {
            type: Boolean,
            default: null
        },
        /**
         * Mirror the image around the Y axis.
         */
        initialsImageMirror: {
            type: Boolean,
            default: null
        },
        /**
         * Displays the Debug information box.
         */
        debug: {
            type: Boolean,
            default: null
        },
        /**
         * Overrides the profiles font to be applied on the initials.
         */
        fontFamily: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles font weight to be applied on the initials.
         */
        fontWeight: {
            type: String | Number,
            default: null
        },
        /**
         * Overrides the profiles font size to be applied on the initials.
         */
        fontSize: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles spacing between each letter.
         */
        fontSpacing: {
            type: Number,
            default: null
        },
        /**
         * Overrides the profiles font trim, which defines if the initials are trimmed.
         */
        fontTrim: {
            type: Boolean,
            default: null
        },
        /**
         * Mask strategy when using raster fonts: 'self' means that the alpha channel of the
         * letter image is going to be used to defined both which pixels are going to be passed
         * in the paste operation and the intensity; 'simple' means that just the pixels with
         * a valid alpha value (greater than zero) will be passed to the target image.
         */
        fontMask: {
            type: String,
            default: null
        },
        /**
         * Forces a specific font mode, may improve text render (vector fonts) - it's used by
         * some graphics drivers to indicate what mode the driver prefers; usually when the
         * font uses antialiasing the mode 'L' shall improve rendering.
         */
        fontMode: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles line height, which defines the initials line height.
         */
        lineHeight: {
            type: Number,
            default: null
        },
        /**
         * Line break, is optional and can have one of (normal and word_break).
         */
        lineBreaking: {
            type: Boolean,
            default: null
        },
        /**
         * Overrides the profiles shadow, which defines if the initials have a shadow.
         */
        shadow: {
            type: Boolean,
            default: null
        },
        /**
         * Overrides the profiles color of the shadow to be used.
         */
        shadowColor: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles offset to be applied on the shadow.
         */
        shadowOffset: {
            type: String,
            default: null
        },
        /**
         * Overrides the profiles offset to be applied on the initials. Example:
         * {
         *   0: [0, 6],
         *   1: [0, -10],
         *   2: [0, 10]
         * }.
         */
        offsets: {
            type: Object,
            default: null
        },
        /**
         * Bezier curve control points, must contain four (e.g. [[0.2, 0.2], [0.7, 0.2],
         * [0.2, 0.5], [0.7, 0.5]]).
         */
        curve: {
            type: Array,
            default: null
        },
        /**
         * Name of the image.
         */
        name: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            /**
             * The image created by the Ripe instance, currently being shown.
             */
            image: null
        };
    },
    computed: {
        state() {
            return {
                initialsExtra: this.initialsExtra || {},
                initials: this.initials,
                engraving: this.engraving
            };
        },
        imageProps() {
            return {
                format: this.format,
                crop: this.crop,
                initialsGroup: this.initialsGroup,
                rotation: this.rotation,
                flip: this.flip,
                mirror: this.mirror,
                boundingBox: this.boundingBox,
                algorithm: this.algorithm,
                background: this.background,
                engine: this.engine,
                initialsX: this.initialsX,
                initialsY: this.initialsY,
                initialsWidth: this.initialsWidth,
                initialsHeight: this.initialsHeight,
                initialsViewport: this.initialsViewport,
                initialsColor: this.initialsColor,
                initialsOpacity: this.initialsOpacity,
                initialsAlign: this.initialsAlign,
                initialsVertical: this.initialsVertical,
                initialsEmbossing: this.initialsEmbossing,
                initialsRotation: this.initialsRotation,
                initialsZindex: this.initialsZindex,
                initialsAlgorithm: this.initialsAlgorithm,
                initialsBlendColor: this.initialsBlendColor,
                initialsPattern: this.initialsPattern,
                initialsTexture: this.initialsTexture,
                initialsExclusion: this.initialsExclusion,
                initialsInclusion: this.initialsInclusion,
                initialsImageRotation: this.initialsImageRotation,
                initialsImageFlip: this.initialsImageFlip,
                initialsImageMirror: this.initialsImageMirror,
                debug: this.debug,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                fontSize: this.fontSize,
                fontSpacing: this.fontSpacing,
                fontTrim: this.fontTrim,
                fontMask: this.fontMask,
                fontMode: this.fontMode,
                lineHeight: this.lineHeight,
                lineBreaking: this.lineBreaking,
                shadow: this.shadow,
                shadowColor: this.shadowColor,
                shadowOffset: this.shadowOffset,
                offsets: this.offsets,
                curve: this.curve
            };
        }
    },
    watch: {
        frame(value) {
            if (!this.image) return;
            this.loading = true;
            this.image.setFrame(value);
        },
        async size(value) {
            if (!this.image) return;
            this.loading = true;
            this.image.resize(value);
        },
        showInitials(value) {
            this.image?.setShowInitials(value);
        },
        initialsBuilder(value) {
            this.image?.setInitialsBuilder(value);
        },
        async state(value) {
            await this.image?.update(this.state);
        },
        async imageProps(value) {
            await this.image?.updateOptions(value);
        }
    },
    mounted: async function() {
        await this.setupRipe();

        this.image = this.ripeData.bindImage(this.$refs.image, {
            frame: this.frame,
            size: this.size || undefined,
            format: this.format,
            crop: this.crop,
            showInitials: this.showInitials,
            initialsGroup: this.initialsGroup,
            initialsBuilder: this.initialsBuilder,
            rotation: this.rotation,
            flip: this.flip,
            mirror: this.mirror,
            boundingBox: this.boundingBox,
            algorithm: this.algorithm,
            background: this.background,
            engine: this.engine,
            initialsX: this.initialsX,
            initialsY: this.initialsY,
            initialsWidth: this.initialsWidth,
            initialsHeight: this.initialsHeight,
            initialsViewport: this.initialsViewport,
            initialsColor: this.initialsColor,
            initialsOpacity: this.initialsOpacity,
            initialsAlign: this.initialsAlign,
            initialsVertical: this.initialsVertical,
            initialsEmbossing: this.initialsEmbossing,
            initialsRotation: this.initialsRotation,
            initialsZindex: this.initialsZindex,
            initialsAlgorithm: this.initialsAlgorithm,
            initialsBlendColor: this.initialsBlendColor,
            initialsPattern: this.initialsPattern,
            initialsTexture: this.initialsTexture,
            initialsExclusion: this.initialsExclusion,
            initialsInclusion: this.initialsInclusion,
            initialsImageRotation: this.initialsImageRotation,
            initialsImageFlip: this.initialsImageFlip,
            initialsImageMirror: this.initialsImageMirror,
            debug: this.debug,
            fontFamily: this.fontFamily,
            fontWeight: this.fontWeight,
            fontSize: this.fontSize,
            fontSpacing: this.fontSpacing,
            fontTrim: this.fontTrim,
            fontMask: this.fontMask,
            fontMode: this.fontMode,
            lineHeight: this.lineHeight,
            lineBreaking: this.lineBreaking,
            shadow: this.shadow,
            shadowColor: this.shadowColor,
            shadowOffset: this.shadowOffset,
            offsets: this.offsets,
            curve: this.curve
        });
        await this.image.update(this.state);
    },
    methods: {
        onLoaded() {
            this.loading = false;
        }
    },
    destroyed: async function() {
        if (this.image) await this.ripeData.unbindImage(this.image);
        this.image = null;
    }
};

export default RipeImage;
</script>
