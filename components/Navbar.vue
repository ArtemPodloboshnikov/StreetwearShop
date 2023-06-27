<template>
    <div :class="`navbar ${isClose ? 'hidden' : 'show'}`">
        <nav>
            <div></div>
            <div class="links">
                <nuxt-link
                v-for="clothing in clothing_types"
                :key="clothing.href"
                :to="clothing.href + categories_by_link[clothing.href].tos[0]"
                :style="(`/${route}` === clothing.href ? 'background: var(--primary); color: var(--dark)' : '')"
                class="option"
                >
                    {{clothing.text.toLocaleUpperCase()}}
                </nuxt-link>
            </div>
            <div class="close">
                <i
                class='bx bx-x-circle'
                @click="closeToggle"
                ></i>
            </div>
        </nav>
        <Slider
        :srcs="categories.srcs"
        :titles="categories.titles"
        :tos="categories.tos"
        :close="isClose"
        />
        <div :class="`unwrap ${!isClose ? 'none' : ''}`">
            <i
            class='bx bxs-chevrons-down'
            @click="closeToggle"
            ></i>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        NAVBAR_OPTIONS,
        CATEGORIES_BY_LINK
    } from '@/constants/';
    import Slider from '@/components/CategorySlider.vue';



    export default {
        components: {
            Slider
        },
        data: () => ({
            clothing_types: NAVBAR_OPTIONS,
            categories_by_link: CATEGORIES_BY_LINK,
            isClose: true
        }),
        computed: {
            categories(): {
            srcs: string[],
            titles: string[],
            tos: string[]
        } {
                // @ts-ignore
                const category = this.$route.params.category
                return {
                    srcs: CATEGORIES_BY_LINK[`/${category}`].srcs,
                    titles: CATEGORIES_BY_LINK[`/${category}`].titles,
                    // @ts-ignore
                    tos: CATEGORIES_BY_LINK[`/${category}`].tos.map(link => '/' + category + link)
                }
            },
            route(): string {
                // @ts-ignore
                return this.$route.params.category
            }
        },
        methods: {
            closeToggle() {
                // @ts-ignore
                this.isClose = !this.isClose;
            }
        }
    }
</script>

<style scoped>
    nav {
        width: 100%;
        height: 70px;
        display: grid;
        grid-template-columns: 1fr 80% 1fr;
    }

    .links {
        display: grid;
        grid-auto-flow: column;
        width: 100%;
    }

    .close {
        color: var(--warn);
        font-size: 40px;
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .close * {
        cursor: pointer;
    }

    .navbar {
        position: absolute;
        width: 90%;
        height: fit-content;
        background: var(--dark);
        display: flex;
        flex-direction: column;
        z-index: 50;
        gap: 20px;
        left: 0;
        top: 0;
        transition: 500ms linear;
    }
    .option {
        color: var(--primary);
        background: transparent;
        border: 4px solid var(--primary);
        display: grid;
        justify-items: center;
        align-items: center;
        text-decoration: none;
    }

    .unwrap {
        position: absolute;
        background: var(--dark);
        padding: 10px;
        margin-left: 94%;
        margin-top: 8%;
        font-size: 40px;
        color: var(--primary);
        cursor: pointer;
        z-index: 40;
    }

    .hidden {
        height: 140px;
        top: -90px;
    }

    .show {
        height: fit-content;
        top: 0px;
    }

    .none {
        display: none;
    }
</style>