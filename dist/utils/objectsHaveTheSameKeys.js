"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectsHaveTheSameKeys = void 0;
const objectsHaveTheSameKeys = (object1, object2) => {
    let isIntact = true;
    try {
        Object.keys(object1).every(key => {
            if (object2[key] !== undefined)
                return true;
            else {
                isIntact = false;
                return false;
            }
        });
    }
    catch (e) {
        return false;
    }
    return isIntact;
};
exports.objectsHaveTheSameKeys = objectsHaveTheSameKeys;
//# sourceMappingURL=objectsHaveTheSameKeys.js.map