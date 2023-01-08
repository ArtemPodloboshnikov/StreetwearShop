<template>
    <div class="content">
        <div class="categories">
            <Slider
            :srcs="categories.srcs"
            :titles="categories.titles"
            :tos="categories.tos"
            />
        </div>
        <div class="gender">
            <div
            :class="`man ${gender === Gender.MALE ? 'active' : ''}`"
            @click="()=>setGender(Gender.MALE)"
            >
                <h1 class="gender_titles">{{title_man}}</h1>
            </div>
            <div
            :class="`woman ${gender === Gender.FEMALE ? 'active' : ''}`"
            @click="()=>setGender(Gender.FEMALE)"
            >
                <h1 class="gender_titles">{{title_woman}}</h1>
            </div>
        </div>
        <div class="params">
            <Sizes section="params" :sizes="sizes" class="sizes" />
            <ColorPicker section="params" />
        </div>
    </div>
</template>

<script lang="ts">
    // eslint-disable-next-line import/named
    import { Dictionary } from 'vue-router/types/router';
    import {
        CATEGORIES_BY_LINK,
        Gender,
        SIZES,
        MAN_TITLE,
        WOMAN_TITLE,
        SHOES_PATH,
        UNDERWEAR_PATH,
        OUTERWEAR_PATH,
        ACCESSORIES_PATH
    } from '@/constants/';
    import { matchPaths } from '@/helpers/matchPaths';
    import Slider from '@/components/CategorySlider.vue';
    import Sizes from '@/components/Sizes.vue';
    import ColorPicker from '@/components/ColorPicker.vue';

    export default {
        components : {
            Slider,
            Sizes,
            ColorPicker
        },
        layout: 'empty',
        validate({ params }: { params: Dictionary<string>}) {
            const currentPath = `/${params.category}`;
            const accessPaths = [SHOES_PATH, UNDERWEAR_PATH, OUTERWEAR_PATH, ACCESSORIES_PATH];
            return matchPaths(currentPath, accessPaths);
        },
        data: () => ({
            sizes: SIZES,
            title_man: MAN_TITLE,
            title_woman: WOMAN_TITLE,
            Gender
        }),
        computed: {
            categories(): {
            srcs: string[],
            titles: string[],
            tos: string[]
        } {
                // @ts-ignore
                const route = this.$route.params.category
                return {
                    srcs: CATEGORIES_BY_LINK[`/${route}`].srcs,
                    titles: CATEGORIES_BY_LINK[`/${route}`].titles,
                    // @ts-ignore
                    tos: CATEGORIES_BY_LINK[`/${route}`].tos.map(link => this.$route.fullPath + link)
                }
            },
            gender(): number {
                // @ts-ignore
                return this.$store.state.params.gender;
            }

        },
        methods: {
            setGender(gender: number) {
                // @ts-ignore
                this.$store.commit(`params/set`, { name: 'gender', value: gender });
            }
        }
    }
</script>

<style scoped>
    .categories {
        grid-column: 2 / 12;
        margin-top: 3%;
        height: fit-content;
    }
    .params {
        grid-column: 2 / 12;
        width: 100%;
        display: grid;
        gap: 20px;
        grid-template-columns: 40% 60%;
    }

    .gender {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column: 2 / 12;
        justify-items: center;
    }

    .man,
    .woman {
        background-size: cover;
        background-repeat: no-repeat;
        height: 400px;
        width: 50%;
        display: grid;
        cursor: pointer;
    }

    .man {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/category/man.avif');
    }

    .woman {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/category/woman.avif');
    }

    .gender_titles {
        transform: rotate(-90deg);
        justify-self: right;
        align-self: center;
        margin: 0;
        padding: 0;
        height: 45px;
    }

    .active {
        outline: 5px solid var(--danger);
    }
</style>