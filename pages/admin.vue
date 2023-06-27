<template>
    <div class="content">
        <Tabs :titles="tabs" class="tabs">
            <template #first>
                <div class="content">
                    <div class="inputs_card">
                        <Inputs :set="setState('model')" :placeholder="placeholders.model" icon="package" :required="true" />
                        <Selects :placeholder="placeholders.brand" :set="setState('brand')" :options="brands" icon="badge-check"/>
                        <Inputs type="number" :set="setState('price')" :placeholder="placeholders.price" icon="ruble" :required="true" />
                        <Uploader :id="ids.card_photo" :set="setState('card')" :set-file-list="setState('cards')" :placeholder="placeholders.preview" />
                        <button @click="()=> {preview = isFillCard()}">{{ buttons.show_card }}</button>
                    </div>
                    <div v-if="preview" class="preview">
                        <Card :brand="brand" :model="model" :price="price" :src="card.src" :alt="card.name" />
                    </div>
                    <div class="send">
                        <button @click="isFillFields">
                            {{ buttons.update_data }}
                        </button>
                        <div class="separate"></div>
                        <button @click="isFillFields">
                            {{ buttons.send_data }}
                        </button>
                    </div>
                </div>
            </template>
            <template #second>
                <div class="content">
                    <div class="left_content">
                        <Selects :placeholder="placeholders.material" :set="setState('material')" :options="materials" icon="bookmark-alt"/>
                        <Selects :placeholder="placeholders.country" :set="setState('country')" :options="countries" icon="flag"/>
                        <Uploader :id="ids.product_photos" :multiple="true" :set-file-list="setState('photos')" :placeholder="placeholders.photos" />
                    </div>
                    <div class="middle_content">
                        <Textareas class="textarea" :placeholder="placeholders.description" :set="setState('description')" />
                    </div>
                    <div class="selects">
                        <Genders section="admin" />
                        <Selects :placeholder="placeholders.category" :set="setState('category')" :options="Object.keys(categories[gender])" />
                        <Selects :placeholder="placeholders.subcategory" :set="setState('subcategory')" :options="categories[gender][category] || []" />
                    </div>
                </div>
            </template>
            <template #third>
                <div class="content">
                    <div class="sizes">
                        <Sizes section="admin" :sizes="SIZES" :gender-dependent="gender" />
                        <Inputs
                        v-for="size in sizes"
                        :key="size"
                        :set="setObjectState('count_sizes', size)"
                        :placeholder="`${placeholders.count_sizes} '${size}'`"
                        type="number"
                        :min="1"
                        :postfix="size"
                        />
                    </div>
                    <div class="colors">
                        <ColorPicker section="admin" single />
                    </div>
                    <div class="codes">
                        <Inputs
                        v-for="(size, i) in countSizes"
                        :key="`${size}_${i}`"
                        :set="setObjectState('codes', `${size}_${i}`)"
                        :placeholder="`${placeholders.code} '${size}'`"
                        icon="barcode"
                        :required="true"
                        />
                    </div>
                    <div class="send">
                        <button @click="isFillFields">
                            {{ buttons.update_data }}
                        </button>
                        <div class="separate"></div>
                        <button @click="isFillFields">
                            {{ buttons.send_data }}
                        </button>
                    </div>
                </div>
            </template>
        </Tabs>
        <Toast :code="toastCode" :show="isToast" :close="closeToast" :message="product_save_mes" :extend="!!product_save_mes" />
    </div>
</template>

