<template>
    <div class="ripe-price">
        {{ priceText }}
    </div>
</template>

<style scoped></style>

<script>
import { logicMixin, moneyMixin } from "../../../mixins";

/**
 * The component that contains the price of the provided model,
 * in accordance to its customization and personalization.
 */
export const RipePrice = {
    name: "ripe-price",
    mixins: [logicMixin, moneyMixin],
    data: function() {
        return {
            /**
             * The price of the current configuration of the model
             * and is dependent on the current currency.
             */
            price: null,
            /**
             * The error raised when fetching the price.
             */
            error: null
        };
    },
    watch: {
        error(value) {
            this.$emit("error", value);
        }
    },
    computed: {
        priceText() {
            return this.error
                ? "Error"
                : this.formatMoney(
                      this.price ? this.price.total.price_final : null,
                      this.currencyData
                  );
        }
    },
    created: async function() {
        await this.setupRipe();

        this.onPrice = this.ripeData.bind("price", price => {
            this.error = null;
            this.price = price;
        });
        this.onPriceError = this.ripeData.bind("price_error", error => {
            this.error = error;
            this.price = null;
        });
    },
    destroyed: async function() {
        if (this.onPriceError) this.ripeData.unbind("price_error", this.onPriceError);
        if (this.onPrice) this.ripeData.unbind("price", this.onPrice);
    }
};

export default RipePrice;
</script>
