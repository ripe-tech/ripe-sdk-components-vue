<template>
    <div class="ripe-image-zoom">
        <ripe-image v-bind="$attrs" v-bind:style="zoomStyle" />
    </div>
</template>

<style scoped>
.ripe-image-zoom {
    cursor: "zoom-in";
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
         * Zoom percentage that controls the level of zoom over the original image.
         */
        zoom: {
            type: Number,
            default: 100
        },
        /**
         * The x and y coordinates of the pivot point where the zoom will be applied to.
         */
        pivot: {
            type: Object,
            default: null
        }
    },
    computed: {
        zoomStyle() {
            const base = {
                "transform-origin": "0px 0px 0px",
                transform: `scale(${this.zoom / 100})`
            };
            if (this.pivot) {
                // revert the translate after scaling the image so that the scaling
                // appears centered on the pivot
                base.transform = `translate(${this.pivot.x}px, ${this.pivot.y}px) ${
                    base.transform
                } translate(${-1 * this.pivot.x}px, ${-1 * this.pivot.y}px)`;
            }
            return base;
        }
    }
};

export default RipeImageZoom;
</script>
