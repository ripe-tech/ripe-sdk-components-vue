<template>
    <img class="ripe-image" v-bind:alt="name" ref="image" v-on:load="onLoaded" />
</template>

<style scoped>
.image {
    cursor: pointer;
    display: block;
}
</style>

<script>
import { Ripe } from "ripe-sdk";

/**
 * The component that contains the RIPE SDK's image.
 */
export const RipeImage = {
    name: "ripe-image",
    props: {
        /**
         * The brand of the model.
         */
        brand: {
            type: String,
            default: null
        },
        /**
         * The name of the model.
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
         * The parts of the customized build.
         */
        parts: {
            type: Object,
            default: null
        },
        /**
         * The name of the frame to be shown in the configurator.
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
         * Instance of Ripe SDK initialized.
         */
        ripeSdk: {
            type: Object,
            default: null
        },
        /**
         * Name of the image.
         */
        name: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            /**
             * The image created by the Ripe SDK, currently being shown.
             */
            image: null,
            /**
             * Flag that controls if the initial loading process for
             * the image is still running.
             */
            loading: true,
            /**
             * Ripe SDK instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeSdkData: this.ripeSdk
        };
    },
    watch: {
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
        }
    },
    mounted: async function() {
        await this.setupRipeSdk();

        this.image = this.ripeSdkData.bindImage(this.$refs.image, {
            frame: this.frame,
            size: this.size || undefined
        });
    },
    methods: {
        /**
         * Initializes Ripe SDK if it does not exists and
         * configurates it with the given brand, model,
         * version and parts. If a Ripe SDK is given, it will
         * be used without further configuration.
         */
        async setupRipeSdk() {
            if (!this.ripeSdkData) {
                this.ripeSdkData = new Ripe();
            }
            try {
                this.loading = true;
                await this.ripeSdkData.config(this.brand, this.model, {
                    version: this.version,
                    parts: this.parts
                });
            } catch (error) {
                this.loading = false;
                this.$emit("error", error);
            }
            if (!global.ripeSdk) {
                global.ripeSdk = this.ripeSdkData;
            }
        },
        onLoaded() {
            this.loading = false;
        }
    },
    destroyed: async function() {
        if (this.image) await this.ripeSdkData.unbindImage(this.image);
        this.image = null;
    }
};

export default RipeImage;
</script>
