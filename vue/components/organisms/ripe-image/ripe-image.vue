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
        rotation: {
            type: Number,
            default: null
        },
        flip: {
            type: Boolean,
            default: null
        },
        mirror: {
            type: Boolean,
            default: null
        },
        bounding_box: {
            type: Array,
            default: null
        },
        algorithm: {
            type: String,
            default: null
        },
        background: {
            type: String,
            default: null
        },
        engine: {
            type: String,
            default: null
        },
        initials_profile: {
            type: Array,
            default: null
        },
        initials_profiles: {
            type: Array,
            default: null
        },
        initials_x: {
            type: Number,
            default: null
        },
        initials_y: {
            type: Number,
            default: null
        },
        initials_width: {
            type: Number,
            default: null
        },
        initials_height: {
            type: Number,
            default: null
        },
        initials_viewport: {
            type: Array,
            default: null
        },
        initials_color: {
            type: String,
            default: null
        },
        initials_opacity: {
            type: Number,
            default: null
        },
        initials_align: {
            type: String,
            default: null
        },
        initials_vertical: {
            type: String,
            default: null
        },
        initials_embossing: {
            type: String,
            default: null
        },
        initials_rotation: {
            type: Number,
            default: null
        },
        initials_z_index: {
            type: Number,
            default: null
        },
        initials_algorithm: {
            type: String,
            default: null
        },
        initials_blend_color: {
            type: String,
            default: null
        },
        initials_pattern: {
            type: String,
            default: null
        },
        initials_texture: {
            type: String,
            default: null
        },
        initials_exclusion: {
            type: String,
            default: null
        },
        initials_inclusion: {
            type: String,
            default: null
        },
        initials_image_rotation: {
            type: Number,
            default: null
        },
        initials_image_flip: {
            type: Boolean,
            default: null
        },
        initials_image_mirror: {
            type: Boolean,
            default: null
        },
        debug: {
            type: Boolean,
            default: null
        },
        initials_debug: {
            type: Boolean,
            default: null
        },
        font_family: {
            type: String,
            default: null
        },
        font_weight: {
            type: String,
            default: null
        },
        font_size: {
            type: String,
            default: null
        },
        font_spacing: {
            type: String,
            default: null
        },
        font_trim: {
            type: Boolean,
            default: null
        },
        font_mask: {
            type: String,
            default: null
        },
        font_mode: {
            type: String,
            default: null
        },
        line_height: {
            type: Number,
            default: null
        },
        line_breaking: {
            type: Boolean,
            default: null
        },
        shadow: {
            type: Boolean,
            default: null
        },
        shadow_color: {
            type: String,
            default: null
        },
        shadow_offset: {
            type: String,
            default: null
        },
        offsets: {
            type: Object,
            default: null
        },
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
