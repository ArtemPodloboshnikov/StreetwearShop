export function phoneCheck(text: string): boolean {
    const regexp = /^[\d\\+][\d\\(\\)\\ -]{4,14}\d$/;
    if (regexp.test(text)) {
        return true;
    }

    return false;
}