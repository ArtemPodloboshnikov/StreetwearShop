<template>
    <div class="content">
        <Tabs :titles="tabs" class="tabs">
            <template #first>
                <div class="content">
                    <div class="inputs_card">
                        <Inputs :set="setState('model')" :placeholder="placeholders.model" icon="package" :required="true" />
                        <!-- <Inputs :set="setState('brand')" :placeholder="placeholders.brand" /> -->
                        <Selects :placeholder="placeholders.brand" :set="setState('brand')" :options="brands" icon="badge-check"/>
                        <Inputs type="number" :set="setState('price')" :placeholder="placeholders.price" icon="ruble" :required="true" />
                        <Uploader :id="ids.card_photo" :set="setState('card')" :placeholder="placeholders.preview" />
                        <button @click="()=> {preview = isFillCard()}">{{ buttons.show_card }}</button>
                    </div>
                    <div v-if="preview" class="preview">
                        <Card :brand="brand" :model="model" :price="price" :src="card[0].src" :alt="card[0].name" />
                    </div>
                    <button class="send" @click="isFillFields">
                        {{ buttons.send_data }}
                    </button>
                </div>
            </template>
            <template #second>
                <div class="content">
                    <div class="inputs_other">
                        <Textareas :placeholder="placeholders.description" :set="()=>setState('description')" />
                        <!-- <Inputs :set="setState('material')" :placeholder="placeholders.material" icon="bookmark-alt" /> -->
                        <Selects :placeholder="placeholders.material" :set="setState('material')" :options="materials" icon="bookmark-alt"/>
                        <Selects :placeholder="placeholders.country" :set="setState('country')" :options="countries" icon="flag"/>
                        <!-- <Inputs :set="setState('country')" :placeholder="placeholders.country" icon="flag" /> -->
                        <Uploader :id="ids.product_photos" :multiple="true" :set="setState('photos')" :placeholder="placeholders.photos" />
                    </div>
                    <Sizes section="admin" class="sizes" :sizes="SIZES" />
                    <div class="selects">
                        <Genders section="admin" />
                        <Selects :placeholder="placeholders.category" :set="setState('category')" :options="Object.keys(categories[gender])" />
                        <Selects :placeholder="placeholders.subcategory" :set="setState('subcategory')" :options="categories[gender][category] || []" />
                    </div>
                    <button class="send" @click="isFillFields">
                        {{ buttons.send_data }}
                    </button>
                </div>
            </template>
            <template #third>
                <div class="content">
                    3...
                </div>
            </template>
        </Tabs>
        <Toast :title="title_toast" :message="messages.empty_field" :show="showToast" :close="closeToast" />
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
    import Toast from '~/components/Toast.vue';
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
        Gender,
        MATERIALS,
        COUNTRIES,
        BRANDS,
        SHOW_CARD_BTN,
        SEND_DATA_BTN,
        EMPTY_FIELD_MESSAGE,
        TITLE_WRONG_EMPTY,
        API_CREATE_PRODUCT
     } from '@/constants/';
     import { getValueFromInput } from '@/helpers/getValueFromInput';

     type Product = {
        description: string,
        category: string,
        subcategory: string,
        material: string,
        country: string,
        sizes: string[],
        colors: string[],
        model: string,
        price: number,
        images: string[],
        gender: Gender
     }

    export default {
        components: {
            Inputs,
            Card,
            Tabs,
            Uploader,
            Textareas,
            Sizes,
            Selects,
            Genders,
            Toast
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
            buttons: {
                show_card: SHOW_CARD_BTN,
                send_data: SEND_DATA_BTN
            },
            messages: {
                empty_field: EMPTY_FIELD_MESSAGE
            },
            title_toast: TITLE_WRONG_EMPTY,
            preview: false,
            tabs: ['Карточка', 'Страница', 'Категории'],
            SIZES,
            categories: CATEGORIES,
            materials: MATERIALS,
            countries: COUNTRIES,
            brands: BRANDS,
            showToast: false,
            send_disabled: false
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
            card(): [{ name: string, src: string }] {
                // @ts-ignore
                return this.$store.state.admin.card;
            },
            photos(): [{ name: string, src: string }] {
                // @ts-ignore
                return this.$store.state.admin.photos;
            },
            description(): string {
                // @ts-ignore
                return this.$store.state.admin.description;
            },
            category(): string {
                // @ts-ignore
                return this.$store.state.admin.category;
            },
            subcategory(): string {
                // @ts-ignore
                return this.$store.state.admin.subcategory;
            },
            gender(): Gender {
                // @ts-ignore
                return this.$store.state.admin.gender;
            },
            country(): string {
                // @ts-ignore
                return this.$store.state.admin.country;
            },
            material(): string {
                // @ts-ignore
                return this.$store.state.admin.material;
            },
            colors(): string[] {
                // @ts-ignore
                return this.$store.state.admin.colors;
            },
            sizes(): string[] {
                // @ts-ignore
                return this.$store.state.admin.sizes;
            }
        },
        methods: {
            isFillCard() {
                // @ts-ignore
                if (this.model && this.brand && this.price && this.card.length) {
                    return true;
                } else {
                    return false;
                }
            },
            async isFillFields() {
                const product: Product = {
                    // @ts-ignore
                    description: this.description,
                    // @ts-ignore
                    category: this.category,
                    // @ts-ignore
                    subcategory: this.subcategory,
                    // @ts-ignore
                    material: this.material,
                    // @ts-ignore
                    country: this.country,
                    // @ts-ignore
                    sizes: this.sizes,
                    // @ts-ignore
                    model: this.model,
                    // @ts-ignore
                    price: this.price,
                    // @ts-ignore
                    images: [`${this.card[0].src}.avif`, ...this.photos.map(photo => `${photo.src}.avif`)],
                    // @ts-ignore
                    gender: this.gender,
                    // @ts-ignore
                    colors: this.colors
                }
                // @ts-ignore
                if (this.isFillCard() && product.description &&
                    product.category && product.subcategory &&
                    product.material && product.country && product.sizes &&
                    product.images.length > 1) {
                        // @ts-ignore
                        const response = await this.createProduct(product);
                        console.log(response);
                } else {
                    // @ts-ignore
                    this.showToast = true;
                }
            },
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('admin/set', { name: stateName, value: getValueFromInput(e)})
            },
            isFill(text: string) {
                if(text !== '') {
                    return true;
                }
                return false;
            },
            closeToast() {
                // @ts-ignore
                this.showToast = false;
            },
            async createProduct(product: Product) {
                try {
                    // @ts-ignore
                    const response: any = await this.$axios.$post(API_CREATE_PRODUCT,
                    {
                        product
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:8080',
                            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        }
                    });
                    return response;

                } catch(e: any) {
                    console.log(e.response.data.message)
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        grid-template-rows: 90% 10%;
    }

    .inputs_card,
    .inputs_other,
    .selects {
        display: flex;
        flex-direction: column;
        gap: 10px;
        grid-column: 2 / 4;
        margin-top: 30%;
    }

    .inputs_card {
        grid-column: 4 / 6;
    }

    .preview {
        grid-column: 7 / 9;
        margin-top: 30%;
        height: 500px;
    }

    .tabs {
        margin-top: 5%;
        grid-column: 2 / 12;
        height: 90vh;
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

    .send {
        grid-column: 1 / 13;
        height: 100%;
        color: var(--danger);
    }
</style>