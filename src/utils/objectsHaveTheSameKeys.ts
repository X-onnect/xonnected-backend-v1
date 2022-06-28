/**
 * @description This method compares two objects to make sure that they both have the same keys/parameters.
 * @param object1 The object that has the expected keys or parameters.
 * @param object2 The object which is being checked to make sure it has the expected keys.
 * @returns { boolean } returns true is the two objects are identical and false if they are not.
 */
export const objectsHaveTheSameKeys = (object1: Object, object2: Object): boolean => {
    let isIntact = true;

    try {
        Object.keys(object1).every(key => {
            if (object2[key]) return true
            else {
                isIntact = false;
                return false;
            }
        });
    } catch (e) {
        console.log(e);
        return false;
    }

    return isIntact;
}