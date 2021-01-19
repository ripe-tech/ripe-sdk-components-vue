<template>
    <div
        class="ripe-image-zoom-hover"
        v-on:mouseenter="onMouseEnter"
        v-on:mousemove="onMouseMove"
        v-on:mouseleave="onMouseLeave"
        v-on:wheel.prevent="onMouseWheel"
    >
        <ripe-image-zoom v-bind="$attrs" v-bind:zoom="zoomApplied" v-bind:pivot="pivot" />
    </div>
</template>

<style scoped>
.ripe-image-zoom-hover {
    cursor: zoom-in;
    display: inline-block;
}
</style>

<script>
/**
 * The component that contains the RIPE SDK's image,
 * for the static render of compositions.
 */
export const RipeImageZoomHover = {
    name: "ripe-image-zoom-hover",
    props: {
        /**
         * Zoom percentage that controls the level of zoom over the original image.
         */
        zoom: {
            type: Number,
            default: 140
        },
        /**
         * The maximum zoom percentage allowed over the original image.
         */
        maxZoom: {
            type: Number,
            default: 300
        },
        /**
         * The minimum zoom percentage allowed over the original image.
         */
        minZoom: {
            type: Number,
            default: 10
        },
        /**
         * Enable changing the zoom value with the mouse wheel scroll.
         */
        scrollZoom: {
            type: Boolean,
            default: false
        },
        /**
         * Scroll sensitivity when controlling the zoom value with the mouse
         * wheel scroll.
         */
        scrollSensitivity: {
            type: Number,
            default: 1
        },
        /**
         * Enables zooming out of the image with the mouse scroll.
         */
        zoomOut: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            hover: false,
            pivot: null,
            zoomData: this.zoom
        };
    },
    computed: {
        zoomApplied() {
            return this.hover ? this.zoomData : 100;
        }
    },
    methods: {
        startHover(event, target) {
            this.hover = true;
            this.zoomData = this.zoom;
            this.pivot = this._getPivotCoordinates(event, target);
        },
        moveHover(event, target) {
            if (!this.hover || this.zoomData === 100) return;
            this.pivot = this._getPivotCoordinates(event, target);
        },
        endHover() {
            this.hover = false;
            this.pivot = null;
            this.zoomData = this.zoom;
        },
        zoomScroll(event) {
            // checks if zooming on hover is enabled or if the mouse is
            // hovering the image
            if (!this.hover || !this.scrollZoom) return;

            // computes the new zoom value using the delta in Y of the mouse
            // and the currently defined scroll sensitivity
            const zoomValue = this.zoomData + -1 * this.scrollSensitivity * event.deltaY;

            // checks if the zooming out feature is disabled, if so only
            // allow zooming out until the base scaling of the image (100%)
            if (!this.zoomOut && zoomValue <= 100) {
                this.zoomData = 100;
                return;
            }

            // does not allow reducing to a zoom value smaller than 10 which
            // is the zoom value that allows the image to still be seen
            this.zoomData = Math.min(Math.max(this.minZoom, zoomValue), this.maxZoom);
        },
        onMouseEnter(event) {
            this.startHover(event, event.target);
        },
        onMouseMove(event) {
            this.moveHover(event, event.target);
        },
        onMouseLeave() {
            this.endHover();
        },
        onMouseWheel(event) {
            this.zoomScroll(event);
        },
        _getPivotCoordinates(event, target) {
            const x = event.pageX - target.offsetLeft;
            const y = event.pageY - target.offsetTop;
            return { x: x, y: y };
        }
    }
};

export default RipeImageZoomHover;
</script>
