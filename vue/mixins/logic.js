import { Ripe } from "ripe-sdk";

export const logicMixin = {
    methods: {
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

            // in case the global RIPE instance is not set then
            // updates it with the current one
            if (!global.ripe) {
                global.ripe = this.ripeData;
            }
        },
        /**
         * Configures the RIPE instance with the given brand,
         * model, version and parts.
         */
        async configRipe() {
            this.loading = true;

            try {
                await this.ripeData.config(this.brand, this.model, {
                    version: this.version,
                    parts: this.partsData,
                    currency: this.currency ? this.currency.toUpperCase() : null
                });
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        /**
         * Runs a series of part changes as a transaction changing
         * the current model's configuration.
         *
         * @param {Object} parts An object that associated the name of the
         * part to be changed with an object containing both the material
         * and the color for the part.
         */
        async setPartsRipe(parts) {
            await this.setPartsRipe(parts);
        },
        equalParts(first, second) {
            if (Boolean(first) !== Boolean(second)) {
                return false;
            }

            if (!this._subsetCompare(first, second)) {
                return false;
            }

            if (!this._subsetCompare(second, first)) {
                return false;
            }

            return true;
        },
        _subsetCompare(base, reference) {
            for (const name of Object.keys(base)) {
                // retrieves the part information for the current
                // name in iteration for both the base and the
                // reference set values (to be compared)
                const partB = base[name];
                const partR = reference[name];

                // if for a certain base part the corresponding
                // part does not exist in the reference then the
                // reference is considered to be invalid
                if (!partR) {
                    return false;
                }

                // in case either the initials or the engraving is
                // not matching then the subset is invalid
                if (partB.material !== partR.material || partB.color !== partR.color) {
                    return false;
                }
            }

            return true;
        }
    }
};
