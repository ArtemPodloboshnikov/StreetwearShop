<template>
    <div>
        <label
        v-bind="$attrs"
        class="label"
        @drop.prevent="(e)=>previewFiles(e)"
        @dragenter.prevent
        @dragover.prevent
        >
            <input
            :id="$attrs.id"
            :multiple="multiple"
            type="file"
            accept="image/*"
            @input="handleInput"
            />
            {{placeholder}}
        </label>
        <div v-if="(data_files.length !== 0)" class="galary">
            <img
            v-for="data in data_files"
            :key="data.name"
            :src="data.src"
            :alt="data.name"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    // import { API_IMAGE_UPLOAD } from '@/constants/';
    type DataFile = {
        name: string,
        src: string
    }



    export default {
        props: {
            placeholder: {
                type: String,
                required: true
            },
            multiple: {
                type: Boolean,
                default: false
            },
            set: {
                type: Function as PropType<(payload: DataFile[]) => void>,
                required: true
            }
        },
        data: () => ({
            files: [],
            data_files: [] as DataFile[]
        }),
        methods: {
            previewFiles(event: DragEvent) {
                // @ts-ignore
                const files: FileList = event.dataTransfer.files as FileList;
                // @ts-ignore
                this.files = files;
                // @ts-ignore
                this.galaryHandler(files);

            },
            toggleClass(e: Event) {
                // @ts-ignore
                e.classList.add('.drag')
            },
            handleInput(e: Event) {
                // @ts-ignore
                const files = (e.target as HTMLInputElement).files as FileList;
                // @ts-ignore
                this.files = files;
                // @ts-ignore
                this.galaryHandler(files)
            },
            galaryHandler(files: FileList) {
                const datas: DataFile[] = [];
                // @ts-ignore
                // eslint-disable-next-line no-cond-assign
                for (let i = 0, f; f = files[i]; i++) {
                    if (!f.type.match('image.*')) {
                        continue;
                    }
                    const reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e: any) {
                            // @ts-ignore
                            datas.push({ name: theFile.name, src: e.target.result})
                        };
                    })(f);
                    reader.readAsDataURL(f);
                    // @ts-ignore
                    if (!this.multiple) break
                }
                // @ts-ignore
                this.data_files = datas;
                // @ts-ignore
                this.set(datas);
            }
            // async loadFile(event: Event) {
            //     const data = new FormData();
            //     data.append('name', 'my-picture');
            //     // @ts-ignore
            //     data.append('file', event.target.files[0]);
            //     // @ts-ignore
            //     const response = await this.$axios.$post(
            //         API_IMAGE_UPLOAD,
            //         data,
            //         {
            //             headers: {
            //                 'Accept': 'application/json',
            //                 'Content-Type' : 'multipart/form-data;',

            //             }
            //         }
            //     )

            //     console.log(response)
            // }

        },
    }
</script>

<style scoped>
    input {
        display: none;
    }

    label {
        cursor: pointer;
    }
    .drag {
        border: 4px solid var(--warn);
    }

    .label {
        width: 100%;
        border: 4px dashed var(--warn);
        height: 100px;
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .galary {
        display: flex;
        gap: 10px;
        width: 100%;
    }

    .galary img {
        object-fit: cover;
        width: 30%;
    }
</style>