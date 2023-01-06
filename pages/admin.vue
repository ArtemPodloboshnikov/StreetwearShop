<template>
    <div class="content">
        <Tabs :titles="tabs" class="tabs">
            <template #first>
                <div class="content">
                    <div class="inputs">
                        <Inputs :set="setState('model')" :placeholder="placeholders.model" />
                        <Inputs :set="setState('brand')" :placeholder="placeholders.brand" />
                        <Inputs type="number" :set="setState('price')" :placeholder="placeholders.price" />
                        <Uploader :id="ids.card_photo" :set="setState('card')" :placeholder="placeholders.preview" />
                        <button @click="isFill">Узнать текст</button>
                    </div>
                    <div v-if="preview" class="preview">
                        <Card :brand="brand" :model="model" :price="price" :src="card[0].src" :alt="card[0].name" />
                    </div>
                </div>
            </template>
            <template #second>
                <div class="content">
                    <div class="inputs">
                        <Textareas :placeholder="placeholders.description" :set="()=>setState('description')" />
                        <Inputs :set="setState('material')" :placeholder="placeholders.material" icon="bookmark-alt" />
                        <Inputs :set="setState('country')" :placeholder="placeholders.country" icon="flag" />
                        <Uploader :id="ids.product_photos" :set="setState('card')" :placeholder="placeholders.photos" />
                    </div>
                    <Sizes class="sizes" :sizes="sizes" />
                    <div class="selects">
                        <Genders section="admin" />
                        <Selects :placeholder="placeholders.category" :set="setState('category')" :options="Object.keys(categories[gender])" />
                        <Selects :placeholder="placeholders.subcategory" :set="setState('subcategory')" :options="categories[gender][category] || []" />
                    </div>
                </div>
            </template>
            <template #third>
                <div class="content">
                    3...
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script lang="ts">
    import Inputs from '@/components/Input.vue';
    import Card from '@/components/Card.vue';
    import Tabs from '@/components/Tabs.vue';
    import Uploader from '@/components/Uploader.vue';
    import Textareas from '~/components/Textarea.vue';
    import Sizes from '~/components/Sizes.vue';
    import Selects from '~/components/Select.vue';
    import Genders from '~/components/Gender.vue';
    import {
        MODEL_PLACEHOLDER,
        BRAND_PLACEHOLDER,
        PRICE_PLACEHOLDER,
        PREVIEW_PLACEHOLDER,
        CARD_PHOTO_ID,
        PRODUCT_PHOTOS_ID,
        DESCRIPTION_PLACEHOLDER,
        COUNTRY_PLACEHOLDER,
        MATERIAL_PLACEHOLDER,
        PHOTOS_PLACEHOLDER,
        SIZES,
        CATEGORY_PLACEHOLDER,
        CATEGORIES,
        SUBCATEGORY_PLACEHOLDER,
        Gender
     } from '@/constants/';

    export default {
        components: {
            Inputs,
            Card,
            Tabs,
            Uploader,
            Textareas,
            Sizes,
            Selects,
            Genders
        },
        layout: 'sidebar-only',
        data: () => ({
            placeholders: {
                model: MODEL_PLACEHOLDER,
                brand: BRAND_PLACEHOLDER,
                price: PRICE_PLACEHOLDER,
                preview: PREVIEW_PLACEHOLDER,
                description: DESCRIPTION_PLACEHOLDER,
                country: COUNTRY_PLACEHOLDER,
                material: MATERIAL_PLACEHOLDER,
                photos: PHOTOS_PLACEHOLDER,
                category: CATEGORY_PLACEHOLDER,
                subcategory: SUBCATEGORY_PLACEHOLDER
            },
            ids: {
                card_photo: CARD_PHOTO_ID,
                product_photos: PRODUCT_PHOTOS_ID
            },
            preview: false,
            tabs: ['Карточка', 'Страница', 'Категории'],
            sizes: SIZES,
            categories: CATEGORIES
        }),
        computed: {
            brand(): string {
                // @ts-ignore
                return this.$store.state.admin.brand;
            },
            model(): string {
                // @ts-ignore
                return this.$store.state.admin.model;
            },
            price(): number {
                // @ts-ignore
                return Number(this.$store.state.admin.price);
            },
            card(): [{name: string, src: string}] {
                // @ts-ignore
                return this.$store.state.admin.card;
            },
            description(): string {
                // @ts-ignore
                return this.$store.state.admin.description;
            },
            category(): string {
                // @ts-ignore
                return this.$store.state.admin.category;
            },
            gender(): Gender {
                // @ts-ignore
                return Number(this.$store.state.admin.gender);
            },
        },
        methods: {
            isFill() {
                // @ts-ignore
                const model = this.$store.state.admin.model;
                // @ts-ignore
                const brand = this.$store.state.admin.brand;
                // @ts-ignore
                const price = this.$store.state.admin.price;
                 // @ts-ignore
                const card = this.$store.state.admin.card;

                 console.log(model, brand, price, card);
                if (model && brand && price && card.length) {
                    // @ts-ignore
                    this.preview = true;
                } else {
                    // @ts-ignore
                    this.preview = false;
                }
            },
            setState(stateName: string) {
                const getValue = (e: any) => { return (e?.target?.value ? e?.target?.value : (Array.isArray(e) ? e : ''))}
                // @ts-ignore
                return (e: any) => this.$store.commit('admin/set', { name: stateName, value: getValue(e)})
            },
        }
    }
</script>

<style scoped>
    .inputs,
    .selects {
        display: flex;
        flex-direction: column;
        gap: 10px;
        grid-column: 2 / 4;
        margin-top: 30%;
    }

    .preview {
        grid-column: 5 / 7;
        margin-top: 30%;
        height: 500px;
    }

    .tabs {
        margin-top: 5%;
        grid-column: 2 / 12;
    }

    .description {
        grid-column: 2 / 4;
    }

    .sizes {
        grid-column: 5 / 9;
        margin-top: 14%;
    }

    .selects {
        grid-column: 10 / 12;
    }
</style>