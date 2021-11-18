<template>
    <div class="ripe-configurator">
        <div
            class="loader-container"
            v-bind:style="loaderStyle"
            v-if="loader && (loading || configuring)"
        >
            <slot name="loader" v-if="loading || configuring">
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
import { ripe } from "ripe-sdk";
import { logicMixin } from "../../../mixins";

import "ripe-sdk/src/css/ripe.css";

/**
 * The component that contains the RIPE SDK's configurator
 * under a self-managed environment.
 */
export const RipeConfigurator = {
    name: "ripe-configurator",
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
         * The size (in pixels) of the configurator.
         */
        size: {
            type: Number,
            default: null
        },
        /**
         * If the loader indicator should be shown whenever a configurator
         * related loading operation is being performed.
         */
        loader: {
            type: Boolean,
            default: true
        },
        /**
         * Part of the model that is currently selected (eg: side).
         */
        selectedPart: {
            type: String,
            default: null
        },
        /**
         * Part of the model that is currently highlighted (eg:side).
         * Only possible if the usage of masks is enabled.
         */
        highlightedPart: {
            type: String,
            default: null
        },
        /**
         * Configurator rotation sensitivity to the user mouse drag
         * action. The sensitivity increases with the number value.
         */
        sensitivity: {
            type: Number,
            default: null
        },
        /**
         * Usage of masks in the current model, necessary for
         * the part highlighting action.
         */
        useMasks: {
            type: Boolean,
            default: true
        },
        /**
         * The duration in milliseconds that the configurator frame
         * transition should take.
         */
        duration: {
            type: Number,
            default: null
        },
        /**
         * The configurator animation style: 'simple' (fade in),
         * 'cross' (crossfade) or 'null'.
         */
        animation: {
            type: String,
            default: null
        },
        /**
         * The format of the configurator image (eg: png, jpg, svg, etc.).
         */
        format: {
            type: String,
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
             * Part of the model that is currently selected.
             */
            selectedPartData: this.selectedPart,
            /**
             * Part of the model that is currently highlighted.
             */
            highlightedPartData: this.highlightedPart
        };
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
        },
        options() {
            return {
                duration: this.duration,
                animation: this.animation,
                useMasks: this.useMasks,
                sensitivity: this.sensitivity
            };
        }
    },
    watch: {
        frame: {
            handler: function(value) {
                if (this.frameData === value) return;
                this.frameData = value;
            }
        },
        frameData: {
            handler: async function(value, previous) {
                // in case the configurator is not currently ready
                // then avoids the operation (returns control flow)
                if (!this.configurator || !this.configurator.ready) return;

                // extracts the view part of both the previous and the
                // current frame to be used for change view comparison
                const previousView = previous ? ripe.parseFrameKey(previous)[0] : "";
                const view = ripe.parseFrameKey(value)[0];

                // runs the frame changing operation (possible animation)
                // according to the newly changed frame value
                await this.configurator.changeFrame(value, {
                    type: view === previousView ? false : this.animation,
                    revolutionDuration: view === previousView ? this.duration : null,
                    duration: this.duration
                });

                // only the visible instance of this component
                // should be sending events it's considered to
                // be the main/master one
                if (this.elementDisplayed) {
                    this.$emit("update:frame", value);
                }
            }
        },
        size: {
            handler: function(value) {
                this.resize(value);
            }
        },
        selectedPart: {
            handler: function(value) {
                if (this.selectedPartData === value) return;
                this.selectedPartData = value;
            }
        },
        selectedPartData: {
            handler: function(value) {
                this.ripeData.selectPart(value);
                this.$emit("update:selected-part", value);
            }
        },
        highlightedPart: {
            handler: function(value) {
                if (this.highlightedPartData === value) return;
                this.highlightedPartData = value;
            }
        },
        highlightedPartData: {
            handler: function(value, previousValue) {
                if (!this.configurator) return;
                this.configurator.lowlight(previousValue);
                this.configurator.highlight(value);
                this.$emit("update:highlighted-part", value);
            }
        },
        useMasks: {
            handler: function(value) {
                if (!this.configurator) return;
                if (this.useMasks) this.configurator.enableMasks();
                else this.configurator.disableMasks();
            }
        },
        options: {
            handler: async function(value) {
                await this.configurator.updateOptions(value);
            }
        }
    },
    mounted: async function() {
        await this.setupRipe();

        this.configurator = this.ripeData.bindConfigurator(this.$refs.configurator, {
            view: this.frameData ? this.frameData.split("-")[0] : null,
            position: this.frameData ? this.frameData.split("-")[1] : null,
            ...this.options
        });

        this.onPreConfigEvent = this.ripeData.bind("pre_config", () => {
            this.loading = true;
        });

        this.onSelectedPartEvent = this.ripeData.bind("selected_part", part => {
            if (this.selectedPartData === part) return;
            this.selectedPartData = part;
        });

        this.onChangedFrame = this.configurator.bind("changed_frame", frame => {
            this.frameData = frame;
        });

        this.onConfiguratorLoaded = this.configurator.bind("loaded", () => {
            const frame = `${this.configurator.view}-${this.configurator.position}`;
            this.frameData = frame;
            this.loading = false;
        });

        this.onConfiguratorNotLoaded = this.configurator.bind("not_loaded", () => {
            this.loading = false;
        });

        this.onHighlightedPart = this.configurator.bind("highlighted_part", part => {
            if (this.highlightedPartData === part) return;
            this.highlightedPartData = part;
        });

        this.resize(this.size);
    },
    methods: {
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
        if (this.configurator && this.onHighlightedPart) {
            this.configurator.unbind("highlighted_part", this.onHighlightedPart);
        }
        if (this.configurator && this.onConfiguratorNotLoaded) {
            this.configurator.unbind("not_loaded", this.onConfiguratorNotLoaded);
        }
        if (this.configurator && this.onConfiguratorLoaded) {
            this.configurator.unbind("loaded", this.onConfiguratorLoaded);
        }
        if (this.configurator && this.onChangedFrame) {
            this.configurator.unbind("changed_frame", this.onChangedFrame);
        }
        if (this.configurator) await this.ripeData.unbindConfigurator(this.configurator);
        if (this.onSelectedPartEvent && this.ripeData) {
            this.ripeData.unbind("selected_part", this.onSelectedPartEvent);
        }
        if (this.onPreConfigEvent && this.ripeData) {
            this.ripeData.unbind("pre_config", this.onPreConfigEvent);
        }
        this.configurator = null;
    }
};

export default RipeConfigurator;
</script>