<script lang="ts">
    import { slugify } from 'transliteration';
    import Inputs from '@/components/Input.vue';
    import Card from '@/components/Card.vue';
    import Tabs from '@/components/Tabs.vue';
    import Uploader from '@/components/Uploader.vue';
    import Textareas from '~/components/Textarea.vue';
    import Sizes from '~/components/Sizes.vue';
    import Selects from '~/components/Select.vue';
    import Genders from '~/components/Gender.vue';
    import Toast from '~/components/Toast.vue';
    import ColorPicker from '~/components/ColorPicker.vue';
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
        ADD_DATA_BTN,
        UPDATE_DATA_BTN,
        API_CREATE_PRODUCT,
        TOAST_EMPTY_FIELDS,
        PRODUCT_CODE_PLACEHOLDER,
        COUNT_SIZES_PLACEHOLDER,
        TOAST_SAVE_DATA,
        ROOT_DATA_IMAGES,
        CATEGORIES_BY_LINK,
        TOAST_UNSAVE_DATA,
        COUNT_COLORS_PLACEHOLDER
     } from '@/constants/';

    import { getValueFromInput } from '@/helpers/getValueFromInput';
    import { getApiHeaders } from '~/helpers/getApiHeaders';
    import { formValidator } from '~/helpers/formValidator';
    import { DataFile } from '~/helpers/readFileAsDataURL';
    import { uploadFiles } from '~/helpers/uploadFiles';
    import { ProductLoad } from '@/typings/';

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
            Toast,
            ColorPicker
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
                subcategory: SUBCATEGORY_PLACEHOLDER,
                code: PRODUCT_CODE_PLACEHOLDER,
                count_sizes: COUNT_SIZES_PLACEHOLDER,
                count_colors: COUNT_COLORS_PLACEHOLDER
            },
            ids: {
                card_photo: CARD_PHOTO_ID,
                product_photos: PRODUCT_PHOTOS_ID
            },
            buttons: {
                show_card: SHOW_CARD_BTN,
                send_data: ADD_DATA_BTN,
                update_data: UPDATE_DATA_BTN
            },
            preview: false,
            tabs: ['Карточка', 'Общие', 'Размеры и коды'],
            SIZES,
            categories: CATEGORIES,
            materials: MATERIALS,
            countries: COUNTRIES,
            brands: BRANDS,
            isToast: false,
            toastCode: TOAST_EMPTY_FIELDS,
            send_disabled: false,
            initialData: ['cool12'],
            product_save_mes: '',
            countSizes: [] as string[]
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
            count_sizes(): {[key: string]: number} {
                // @ts-ignore
                const countSizes = this.$store.state.admin.count_sizes;
                Object.keys(countSizes)
                // @ts-ignore
                .filter(size => !this.sizes.includes(size))
                // @ts-ignore
                .forEach(size => this.$store.commit('admin/remove', {name: 'count_sizes', value: '', keyObject: size}))
                // @ts-ignore
                return this.$store.state.admin.count_sizes;
            },
            card(): DataFile {
                // @ts-ignore
                return this.$store.state.admin.card[0];
            },
            cards(): File[] {
                // @ts-ignore
                return this.$store.state.admin.cards;
            },
            photos(): File[] {
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
            color(): string {
                // @ts-ignore
                return this.$store.state.admin.colors[0];
            },
            sizes(): string[] {
                // @ts-ignore
                return this.$store.state.admin.sizes;
            },
            codes(): {[size: string]: string[]} {
                const newCodes: {[size: string]: string[]} = {};
                // @ts-ignore
                let codes = this.$store.state.admin.codes;
                console.log( Object.keys(codes)
                // @ts-ignore
                .map(size => (!this.sizes.includes(size.split('_')[0]) || this.count_sizes[size.split('_')[0]] === 0)))
                Object.keys(codes)
                // @ts-ignore
                .filter(size => (!this.sizes.includes(size.split('_')[0]) || this.count_sizes[size.split('_')[0]] === 0))
                // .forEach(size => console.log(size))
                // @ts-ignore
                .forEach(size => this.$store.commit('admin/remove', {name: 'codes', value: '', keyObject: size}))
                // @ts-ignore
                codes = this.$store.state.admin.codes;
                Object.keys(codes)
                .forEach(size => {
                    if (newCodes[size.split('_')[0]]) {
                        newCodes[size.split('_')[0]].push(codes[size])
                    } else {
                        newCodes[size.split('_')[0]] = [codes[size]]
                    }
                });
                console.log(codes);
                return newCodes;
            },
        },
        mounted() {
            // @ts-ignore
            this.$store.subscribe(
                // @ts-ignore
                (mutations) => {
                    const getCount = () => {
                        // @ts-ignore
                        const countSizes: {[key: string]: number} = this.count_sizes;
                        const count: string[] = [];
                        Object.keys(countSizes).forEach(size => count.push(...new Array(countSizes[size]).fill(size)))
                        // @ts-ignore
                        this.countSizes = count;
                    }
                    switch(mutations.type) {
                        case 'admin/set': {
                            getCount()
                            break;
                        }
                        case 'admin/remove': {
                            getCount()
                            break;
                        }
                    }
                }
            )
        },
        methods: {
            isFillCard() {
                // @ts-ignore
                console.log(this.codes)
                // @ts-ignore
                if (this.model && this.brand && this.price && this.card) {
                    return true;
                } else {
                    return false;
                }
            },
            async isFillFields() {
                const dt = new DataTransfer();
                // @ts-ignore
                [...this.cards, ...this.photos].forEach(file => dt.items.add(file));
                // @ts-ignore
                console.log(this.count_sizes)

                const product: ProductLoad = {
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
                    sizes: this.count_sizes,
                    // @ts-ignore
                    model: this.model,
                    // @ts-ignore
                    brand: this.brand,
                    // @ts-ignore
                    price: this.price,
                    // @ts-ignore
                    images: dt.files,
                    // @ts-ignore
                    gender: this.gender,
                    // @ts-ignore
                    color: this.color,
                    // @ts-ignore
                    codes: this.codes
                }
                // @ts-ignore
                if (this.isFillCard() && formValidator(product)) {
                        // @ts-ignore
                        const response = await this.createProductLoad(product);
                        console.log(response);
                        // @ts-ignore
                        const acronym = slugify(`${response.model}-${response._id}`, { lowercase: true });
                        const category = ROOT_DATA_IMAGES.find(img => img.alt === response.category)!.to;
                        const indexSubcategoryLink = CATEGORIES_BY_LINK[category].titles.indexOf(response.subcategory.toLowerCase());
                        const subcategory = CATEGORIES_BY_LINK[category].tos[indexSubcategoryLink];
                        // @ts-ignore
                        this.product_save_mes = `Вы можете увидеть страницу товара по [ссылке](localhost:3000${category}${subcategory}/${acronym})`;

                } else {
                    // @ts-ignore
                    this.isToast = true;
                    // @ts-ignore
                    this.toastCode = TOAST_EMPTY_FIELDS;
                    // @ts-ignore
                    this.product_save_mes = '';
                }
            },
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('admin/set', { name: stateName, value: getValueFromInput(e)})
            },
            setObjectState(stateName: string, key: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('admin/set', { name: stateName, value: getValueFromInput(e), keyObject: key})
            },
            isFill(text: string) {
                if(text !== '') {
                    return true;
                }
                return false;
            },
            closeToast() {
                // @ts-ignore
                this.isToast = false;
            },
            async createProductLoad(product: ProductLoad): Promise<any> {
                try {
                    console.log(product)
                    // @ts-ignore
                    const files = await uploadFiles(this.$axios.$post, product.images, `${this.brand}_${this.model}`)
                    // @ts-ignore
                    const newProductLoad = {...product, images: files.map(file => file.url)};
                    // @ts-ignore
                    const response = await this.$axios.post(API_CREATE_PRODUCT, newProductLoad, getApiHeaders(true));
                    // @ts-ignore
                    this.isToast = true;
                    // @ts-ignore
                    this.toastCode = TOAST_SAVE_DATA;
                    return response.data;

                } catch(e: any) {
                    // @ts-ignore
                    this.isToast = true;
                    // @ts-ignore
                    this.toastCode = TOAST_UNSAVE_DATA;
                    // @ts-ignore
                    this.product_save_mes = e.response.data.message;
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
    .left_content,
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

    .middle_content {
        grid-column: 5 / 9;
        margin-top: 14%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .selects {
        grid-column: 10 / 12;
    }

    .send {
        grid-column: 1 / 13;
        display: grid;
        grid-template-columns: 1fr 4px 1fr;
        height: 100%;
        color: var(--danger);
        width: 100%;
    }

    .send > .separate {
        height: 101%;
        background: var(--dark);
    }

    .textarea {
        height: 300px;
    }

    .sizes,
    .colors,
    .codes {
        grid-column:  2 / 6;
        margin-top: 14%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .colors {
        grid-column: 6 / 10;
    }
    .codes {
        grid-column: 10 / 12;
        margin-top: 30%;
        height: 85%;
        overflow: auto;
    }
</style>