import { Ripe } from "ripe-sdk";

export const logicMixin = {
    methods: {
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
