<template>
    <img class="ripe-image" v-bind:alt="name || model" ref="image" v-on:load="onLoaded" />
</template>

<style scoped>
.image {
    cursor: pointer;
    display: block;
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
         * Indicates that the component should apply the config internally
         * on component initialization.
         */
        config: {
            type: Boolean,
            default: true
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
         * Tuple that defines the target width and height (only
         * one dimension is required) for the "inside" image to be generated, note that
         * if both dimensions are defined image deformation may occur. Example:
         * [100, 100]
         */
        bounding_box: {
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
         * The name of the profile to be used. A profile what what defines a premade configuration
         * in a specific product. The configuration can set the values such as the font type, color
         * and size, the initials position and rotation. This supports the use of namespacing.
         */
        initials_profile: {
            type: Array,
            default: null
        },
        /**
         * The name of the profiles to be used. A profile what what defines a premade configuration
         * in a specific product. The configuration can set the values such as the font type, color
         * and size, the initials position and rotation. This supports the use of namespacing.
         */
        initials_profiles: {
            type: Array,
            default: null
        },
        /**
         * Overrides the initials_profile's position on the x axis.
         */
        initials_x: {
            type: Number,
            default: null
        },
        /**
         * Overrides the initials_profile's position on the y axis.
         */
        initials_y: {
            type: Number,
            default: null
        },
        /**
         * Overrides the initials_profile's width.
         */
        initials_width: {
            type: Number,
            default: null
        },
        /**
         * Overrides the initials_profile's height.
         */
        initials_height: {
            type: Number,
            default: null
        },
        /**
         * Overrides the initials_profile's viewport. Viewport is a window (specified by [x, y, width, height])
         * that defines a region to be shown with a zoom. It is used to showcase the initials.
         */
        initials_viewport: {
            type: Array,
            default: null
        },
        /**
         * Overrides the initials_profile's color to be applied to the initials.
         */
        initials_color: {
            type: String,
            default: null
        },
        /**
         * Overrides the initials_profile's opacity to be applied to the initials. This value ranges from
         * 0 to 1.
         */
        initials_opacity: {
            type: Number,
            default: null
        },
        /**
         * Overrides the initials_profile's orientation of the initials to be applied. This field can be
         * left, right or center.
         */
        initials_align: {
            type: String,
            default: null
        },
        /**
         * Overrides the initials_profile's vertical alignment on the initials. This field can be top,
         * bottom or middle.
         */
        initials_vertical: {
            type: String,
            default: null
        },
        /**
         * Overrides the initials_profile's embossing type of the initials. The available options
         * vary with each model.
         */
        initials_embossing: {
            type: String,
            default: null
        },
        /**
         * Overrides the initials_profile's rotation angle, in degrees, to be applied to the initials.
         */
        initials_rotation: {
            type: Number,
            default: null
        },
        /**
         * Initials' z-index value to be using when composing, ensuring proper layering of the
         * rendered image.
         */
        initials_z_index: {
            type: Number,
            default: null
        },
        /**
         * Algorithm to be used for initials (defaults to 'mask_top').
         */
        initials_algorithm: {
            type: String,
            default: null
        },
        /**
         * The background color to be used in the generation of the antialiasing (defaults to '000000').
         */
        initials_blend_color: {
            type: String,
            default: null
        },
        /**
         * Pattern to be used when tiling.
         */
        initials_pattern: {
            type: String,
            default: null
        },
        /**
         * Texture image to be used when filling the initials.
         */
        initials_texture: {
            type: String,
            default: null
        },
        /**
         * Parts to exclude when applying the initials.
         */
        initials_exclusion: {
            type: String,
            default: null
        },
        /**
         * Parts to include when applying the initials.
         */
        initials_inclusion: {
            type: String,
            default: null
        },
        /**
         * Parts to include when applying the initials.
         */
        initials_image_rotation: {
            type: Number,
            default: null
        },
        /**
         * Flip the image arround the X axis.
         */
        initials_image_flip: {
            type: Boolean,
            default: null
        },
        /**
         * Mirror the image arround the Y axis.
         */
        initials_image_mirror: {
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
         * Displays the Debug information box.
         */
        initials_debug: {
            type: Boolean,
            default: null
        },
        /**
         * Font Family to be used (system font or made available within the vendor's build).
         */
        font_family: {
            type: String,
            default: null
        },
        /**
         * Font Weight variant to be used.
         */
        font_weight: {
            type: String,
            default: null
        },
        /**
         * Font Size.
         */
        font_size: {
            type: String,
            default: null
        },
        /**
         * Font Spacing.
         */
        font_spacing: {
            type: String,
            default: null
        },
        /**
         * Font Trim
         */
        font_trim: {
            type: Number,
            default: null
        },
        /**
         * Mask strategy when using raster fonts: 'self' means that the alpha channel of the
         * letter image is going to be used to defined both which pixels are going to be passed
         * in the paste operation and the intensity; 'simple' means that just the pixels with
         * a valid alpha value (greater than zero) will be passed to the target image.
         */
        font_mask: {
            type: String,
            default: null
        },
        /**
         * Forces a specific font mode, may improve text render (vector fonts) - it's used by
         * some graphics drivers to indicate what mode the driver prefers; usually when the
         * font uses antialiasing the mode 'L' shall improve rendering.
         */
        font_mode: {
            type: String,
            default: null
        },
        /**
         * Line Height.
         */
        line_height: {
            type: Number,
            default: null
        },
        /**
         * Line break, is optional and can have one of (normal and word_break).
         */
        line_breaking: {
            type: Boolean,
            default: null
        },
        /**
         * Shadow.
         */
        shadow: {
            type: Boolean,
            default: null
        },
        /**
         * Shadow Color.
         */
        shadow_color: {
            type: String,
            default: null
        },
        /**
         * Shadow Offset.
         */
        shadow_offset: {
            type: String,
            default: null
        },
        /**
         * Offsets.
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
        }
    },
    data: function() {
        return {
            /**
             * The image created by the Ripe instance, currently being shown.
             */
            image: null,
            /**
             * Flag that controls if the initial loading process for
             * the image is still running.
             */
            loading: true,
            /**
             * Parts of the model to be used for the internal sync
             * operation.
             */
            partsData: this.parts,
            /**
             * RIPE instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.ripe
        };
    },
    watch: {
        parts: {
            handler: async function(value, previous) {
                if (this.equalParts(value, previous)) return;

                this.partsData = value;
                await this.setPartsRipe(value);
            }
        },
        partsData: {
            handler: function(value) {
                this.$emit("update:parts", value);
            }
        },
        frame: {
            handler: function(value) {
                this.loading = true;
                this.image.setFrame(value);
            }
        },
        size: {
            handler: async function(value) {
                this.loading = true;
                this.image.resize(value);
            }
        },
        loading: {
            handler: function(value) {
                if (value) this.$emit("loading");
                else this.$emit("loaded");
            },
            immediate: true
        },
        showInitials: {
            handler: function(value) {
                this.image.setShowInitials(value);
            }
        },
        initialsBuilder: {
            handler: function(value) {
                this.image.setInitialsBuilder(value);
            }
        },
        state: {
            handler: async function(value) {
                await this.image.update(this.state);
            }
        },
        configProps: {
            handler: async function(value) {
                if (this.config) await this.configRipe();
            }
        },
        imageProps: {
            handler: async function(value) {
                await this.image?.updateOptions(value);
            }
        }
    },
    computed: {
        configProps() {
            return {
                brand: this.brand,
                model: this.model,
                version: this.version,
                parts: this.parts
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
                bounding_box: this.bounding_box,
                algorithm: this.algorithm,
                background: this.background,
                engine: this.engine,
                initials_profile: this.initials_profile,
                initials_profiles: this.initials_profiles,
                initials_x: this.initials_x,
                initials_y: this.initials_y,
                initials_width: this.initials_width,
                initials_height: this.initials_height,
                initials_viewport: this.initials_viewport,
                initials_color: this.initials_color,
                initials_opacity: this.initials_opacity,
                initials_align: this.initials_align,
                initials_vertical: this.initials_vertical,
                initials_embossing: this.initials_embossing,
                initials_rotation: this.initials_rotation,
                initials_z_index: this.initials_z_index,
                initials_algorithm: this.initials_algorithm,
                initials_blend_color: this.initials_blend_color,
                initials_pattern: this.initials_pattern,
                initials_texture: this.initials_texture,
                initials_exclusion: this.initials_exclusion,
                initials_inclusion: this.initials_inclusion,
                initials_image_rotation: this.initials_image_rotation,
                initials_image_flip: this.initials_image_flip,
                initials_image_mirror: this.initials_image_mirror,
                debug: this.debug,
                initials_debug: this.initials_debug,
                font_family: this.font_family,
                font_weight: this.font_weight,
                font_size: this.font_size,
                font_spacing: this.font_spacing,
                font_trim: this.font_trim,
                font_mask: this.font_mask,
                font_mode: this.font_mode,
                line_height: this.line_height,
                line_breaking: this.line_breaking,
                shadow: this.shadow,
                shadow_color: this.shadow_color,
                shadow_offset: this.shadow_offset,
                offsets: this.offsets,
                curve: this.curve
            };
        }
    },
    mounted: async function() {
        await this.setupRipe();

        // saves the model parts after the RIPE configuration so that
        // possible changes due to restrictions can be communicated
        // to the parent component
        this.partsData = Object.assign({}, this.ripeData.parts);

        this.ripeData.bind("parts", parts => {
            if (this.equalParts(parts, this.partsData)) return;
            this.partsData = parts;
        });

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
            bounding_box: this.bounding_box,
            algorithm: this.algorithm,
            background: this.background,
            engine: this.engine,
            initials_profile: this.initials_profile,
            initials_profiles: this.initials_profiles,
            initials_x: this.initials_x,
            initials_y: this.initials_y,
            initials_width: this.initials_width,
            initials_height: this.initials_height,
            initials_viewport: this.initials_viewport,
            initials_color: this.initials_color,
            initials_opacity: this.initials_opacity,
            initials_align: this.initials_align,
            initials_vertical: this.initials_vertical,
            initials_embossing: this.initials_embossing,
            initials_rotation: this.initials_rotation,
            initials_z_index: this.initials_z_index,
            initials_algorithm: this.initials_algorithm,
            initials_blend_color: this.initials_blend_color,
            initials_pattern: this.initials_pattern,
            initials_texture: this.initials_texture,
            initials_exclusion: this.initials_exclusion,
            initials_inclusion: this.initials_inclusion,
            initials_image_rotation: this.initials_image_rotation,
            initials_image_flip: this.initials_image_flip,
            initials_image_mirror: this.initials_image_mirror,
            debug: this.debug,
            initials_debug: this.initials_debug,
            font_family: this.font_family,
            font_weight: this.font_weight,
            font_size: this.font_size,
            font_spacing: this.font_spacing,
            font_trim: this.font_trim,
            font_mask: this.font_mask,
            font_mode: this.font_mode,
            line_height: this.line_height,
            line_breaking: this.line_breaking,
            shadow: this.shadow,
            shadow_color: this.shadow_color,
            shadow_offset: this.shadow_offset,
            offsets: this.offsets,
            curve: this.curve
        });
        this.image.update(this.state);
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
