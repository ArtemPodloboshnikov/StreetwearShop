export type DataFile = {
    name: string,
    src: string
}

export async function readFileAsDataURL(file: File) {
    const result: DataFile = await new Promise((resolve) => {
        const fileReader = new FileReader();
        // @ts-ignore
        fileReader.onload = (e) => resolve({ name: file.name, src: e.target.result});
        fileReader.readAsDataURL(file);
    });

    return result;
}