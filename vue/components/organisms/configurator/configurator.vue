<template>
    <div class="configurator-container">
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
.configurator-container {
    position: relative;
}

.configurator-wrapper {
    position: relative;
    text-align: center;
    transition: opacity 0.125s ease-in;
}

.configurator-wrapper.loading {
    opacity: 0;
}

.configurator-wrapper .configurator {
    cursor: grab;
}

.configurator-wrapper .configurator[data-frames="1"] {
    cursor: default;
}

.configurator-wrapper .configurator.drag {
    cursor: grabbing;
}

.configurator-wrapper .configurator.drag[data-frames="1"] {
    cursor: default;
}

.configurator-wrapper .configurator.highlight {
    cursor: pointer;
}

.configurator-wrapper .configurator.loading,
.configurator-wrapper .configurator.preloading,
.configurator-wrapper .configurator:not(.ready) {
    cursor: progress;
}

.loader-container {
    left: calc(50%);
    position: absolute;
}
</style>

<script>
import { Ripe } from "ripe-sdk";
import "ripe-sdk/src/css/ripe.css";

/**
 * The component that contains the RIPE SDK's configurator
 */
export const Configurator = {
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
         * Instance of Ripe SDK initialized, if not defined, the global
         * Ripe SDK instance will be used.
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
            loading: true
        };
    },
    watch: {
        size(size) {
            this.resize(size);
        },
        frame(frame) {
            if (frame === this.frameData) return;
            this.frameData = frame;
        },
        frameData(frame) {
            // in case the configurator is not currently ready
            // then avoids the operation (returns control flow)
            if (!this.configurator || !this.configurator.ready) return;
            this.configurator.changeFrame(frame, {
                type: null,
                duration: null
            });
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
        this.$emit("loading");
        await this.setupRipeSdk();

        this.configurator = global.ripeSdk.bindConfigurator(this.$refs.configurator, {
            view: this.getView(),
            position: this.getPosition()
        });

        this.configurator.bind("changed_frame", frame => {
            this.frameData = frame;

            // only the visible instance of this component
            // should be sending events it's considered to
            // be the main/master one
            if (this.elementDisplayed) {
                this.$emit("update:frame", frame);
            }
        });

        this.configurator.bind("loaded", () => {
            const frame = `${this.configurator.view}-${this.configurator.position}`;
            this.frameData = frame;
            this.loading = false;
            this.$emit("update:frame", frame);
            this.$emit("loaded");
        });

        this.resize(this.size);
    },
    methods: {
        /**
         * Initializes Ripe SDK if it does not exists and
         * configurates it with the given brand, model,
         * version and parts.
         */
        async setupRipeSdk() {
            global.ripeSdk = this.ripeSdk;

            if (!global.ripeSdk) {
                global.ripeSdk = new Ripe();
            }

            try {
                await global.ripeSdk.config(this.brand, this.model, {
                    version: this.version,
                    parts: this.parts
                });
            } catch (error) {
                this.loading = false;
                this.$emit("error", error);
            }
        },
        /**
         * Re-sizes the configurator according to the current
         * available container size (defined by parent).
         */
        resize(size) {
            if (!size || !this.configurator) return;
            this.configurator.resize(size);
        },
        getView() {
            return this.frame ? this.frame.split("-")[0] : null;
        },
        getPosition() {
            return this.frame ? this.frame.split("-")[1] : null;
        }
    },
    destroyed: async function() {
        if (this.configurator) await global.ripeSdk.unbindConfigurator(this.configurator);
        this.configurator = null;
    }
};

export default Configurator;
</script>
