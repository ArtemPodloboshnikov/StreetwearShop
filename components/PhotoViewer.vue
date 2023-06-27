<template>
    <div :class="`wrap ${$attrs.class}`">
        <div class="gallary">
            <i
            :class="`bx bx-up-arrow controller ${start ? '' : 'next_none'}`"
            @click="topClick"
            >
            </i>
            <div class="photos">
                <img
                v-for="photo in photos.slice(start, end)"
                :key="photo"
                :src="`${API_STATIC_FILE}/${photo}`"
                :class="photo !== active ? 'inactive' : ''"
                @click="()=>clickHandler(photo)"
                />
            </div>
            <i
            :class="`bx bx-down-arrow controller ${photos.length === end ? 'next_none' : ''}`"
            @click="downClick"
            >
            </i>
        </div>
        <div class="current_photo">
            <img :src="`${API_STATIC_FILE}/${active}`" format="avif"/>
        </div>
    </div>
</template>
<script lang="ts">
    import { PropType } from 'vue';
    import { API_STATIC_FILE } from '@/constants/';
    export default {
        props: {
            photos: {
                type: Array as PropType<string[]>,
                required: true
            }
        },
        // @ts-ignore
        data: ({photos}) => ({
            API_STATIC_FILE,
            active: photos[0],
            start: 0,
            end: 3
        }),
        methods: {
            clickHandler(photo: string) {
                // @ts-ignore
                this.active = photo;
            },
            downClick(e: Event) {
                // @ts-ignore
                const isNoneClass: boolean = e.target.classList.contains('next_none');
                if (!isNoneClass) {
                    // @ts-ignore
                    const step = this.photos.length - this.end;
                    if (step >= 3 ) {
                        // @ts-ignore
                        this.start += 3;
                        // @ts-ignore
                        this.end += 3;
                    } else if (step > 0 && step < 3) {
                        // @ts-ignore
                        this.start += step;
                        // @ts-ignore
                        this.end += step;
                    }
                }
            },
            topClick(e: Event) {
                // @ts-ignore
                const isNoneClass: boolean = e.target.classList.contains('next_none');
                if (!isNoneClass) {
                    // @ts-ignore
                    const step = this.start - 3;
                    if (step >= 0) {
                        // @ts-ignore
                        this.start -= 3;
                        // @ts-ignore
                        this.end -= 3;
                    } else {
                        // @ts-ignore
                        this.start -= step;
                        // @ts-ignore
                        this.end -= step;
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .wrap {
        display: grid;
        grid-template-columns: 1fr 2fr;
        height: fit-content;
        gap: 20px;
    }
    .gallary {
        display: flex;
        flex-direction: column;
    }

    .controller {
        font-size: 50px;
        text-align: center;
        cursor: pointer;
    }

    .photos {
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: hidden;
    }

    .photos > img {
        width: 100%;
        cursor: pointer;
        object-fit: cover;
    }
    .current_photo {
        width: 100%;
        height: 100%;
        display: grid;
        align-items: center;
    }

    .current_photo > img {
        width: 100%;
        object-fit: cover;
    }

    .inactive {
        filter: brightness(50%);
    }

    .next_none {
        color: var(--danger);
    }
</style>