<template>
    <img
        class="ripe-image"
        v-bind:alt="name"
        src=""
        ref="image"
        v-on:load="onLoaded"
    />
</template>

<style scoped>
.image {
    cursor: pointer;
    display: block;
}
</style>

<script>
import { Ripe } from "ripe-sdk";

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
         * Instance of Ripe SDK initialized
         */
        ripeSdk: {
            type: Object,
            default: null
        },
        /**
         * Name of the image
         */
        name: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            image: null,
            loading: true
        };
    },
    watch: {
        frame: {
            handler: async function(value) {
                this.loading = true;
                await this.unbindImage();

                this.image = global.ripeSdk.bindImage(this.$refs.image, {
                    frame: value,
                    size: this.size || undefined
                });
            }
        },
        size: {
            handler: async function(value) {
                this.loading = true;
                // await this.unbindImage();

                console.log("here");

                this.image = global.ripeSdk.bindImage(this.$refs.image, {
                    frame: this.frame,
                    size: value
                });
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

        this.image = global.ripeSdk.bindImage(this.$refs.image, {
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
            if (this.ripeSdk) {
                global.ripeSdk = this.ripeSdk;
                return;
            }

            if (!global.ripeSdk) {
                global.ripeSdk = new Ripe();
            }

            try {
                this.loading = true;
                await global.ripeSdk.config(this.brand, this.model, {
                    version: this.version,
                    parts: this.parts
                });
            } catch (error) {
                this.loading = false;
                this.$emit("error", error);
            }
        },
        async unbindImage() {
            if (this.image) await global.ripeSdk.unbindImage(this.image);
            this.image = null;
        },
        onLoaded() {
            this.loading = false;
        }
    },
    destroyed: async function() {
        await this.unbindImage();
    }
};

export default RipeImage;
</script>
