<template>
    <div class="ripe-configurator">
        <div class="loader-container" v-bind:style="loaderStyle" v-if="loading">
            <slot name="loader" v-if="loading">
                <loader class="loader" v-bind:loader="'ball-scale-multiple'" />
            </slot>
        </div>
        <div class="configurator-wrapper" v-bind:class="{ loading: loading }">
            <div class="config" ref="configurator" />
        </div>
    </div>
</template>

<style scoped>
.ripe-configurator {
    position: relative;
}

.ripe-configurator > .configurator-wrapper {
    position: relative;
    text-align: center;
    transition: opacity 0.125s ease-in;
}

.ripe-configurator > .configurator-wrapper.loading {
    opacity: 0;
}

.ripe-configurator > .configurator-wrapper .configurator {
    cursor: grab;
}

.ripe-configurator > .configurator-wrapper .configurator[data-frames="1"] {
    cursor: default;
}

.ripe-configurator > .configurator-wrapper .configurator.drag {
    cursor: grabbing;
}

.ripe-configurator > .configurator-wrapper .configurator.drag[data-frames="1"] {
    cursor: default;
}

.ripe-configurator > .configurator-wrapper .configurator.highlight {
    cursor: pointer;
}

.ripe-configurator > .configurator-wrapper .configurator.loading,
.ripe-configurator > .configurator-wrapper .configurator.preloading,
.ripe-configurator > .configurator-wrapper .configurator:not(.ready) {
    cursor: progress;
}

.ripe-configurator > .loader-container {
    left: calc(50%);
    position: absolute;
}
</style>

<script>
import { Ripe } from "ripe-sdk";
import "ripe-sdk/src/css/ripe.css";

/**
 * The component that contains the RIPE SDK's configurator.
 */
export const RipeConfigurator = {
    name: "ripe-configurator",
    props: {
        /**
         * The brand of the model.
         */
        brand: {
            type: String,
            required: true
        },
        /**
         * The name of the model.
         */
        model: {
            type: String,
            required: true
        },
        /**
         * The version of the build.
         */
        version: {
            type: Number,
            required: true
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
         * The size (in pixels) of the configurator.
         */
        size: {
            type: Number,
            default: null
        },
        /**
         * Instance of Ripe SDK initialized, if not defined, a new SDK instance
         * will be initialized
         */
        ripeSdk: {
            type: Object,
            default: null
        }
    },
    data: function() {
        return {
            /**
             * The frame that is currently being shown in the
             * configurator.
             */
            frameData: this.frame,
            /**
             * Flag that controls if the initial loading process for
             * the modal in the configurator is still running.
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
        size: {
            handler: function(value) {
                this.resize(value);
            }
        },
        frame: {
            handler: function(value) {
                if (this.frameData === value) return;
                this.frameData = value;
            }
        },
        frameData: {
            handler: function(value) {
                // in case the configurator is not currently ready
                // then avoids the operation (returns control flow)
                if (!this.configurator || !this.configurator.ready) return;

                this.configurator.changeFrame(value);

                // only the visible instance of this component
                // should be sending events it's considered to
                // be the main/master one
                if (this.elementDisplayed) {
                    this.$emit("update:frame", value);
                }
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
    computed: {
        elementDisplayed() {
            if (!this.configurator) {
                return false;
            }
            return getComputedStyle(this.configurator.element).display !== "none";
        },
        loaderStyle() {
            return {
                top: this.size ? `${this.size / 2}px` : "calc(50%)"
            };
        }
    },
    mounted: async function() {
        await this.setupRipeSdk();

        this.configurator = this.ripeSdkData.bindConfigurator(this.$refs.configurator, {
            view: this.frame ? this.frame.split("-")[0] : null,
            position: this.frame ? this.frame.split("-")[1] : null
        });

        this.configurator.bind("changed_frame", frame => {
            this.frameData = frame;
        });

        this.configurator.bind("loaded", () => {
            const frame = `${this.configurator.view}-${this.configurator.position}`;
            this.frameData = frame;
            this.loading = false;
        });

        this.resize(this.size);
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
        /**
         * Re-sizes the configurator according to the current
         * available container size (defined by parent).
         */
        resize(size) {
            if (!size || !this.configurator) return;
            this.configurator.resize(size);
        }
    },
    destroyed: async function() {
        if (this.configurator) await this.ripeSdkData.unbindConfigurator(this.configurator);
        this.configurator = null;
    }
};

export default RipeConfigurator;
</script>
