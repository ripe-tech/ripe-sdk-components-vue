<template>
    <div class="ripe-pickers">
        <select
            class="select select-parts"
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
            class="select select-materials"
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
            class="select select-colors"
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
import { logicMixin } from "../../../mixins";

/**
 * The component that contains the RIPE's pickers,
 * for the static render of compositions.
 */
export const RipePickers = {
    name: "ripe-pickers",
    mixins: [logicMixin],
    data: function() {
        return {
            choices: {},
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
            selectedColor: null
        };
    },
    computed: {
        filteredOptions() {
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
                label: this._normalize(part),
                value: part
            }));
        },
        materialOptions() {
            if (!this.selectedPart) return [];

            return Object.keys(this.filteredOptions[this.selectedPart]).map(material => ({
                label: this._normalize(material),
                value: material
            }));
        },
        colorOptions() {
            if (!this.selectedMaterial) return [];

            return this.filteredOptions[this.selectedPart][this.selectedMaterial].map(color => ({
                label: this._normalize(color),
                value: color
            }));
        },
        buttonDisabled() {
            return !this.selectedPart || !this.selectedMaterial || !this.selectedColor;
        }
    },
    watch: {
        selectedPart(value) {
            if (!value) return;

            this.selectedMaterial = null;
            this.selectedColor = null;

            if (this.materialOptions.length === 1) {
                this.selectedMaterial = this.materialOptions[0].value;
            }

            this.$emit("update:highlighted-part", value);
        },
        selectedMaterial(value) {
            if (!value) return;

            if (this.colorOptions.length === 1) {
                this.selectedColor = this.colorOptions[0].value;
            }
        }
    },
    created: async function() {
        await this.setupRipe();

        this.onChoices = this.ripeData.bind("choices", choices => {
            this.choices = choices;
        });

        this.onPreConfig = this.ripeData.bind("pre_config", () => {
            // reset the current selection state
            // every time the config changes
            this.selectedPart = null;
            this.selectedMaterial = null;
            this.selectedColor = null;
        });

        this.choices = this.ripeData.choices;
    },
    destroyed: function() {
        if (this.onPreConfig) this.ripeData.unbind("pre_config", this.onPreConfig);
        if (this.onChoices) this.ripeData.unbind("choices", this.onChoices);
    },
    methods: {
        _normalize(value) {
            return value
                .split("_")
                .map(v => v[0].toUpperCase() + v.slice(1))
                .join(" ");
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

            this.selectedPart = null;
            this.selectedMaterial = null;
            this.selectedColor = null;
        }
    }
};

export default RipePickers;
</script>
