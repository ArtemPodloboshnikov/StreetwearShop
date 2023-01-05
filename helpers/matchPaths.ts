export function matchPaths(currentPath: string, accessPaths: string[]): boolean {
    if (accessPaths.includes(currentPath)) {
        return true;
    }

    return false;
}