<template>
    <div class="loader" v-bind:class="loader">
        <div v-bind:style="loaderStyle" v-for="index in count" v-bind:key="index" />
    </div>
</template>

<style scoped></style>

<script>
import "loaders.css";

export const Loader = {
    name: "loader",
    props: {
        loader: {
            type: String,
            default: "ball-pulse"
        },
        count: {
            type: Number,
            default: 3
        },
        loaderStyle: {
            type: Object,
            default: () => ({
                "background-color": "#5d5d5d"
            })
        }
    }
};

export default Loader;
</script>
