export function passwordCheck(text: string): boolean {
    if (text.length >= 8) {
        return true;
    }

    return false;
}