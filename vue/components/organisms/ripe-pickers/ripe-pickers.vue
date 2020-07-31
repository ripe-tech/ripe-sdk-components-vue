<template>
    <div class="ripe-pickers">
        <select
            class="select"
            v-bind:value="selectedPart"
            v-if="partsOptions.length > 0"
            v-on:change="event => onSelectPartChange(event.target.value)"
        >
            <option
                v-bind:value="option.value"
                v-for="option in partsOptions"
                v-bind:key="option.value"
            >
                {{ option.label }}
            </option>
            <option class="placeholder" v-bind:value="null">
                Parts
            </option>
        </select>
        <select
            class="select"
            v-bind:value="selectedMaterial"
            v-bind:disabled="!Boolean(selectedPart)"
            v-on:change="event => onSelectMaterialChange(event.target.value)"
        >
            <option
                v-bind:value="option.value"
                v-for="option in materialOptions"
                v-bind:key="option.value"
            >
                {{ option.label }}
            </option>
            <option class="placeholder" v-bind:value="null">
                Materials
            </option>
        </select>
        <select
            class="select"
            v-bind:value="selectedColor"
            v-bind:disabled="!Boolean(selectedMaterial)"
            v-on:change="event => onSelectColorChange(event.target.value)"
        >
            <option
                v-bind:value="option.value"
                v-for="option in colorOptions"
                v-bind:key="option.value"
            >
                {{ option.label }}
            </option>
            <option class="placeholder" v-bind:value="null">
                Materials
            </option>
        </select>
        <button v-bind:disabled="buttonDisabled" v-on:click="onConfirmCustomization">
            Confirm
        </button>
    </div>
</template>

<style scoped>
.ripe-pickers {
    display: block;
}
</style>

<script>
/**
 * The component that contains the RIPE SDK's image,
 * for the static render of compositions.
 */
export const RipePickers = {
    name: "ripe-pickers",
    props: {
        /**
         * An initialized RIPE instance form the RIPE SDK, if not defined,
         * a new SDK instance will be initialized.
         */
        ripe: {
            type: Object,
            required: true
        }
    },
    data: function() {
        return {
            /**
             * Part of the model currently selected in the dropdown and
             * highlighted in a possible existing configurator.
             */
            selectedPart: null,
            /**
             * Material selected for the currently selected part of the model.
             */
            selectedMaterial: null,
            /**
             * Color selected for the currently selected part and  of the model.
             */
            selectedColor: null,
            /**
             * Flag that controls if the initial loading process for
             * the price is still running.
             */
            loading: true,
            /**
             * Ripe SDK instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.ripe
        };
    },
    watch: {
        loading: {
            handler: function(value) {
                if (value) this.$emit("loading");
                else this.$emit("loaded");
            },
            immediate: true
        },
        selectedPart: {
            handler: function(value) {
                if (!value) return;

                this.selectedMaterial = null;
                this.selectedColor = null;

                if (this.materialOptions.length === 1) {
                    this.selectedMaterial = this.materialOptions[0].value;
                }

                this.$emit("update:highlighted-part", value);
            }
        },
        selectedMaterial: {
            handler: function(value) {
                if (!value) return;

                if (this.colorOptions.length === 1) {
                    this.selectedColor = this.colorOptions[0].value;
                }
            }
        }
    },
    computed: {
        choices() {
            if (this.loading) return {};
            return this.ripeData.choices;
        },
        parts() {
            if (this.loading) return {};
            return this.ripeData.options.parts;
        },
        filteredOptions() {
            if (this.loading) return {};

            const choices = {};
            for (const [part, partValue] of Object.entries(this.choices)) {
                if (!partValue.available) continue;

                const materials = {};
                for (const [material, materialValue] of Object.entries(partValue.materials)) {
                    if (!materialValue.available) continue;
                    const colors = [];

                    for (const [color, colorValue] of Object.entries(materialValue.colors)) {
                        if (!colorValue.available) continue;
                        colors.push(color);
                    }
                    if (Object.keys(colors).length === 0) continue;
                    materials[material] = colors;
                }
                if (Object.keys(materials).length === 0) continue;
                choices[part] = materials;
            }
            return choices;
        },
        partsOptions() {
            return Object.keys(this.filteredOptions).map(part => ({
                label: this.normalize(part),
                value: part
            }));
        },
        materialOptions() {
            if (!this.selectedPart) return [];

            return Object.keys(this.filteredOptions[this.selectedPart]).map(material => ({
                label: this.normalize(material),
                value: material
            }));
        },
        colorOptions() {
            if (!this.selectedMaterial) return [];

            return this.filteredOptions[this.selectedPart][this.selectedMaterial].map(color => ({
                label: this.normalize(color),
                value: color
            }));
        },
        buttonDisabled() {
            return !this.selectedPart || !this.selectedMaterial || !this.selectedColor;
        }
    },
    created: async function() {
        await this.setupRipe();

        this.ripeData.bind("pre_config", () => {
            this.loading = true;
            this.selectedPart = null;
            this.selectedMaterial = null;
            this.selectedColor = null;
            this.$forceUpdate();
        });

        this.ripeData.bind("post_config", () => {
            this.loading = false;
        });
    },
    methods: {
        /**
         * Initializes RIPE instance if one was not provided,
         * sets the global instance to it and awaits for it
         * to be ready (configured).
         */
        async setupRipe() {
            if (!global.ripe) {
                global.ripe = this.ripeData;
            }

            this.loading = true;
            await this.ripeData.isReady();
            this.loading = false;
        },
        onSelectPartChange(value) {
            this.selectedPart = value;
        },
        onSelectMaterialChange(value) {
            if (!this.materialOptions.find(material => material.value === value)) return;
            this.selectedMaterial = value;
        },
        onSelectColorChange(value) {
            if (!this.colorOptions.find(material => material.value === value)) return;
            this.selectedColor = value;
        },
        async onConfirmCustomization() {
            if (!this.selectedPart || !this.selectedMaterial || !this.selectedColor) return;

            await this.ripeData.setPart(
                this.selectedPart,
                this.selectedMaterial,
                this.selectedColor
            );

            this.$emit("update:parts", this.ripeData.options.parts);

            this.selectedPart = null;
            this.selectedMaterial = null;
            this.selectedColor = null;
        },
        normalize(value) {
            return value
                .split("_")
                .map(v => v[0].toUpperCase() + v.slice(1))
                .join(" ");
        }
    }
};

export default RipePickers;
</script>
