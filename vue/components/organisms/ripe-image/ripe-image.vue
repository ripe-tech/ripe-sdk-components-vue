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

                // does not update the parts in the sdk if
                // the model configuration is about to be
                // changed, preventing outdated calls
                if (this.brand !== this.ripeData.brand ||
                    this.model !== this.ripeData.model ||
                    this.version !== this.ripeData.version) return;
                
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
                await this.configRipe();
            }
        },
        imageProps: {
            handler: async function(value) {
                await this.image.updateOptions(value);
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
                initialsGroup: this.initialsGroup
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
            initialsBuilder: this.initialsBuilder
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
