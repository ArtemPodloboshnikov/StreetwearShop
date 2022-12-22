<template>
    <div class="content">
        <div class="categories">
            <Slider
            :srcs="categories.srcs"
            :titles="categories.titles"
            :tos="categories.tos"
            />
        </div>
        <div class="params">
            <Sizes :sizes="sizes" class="sizes" />
            <Gender />
            <ColorPicker />
        </div>
    </div>
</template>

<script lang="ts">
    import { CATEGORIES_BY_LINK, SIZES } from '@/constants/';
    import Slider from '@/components/CategorySlider.vue';
    import Sizes from '@/components/Sizes.vue';
    import Gender from '@/components/Gender.vue';
    import ColorPicker from '@/components/ColorPicker.vue';

    export default {
        components : {
            Slider,
            Sizes,
            Gender,
            ColorPicker
        },
        layout: 'empty',
        data: () => ({
            sizes: SIZES
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
            }
        }
    }
</script>

<style scoped>
    .categories {
        grid-column: 2 / 12;
        margin-top: 3%;
    }
    .params {
        grid-column: 2 / 12;
        width: 100%;
        display: flex;
        gap: 20px;
    }

    .sizes {
        width: 40%;
    }
</style>