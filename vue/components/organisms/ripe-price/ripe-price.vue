<template>
    <div class="ripe-price">
        {{ priceText }}
    </div>
</template>

<style scoped></style>

<script>
import { Ripe } from "ripe-sdk";
import { moneyMixin } from "../../../mixins";
import { logicMixin, moneyMixin } from "../../../mixins";

/**
 * The component that contains the price of the provided model,
 * in accordance to its customization and personalization.
 */
export const RipePrice = {
    name: "ripe-price",
    mixins: [moneyMixin],
    mixins: [logicMixin, moneyMixin],
    props: {
        /**
         * The brand of the model for which the price
         * will be returned.
         */
        brand: {
            type: String,
            default: null
        },
        /**
         * The name of the model for which the price
         * will be returned.
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
         * The parts of the customized build as a dictionary mapping the
         * name of the part to an object of material and color.
         */
        parts: {
            type: Object,
            default: null
        },
        /**
         * The currency being used for the price of the model.
         */
        currency: {
            type: String,
            required: true
        },
        /**
         * An initialized RIPE instance form the RIPE SDK, if not defined,
         * a new SDK instance will be initialized.
         */
        ripe: {
            type: Object,
            default: null
        }
    },
    data: function() {
        return {
            /**
             * The price of the current configuration of the model
             * and is dependent on the current currency.
             */
            price: null,
            /**
             * Binding to the RIPE price changing event.
             */
            priceBind: null,
            /**
             * Flag that controls if the initial loading process for
             * the price is still running.
             */
            loading: true,
            /**
             * Parts of the model.
             */
            partsData: this.parts,
            /**
             * Ripe SDK instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.ripe
        };
    },
    watch: {
        parts: {
            handler: async function(value, previous) {
                if (this.equalParts(value, previous)) return;

                this.partsData = value;
                await this.configRipe();
            }
        },
        partsData: {
            handler: function(value) {
                this.$emit("update:parts", value);
            }
        },
        currency: {
            handler: async function(value) {
                await this.configRipe();
            }
        },
        price: {
            handler: function(value) {
                this.$emit("update:price", this.priceText);
            }
        },
        loading: {
            handler: function(value) {
                if (value) this.$emit("loading");
                else this.$emit("loaded");
            },
            immediate: true
        },
        configProps: {
            handler: async function(value) {
                await this.configRipe(true);
            }
        }
    },
    computed: {
        priceText() {
            return this.formatMoney(this.price, this.currency);
        },
        configProps() {
            return {
                brand: this.brand,
                model: this.model,
                version: this.version
            };
        }
    },
    created: async function() {
        await this.setupRipe();

        this.priceBind = this.ripeData.bind("price", this.onPriceChange);
    },
    methods: {
        /**
         * Configures the RIPE instance with the given brand,
         * model, version and parts. The reload flag at true means that
         * the configuration request comes after a first configuration,
         * meaning the brand/model/version were changed. If this happens,
         * the parts have to be resetted.
         */
        async configRipe(reload = false) {
            this.loading = true;

            try {
                await this.ripeData.config(this.brand, this.model, {
                    version: this.version,
                    parts: reload ? null : this.parts,
                    currency: this.currency.toUpperCase()
                });
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        /**
         * Initializes RIPE instance if it does not exists and
         * configures it with the given brand, model, version
         * and parts. If a RIPE instance is provided, it will
         * be used without further configuration.
         */
        async setupRipe() {
            if (!this.ripeData) {
                this.ripeData = new Ripe();
            }

            await this.configRipe();

            if (!global.ripe) {
                global.ripe = this.ripeData;
            }
        },
        onPriceChange(value) {
            this.price = value.total.price_final;
        }
    },
    destroyed: async function() {
        if (this.priceBind) this.ripeData.unbind("price", this.priceBind);
        this.priceBind = null;
    }
};

export default RipePrice;
</script>
