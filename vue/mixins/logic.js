import { Ripe } from "ripe-sdk";

export const logicMixin = {
    props: {
        /**
         * An initialized RIPE instance form the RIPE SDK, if not defined,
         * a new SDK instance will be initialized.
         */
        ripe: {
            type: Object,
            default: null
        },
        /**
         * The brand of the model.
         */
        brand: {
            type: String,
            default: null
        },
        /**
         * The name of the model.
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
         * The currency being used for the price of the model.
         */
        currency: {
            type: String,
            default: null
        },
        /**
         * Indicates that the component should apply the config internally
         * on component initialization.
         */
        config: {
            type: Boolean,
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
         * The initials value to be used in the Ripe instance.
         */
        initials: {
            type: String,
            default: null
        },
        /**
         * The engraving value to be used in the Ripe instance.
         */
        engraving: {
            type: String,
            default: null
        },
        /**
         * The set of (initials, engraving) per initials group
         * to be used in the Ripe instance.
         */
        initialsExtra: {
            type: Object,
            default: null
        },
        /**
         * The normalized structure that uniquely represents
         * the configuration "situation".
         */
        structure: {
            type: Object,
            default: null
        }
    },
    data: function() {
        return {
            /**
             * RIPE SDK instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.ripe,
            /**
             * Brand to be used for the internal sync operation.
             */
            brandData: this.brand,
            /**
             * Model to be used for the internal sync operation.
             */
            modelData: this.model,
            /**
             * 3DB version to be used for the internal sync operation.
             */
            versionData: this.version,
            /**
             * Currency to be used for the internal sync operation.
             */
            currencyData: this.currency,
            /**
             * Reflects whether this component should apply
             * configuration changes to the associated RIPE SDK.
             */
            configData: this.config,
            /**
             * Parts of the model to be used for the internal sync
             * operation.
             */
            partsData: this.parts,
            /**
             * Initials to be used for the internal sync operation.
             */
            initialsData: this.initials,
            /**
             * Engraving to be used for the internal sync operation.
             */
            engravingData: this.engraving,
            /**
             * Initials extra to be used for the internal sync operation.
             */
            initialsExtraData: this.initialsExtra,
            /**
             * Structure to be used for the internal sync operation.
             */
            structureData: this.structure,
            /**
             * Flag that controls if the initial loading process for
             * the price is still running.
             */
            loading: false,
            configuring: false
        };
    },
    computed: {
        configOptions() {
            return `${this.brand},${this.model},${this.version},${this.currency}`;
        }
    },
    watch: {
        configOptions: {
            handler: async function() {
                await this.configRipe({
                    brand: this.brand,
                    model: this.model,
                    version: this.version,
                    currency: this.currency,
                    parts: this.parts,
                    initials: this.initials,
                    engraving: this.engraving,
                    initialsExtra: this.initialsExtra
                });
            }
        },
        brandData: {
            handler: function(value) {
                this.$emit("update:brand", value);
            }
        },
        modelData: {
            handler: function(value) {
                this.$emit("update:model", value);
            }
        },
        versionData: {
            handler: function(value) {
                this.$emit("update:version", value);
            }
        },
        currencyData: {
            handler: function(value) {
                this.$emit("update:currency", value);
            }
        },
        parts: {
            handler: async function(value, previous) {
                if (!this.ripeData || !this.configData || this.configuring) return;
                if (this.equalParts(value, previous)) return;
                await this.ripeData.setParts(value);
            }
        },
        partsData: {
            handler: function(value) {
                this.$emit("update:parts", value);
            }
        },
        initials: {
            handler: async function(value, previous) {
                if (!this.ripeData || !this.configData) return;
                if (value === previous) return;
                await this.ripeData.setInitials(value, this.engravingData);
            }
        },
        initialsData: {
            handler: function(value) {
                this.$emit("update:initials", value);
            }
        },
        engraving: {
            handler: async function(value, previous) {
                if (!this.ripeData || !this.configData) return;
                if (value === previous) return;
                await this.ripeData.setInitials(this.initialsData, value);
            }
        },
        engravingData: {
            handler: function(value) {
                this.$emit("update:engraving", value);
            }
        },
        initialsExtra: {
            handler: async function(value, previous) {
                if (!this.ripeData || !this.configData) return;
                if (this.equalInitialsExtra(value, previous)) return;
                await this.ripeData.setInitialsExtra(value);
            }
        },
        initialsExtraData: {
            handler: function(value) {
                this.$emit("update:initials-extra", value);
            }
        },
        structure: {
            handler: async function(value, previous) {
                if (!this.ripeData || !this.configData) return;
                const equal =
                    value.brand === previous.brand &&
                    value.model === previous.model &&
                    value.version === previous.version &&
                    this.equalParts(value.parts, previous.parts) &&
                    value.currency !== previous.currency &&
                    value.initials !== previous.initials &&
                    value.engraving !== previous.engraving &&
                    this.equalInitialsExtra(value.initialsExtra, previous.initialsExtra);
                if (equal) return;
                await this.configRipe({ structure: value });
            },
            deep: true
        },
        structureData: {
            handler: function(value) {
                this.$emit("update:structure", value);
            }
        },
        loading: {
            handler: function(value) {
                if (value) this.$emit("loading");
                else this.$emit("loaded");
            },
            immediate: true
        }
    },
    destroyed: function() {
        if (this.onPreConfig && this.ripeData) this.ripeData.unbind("pre_config", this.onPreConfig);
        if (this.onPostConfig && this.ripeData) {
            this.ripeData.unbind("post_config", this.onPostConfig);
        }
        if (this.onInitialsExtra && this.ripeData) {
            this.ripeData.unbind("initials_extra", this.onInitialsExtra);
        }
        if (this.onInitials && this.ripeData) this.ripeData.unbind("initials", this.onInitials);
        if (this.onParts && this.ripeData) this.ripeData.unbind("parts", this.onParts);
    },
    methods: {
        /**
         * Initializes RIPE instance if it does not exists and
         * configures it with the given brand, model, version
         * and parts. If a RIPE instance is provided, it will
         * be used without further configuration.
         */
        async setupRipe() {
            // in case the config is not explicitly defined "computes" the
            // best possible decision on if the instance should be configured
            const isNewInstance = Boolean(!this.ripeData && !global.ripe);
            this.configData = this.config === null ? isNewInstance : this.config;

            // in case there's no internal RIPE instance already
            // available then created a new one with default config
            if (!this.ripeData) {
                this.ripeData = global.ripe || new Ripe();
            }

            this.onPreConfig = this.ripeData.bind("pre_config", (brand, model, options) => {
                this._copyRipeData();
            });

            this.onPostConfig = this.ripeData.bind("post_config", (loadedConfig, options) => {
                this._copyRipeData();
            });

            this.onParts = this.ripeData.bind("parts", parts => {
                if (this.equalParts(parts, this.partsData)) return;
                if (this.structureData) {
                    this.structureData = this.ripeData.getStructure();
                } else {
                    this.partsData = JSON.parse(JSON.stringify(this.ripeData.parts));
                }
            });

            this.onInitials = this.ripeData.bind("initials", (initials, engraving) => {
                if (initials === this.initialsData && engraving === this.engravingData) return;
                if (this.structureData) {
                    this.structureData = this.ripeData.getStructure();
                } else {
                    this.initialsData = this.ripeData.initials;
                    this.engravingData = this.ripeData.engraving;
                }
            });

            this.onInitialsExtra = this.ripeData.bind("initials_extra", initialsExtra => {
                if (this.equalInitialsExtra(initialsExtra, this.initialsExtraData)) return;
                if (this.structureData) {
                    this.structureData = this.ripeData.getStructure();
                } else {
                    this.initialsExtraData = JSON.parse(
                        JSON.stringify(this.ripeData.initialsExtra)
                    );
                }
            });

            // in case the global RIPE instance is not set then
            // updates it with the current one
            if (!global.ripe) {
                global.ripe = this.ripeData;
            }

            if (this.configData) {
                // runs the initial configuration of the RIPE
                // instance properly setting its default
                await this.configRipe({
                    brand: this.brand,
                    model: this.model,
                    version: this.version,
                    currency: this.currency,
                    parts: this.parts,
                    initials: this.initials,
                    engraving: this.engraving,
                    initialsExtra: this.initialsExtra,
                    structure: this.structure
                });
            } else {
                await this.ripeData.isReady();
                this._copyRipeData();
            }
        },
        /**
         * Configures the RIPE instance with the current brand,
         * model, version and parts defined in instance.
         */
        async configRipe({
            brand = null,
            model = null,
            version = null,
            parts = null,
            currency = null,
            initials = null,
            engraving = null,
            initialsExtra = null,
            structure = null
        } = {}) {
            this.configuring = true;

            try {
                if (structure) {
                    await this.ripeData.setStructure(structure);
                } else {
                    await this.ripeData.config(brand, model, {
                        version: version,
                        parts: parts,
                        currency: currency?.toUpperCase()
                    });
                    if (initials) {
                        await this.ripeData.setInitials(initials, engraving);
                    }
                    if (initialsExtra) {
                        await this.ripeData.setInitialsExtra(initialsExtra);
                    }
                }
            } finally {
                this.configuring = false;
            }
        },
        equalParts(first, second) {
            if (!first && !second) return true;

            if (Boolean(first) !== Boolean(second)) {
                return false;
            }

            if (!this._subsetCompareParts(first, second)) {
                return false;
            }

            if (!this._subsetCompareParts(second, first)) {
                return false;
            }

            return true;
        },
        /**
         * Checks if two 'initialsExtra' are equal, by using a deep
         * comparison analysis. Equality is defined as, they produce
         * the same result after sanitization.
         *
         * @param {Object} first The first of the 'initialsExtra' being compared.
         * @param {Object} second The second of the 'initialsExtra' being compared.
         * @return {Boolean} Returns the result of the deep comparison.
         */
        equalInitialsExtra(first, second) {
            if (Boolean(first) !== Boolean(second)) {
                return false;
            }

            if (!this._subsetCompareInitials(first, second)) {
                return false;
            }

            if (!this._subsetCompareInitials(second, first)) {
                return false;
            }

            return true;
        },
        _subsetCompareParts(base, reference) {
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
        },
        _subsetCompareInitials(base, reference) {
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
                if (groupB.initials !== groupR.initials || groupB.engraving !== groupR.engraving) {
                    return false;
                }
            }

            return true;
        },
        _copyRipeData() {
            if (this.structureData) {
                this.structureData = this.ripeData.getStructure();
            } else {
                this.brandData = this.ripeData.brand;
                this.modelData = this.ripeData.model;
                this.versionData = this.ripeData.version;
                this.currencyData = this.ripeData.currency;
                this.partsData = JSON.parse(JSON.stringify(this.ripeData.parts));
                this.initialsData = this.ripeData.initials;
                this.engravingData = this.ripeData.engraving;
                this.initialsExtraData = JSON.parse(JSON.stringify(this.ripeData.initialsExtra));
            }
        }
    }
};
