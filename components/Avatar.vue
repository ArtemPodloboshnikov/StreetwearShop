<template>
    <label
        v-bind="$attrs"
        class="label"
        :style="`background-image: url(${photo.src || ''})`"
        @drop.prevent="(e)=>previewFiles(e)"
        @dragenter.prevent
        @dragover.prevent
        >
            <input
            :id="$attrs.id"
            type="file"
            accept="image/*"
            @input="handleInput"
            />
    </label>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    import { DataFile, readFileAsDataURL } from '~/helpers/readFileAsDataURL';

    export default {
        props: {
            set: {
                type: Function as PropType<(payload: DataFile[]) => void>,
                required: true
            },
        },
        data: () => ({
            photo: {} as DataFile
        }),
        methods: {
            previewFiles(event: DragEvent) {
                // @ts-ignore
                const files: FileList = event.dataTransfer.files as FileList;
                // @ts-ignore
                this.avatarHandler(files);

            },
            addDragClass(e: HTMLElement) {
                if (!e.classList.contains('drag')) {
                    // @ts-ignore
                    e.classList.add('drag')
                }
            },
            handleInput(e: Event) {
                // @ts-ignore
                const files = (e.target as HTMLInputElement).files as FileList;
                // @ts-ignore
                this.avatarHandler(files)
            },
            async avatarHandler(files: FileList) {
                let data: DataFile = {name: '', src: ''};
                // @ts-ignore
                // eslint-disable-next-line no-cond-assign
                if (files[0].type.match('image.*')) {
                    data = await readFileAsDataURL(files[0]);
                }

                if (data.src) {
                    // @ts-ignore
                    this.photo = data;
                    // @ts-ignore
                    this.addDragClass(document.getElementById(this.$attrs.id));
                }
                // @ts-ignore
                this.set(data);
            }
        },
    }
</script>

<style scoped>
    input {
            display: none;
    }
    .drag {
        border: none !important;
    }

    .label {
        width: 100%;
        border: 4px dashed var(--warn);
        border-radius: 10%;
        height: 100px;
        display: grid;
        justify-items: center;
        align-items: center;
        cursor: pointer;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>