<template>
    <div class="content">
        <Tabs :titles="tabs" class="tabs">
            <template #first>
                <div class="content">
                    <div class="inputs">
                        <Inputs :set="setState('model')" :placeholder="placeholders.model" />
                        <Inputs :set="setState('brand')" :placeholder="placeholders.brand" />
                        <Inputs type="number" :set="setState('price')" :placeholder="placeholders.price" />
                        <Uploader :id="ids.card_id" :set="setState('card')" :placeholder="placeholders.preview" />
                        <button @click="isFill">Узнать текст</button>
                    </div>
                    <div v-if="preview" class="preview">
                        <Card :brand="brand" :model="model" :price="price" :src="card[0].src" :alt="card[0].name" />
                    </div>
                </div>
            </template>
            <template #second>
                <div class="content">
                    2...
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
    import {
        MODEL_PLACEHOLDER,
        BRAND_PLACEHOLDER,
        PRICE_PLACEHOLDER,
        PREVIEW_PLACEHOLDER,
        CARD_PHOTO_ID
     } from '@/constants/';

    export default {
        components: {
            Inputs,
            Card,
            Tabs,
            Uploader
        },
        data: () => ({
            placeholders: {
                model: MODEL_PLACEHOLDER,
                brand: BRAND_PLACEHOLDER,
                price: PRICE_PLACEHOLDER,
                preview: PREVIEW_PLACEHOLDER,
            },
            ids: {
                card_id: CARD_PHOTO_ID
            },
            preview: false,
            photoPreview: [],
            tabs: ['Карточка', 'Страница', 'Категории']
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
            }
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
                if (model && brand && price && card) {
                // @ts-ignore
                    console.log(this.photoPreview)
                    // @ts-ignore
                    this.preview = true;
                } else {
                    // @ts-ignore
                    this.preview = false;
                }
            },
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('admin/set', { name: stateName, value: e?.target?.value || e})
            },
        }
    }
</script>

<style scoped>
    .inputs {
        display: flex;
        flex-direction: column;
        grid-column: 2 / 3;
        margin-top: 30%;
    }

    .preview {
        grid-column: 5 / 6;
        margin-top: 30%;
        height: 500px;
    }

    .tabs {
        margin-top: 5%;
        grid-column: 2 / 12;
    }
</style>