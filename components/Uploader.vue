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
            <p>{{placeholder}}</p>
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
    import { DataFile, readFileAsDataURL } from '~/helpers/readFileAsDataURL';

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
                default: undefined
            },
            setFileList: {
                type: Function as PropType<(payload: FileList[]) => void>,
                required: true
            },
            limit: {
                type: Number,
                default: 5
            }
        },
        data: () => ({
            data_files: [] as DataFile[]
        }),
        methods: {
            previewFiles(event: DragEvent) {
                // @ts-ignore
                const files: FileList = event.dataTransfer.files as FileList;
                // @ts-ignore
                this.galaryHandler(files);

            },
            toggleClass(e: Event) {
                // @ts-ignore
                e.classList.add('drag')
            },
            handleInput(e: Event) {
                // @ts-ignore
                const files = (e.target as HTMLInputElement).files as FileList;
                // @ts-ignore
                this.galaryHandler(files)
            },
            async galaryHandler(files: FileList) {
                const datas: DataFile[] = [];
                // @ts-ignore
                // eslint-disable-next-line no-cond-assign
                for (let i = 0, file; file = files[i]; i++) {
                    if (!file.type.match('image.*')) {
                        continue;
                    }
                    // @ts-ignore
                    datas.push(await readFileAsDataURL(file))
                    // @ts-ignore
                    if (!this.multiple || (i === this.limit - 1)) break
                }
                // @ts-ignore
                this.data_files = datas;
                // @ts-ignore
                if (this.set) {
                    // @ts-ignore
                    this.set(datas);
                }
                // @ts-ignore
                this.setFileList(Array.from(files).slice(0, this.limit))
            }
        },
    }
</script>

<style scoped>
    input {
        display: none;
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
        cursor: pointer;
    }

    .label p {
        text-align: center;
    }

    .galary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        gap: 10px;
        width: 100%;
    }

    .galary img {
        object-fit: cover;
        width: 100%;
    }
</style>