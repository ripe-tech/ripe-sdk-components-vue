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
                    parts: this.parts,
                    currency: this.currency?.toUpperCase()
                });

                this.partsData = Object.assign({}, this.ripeData.parts);
            } catch (error) {
                this.loading = false;
                throw error;
            }
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
                // retrieves the group information for the current
                // name in iteration for both the base and the
                // reference set values (to be compared)
                const groupB = base[name];
                const groupR = reference[name];

                // if for a certain base group the corresponding
                // group does not exist in the reference then the
                // reference is considered to be invalid
                if (!groupR) {
                    return false;
                }

                // in case either the initials or the engraving is
                // not matching then the subset is invalid
                if (groupB.material !== groupR.material || groupB.color !== groupR.color) {
                    return false;
                }
            }

            return true;
        }
    }
};
