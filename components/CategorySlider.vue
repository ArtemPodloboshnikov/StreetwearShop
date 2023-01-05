<template>
    <div class="slider">
        <i
        v-if="titles.length > 5"
        :class="`${class_controller_left} prev bx bx-left-arrow`"
        @click="toggleSlideLeft"
        ></i>
        <div class="categories">
            <nuxt-link
            v-for="title, i in titles.slice(start, end)"
            :key="i"
            tag="div"
            :style="!close ? `background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${srcs.slice(start, end)[i]});`: 'border: 4px solid var(--primary);'"
            :to="tos.slice(start, end)[i]"
            :class="`${class_animation} ${close ? 'hide' : 'show'} category`"
            >
                <h2 class="title">{{title.toLocaleUpperCase()}}</h2>
            </nuxt-link>
        </div>
        <i
        v-if="titles.length > 5"
        :class="`${class_controller_right} next bx bx-right-arrow`"
        @click="toggleSlideRight"
        ></i>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';

    const toggleDelay = 500;

    export default {
       props: {
            srcs: {
                type: Array as PropType<string[]>,
                required: true
            },
            titles: {
                type: Array as PropType<string[]>,
                required: true
            },
            tos: {
                type: Array as PropType<string[]>,
                required: true
            },
            close: {
                type: Boolean,
                default: false
            }
       },
       data: () => ({
            start: 0,
            end: 5,
            class_controller_left: 'controller_stop',
            class_controller_right: 'controller_next',
            class_animation: ''
       }),
       methods: {
            toggleSlideRight() {
                // @ts-ignore
                const step = this.titles.length % 5 === 0 ? 5 : 1;
                // @ts-ignore
                if (this.titles.length+1 > this.end &&
                    // @ts-ignore
                this.titles[this.end] !== undefined) {
                    // @ts-ignore
                    this.class_animation = 'shadow';
                    setTimeout(()=>{
                        // @ts-ignore
                        this.end += step;
                        // @ts-ignore
                        this.start += step;
                        // @ts-ignore
                        this.class_controller_left = 'controller_next';
                        // @ts-ignore
                        if (this.titles.length > this.end) {
                            // @ts-ignore
                            this.class_controller_right = 'controller_next';
                        } else {
                            // @ts-ignore
                            this.class_controller_right = 'controller_stop';
                        }
                        // @ts-ignore
                        this.class_animation = '';
                    }, toggleDelay)
                } else {
                    // @ts-ignore
                    this.class_controller_right = 'controller_stop';
                }
            },
            toggleSlideLeft() {
                // @ts-ignore
                const step = this.titles.length % 5 === 0 ? 5 : 1;
                // @ts-ignore
                if (this.start !== 0) {
                    // @ts-ignore
                    this.class_animation = 'shadow';
                    setTimeout(()=>{
                        // @ts-ignore
                        this.end -= step;
                        // @ts-ignore
                        this.start -= step;
                        // @ts-ignore
                        if (this.start === 0) {
                            // @ts-ignore
                            this.class_controller_left = 'controller_stop';
                        }
                        // @ts-ignore
                        if (this.titles.length+1 > this.end) {
                            // @ts-ignore
                            this.class_controller_right = 'controller_next'
                        }
                         // @ts-ignore
                         this.class_animation = '';
                    }, toggleDelay)
                }
            }
       }
    }
</script>

<style scoped>
    .slider,
    .categories {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        width: 100%;
        justify-items: center;
        align-items: center;
        color: var(--primary);
        grid-template-columns: 1fr auto 1fr;
        grid-template-areas: 'prev categories next';
    }

    .categories {
        grid-template-columns: repeat(10, minmax(auto, 128px));
        grid-area: categories
    }

    .category {
        position: relative;
        width: 100%;
        height: 123px;
        cursor: pointer;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-column: span 2;
        transition: 500ms linear;
    }

    .category > h2 {
        margin: 0;
    }
    .shadow {
        box-shadow: inset 400px 0 0 0 rgba(255, 255, 255, 1);
        animation: shadow 500ms linear;
        position: relative;
        left: 0;
        top: 0;
    }

    .hide {
        height: 50px;
    }

    @keyframes shadow {
        0% {
            box-shadow: inset 0px 0 0 0 rgba(255, 255, 255, 0.1);
        }
        50% {
            box-shadow: inset 200px 0 0 0 rgba(255, 255, 255, 0.4);
        }
        100% {
            box-shadow: inset 400px 0 0 0 rgba(255, 255, 255, 1);
        }
    }

    .title {
        color: var(--primary);
    }

    .bx {
        cursor: pointer;
        font-size: 40px;
    }

    .controller_next {
        color: var(--primary);
    }

    .controller_stop {
        color: var(--danger);
    }

    .prev {
        grid-area: prev
    }

    .next {
        grid-area: next;
    }
</style>