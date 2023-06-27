export function formValidator(obj: object, leastOne?: boolean) {
    const values = Object.values(obj);
    const trueValues = values.filter(val => {
        if (val instanceof Object) {
            return !!Object.values(val).filter(Boolean).length
        } else {
            return Boolean(val);
        }
    });
    const isValidate = leastOne ? !!trueValues.length : values.length === trueValues.length;

    return isValidate;
}