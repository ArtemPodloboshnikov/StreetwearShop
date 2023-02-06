<template>
    <div class="content">
        <PhotoViewer class="viewer" :photos="products[productIndex]?.images||[]" />
        <Comments class="comments" :comments="comments" />
        <div class="info">
            <h1 class="title">{{ products[productIndex]?.model.toUpperCase() || '' }}</h1>
            <div class="features">
                <div class="feature">
                    <h4>{{ titles.brand }}</h4>
                    <span>{{ products[productIndex]?.brand || ''}}</span>
                </div>
                <div class="feature">
                    <h4>{{ titles.material }}</h4>
                    <span>{{ products[productIndex]?.material || '' }}</span>
                </div>
                <div class="feature">
                    <h4>{{ titles.country }}</h4>
                    <span>{{ products[productIndex]?.country || '' }}</span>
                </div>
                <div class="feature">
                    <h4>{{ titles.gender }}</h4>
                    <span>{{ products[productIndex]?.gender || '' }}</span>
                </div>
                <div class="feature">
                    <h4>{{ titles.color }}</h4>
                    <span class="colors">
                        <nuxt-link
                        v-for="(color, i) in colors"
                        :key="color"
                        tag="img"
                        :src="`${API_STATIC_FILE}/${products[i]?.images[0] || ''}`"
                        :alt="products[i].model"
                        :style="`${i === productIndex ? 'cursor: default; border: 4px solid var(--danger);' : ''}`"
                        :to="i !== productIndex ? `${products[i]?.modelLatin || ''}-${products[i]?._id || ''}` : ''"
                        >
                        </nuxt-link>
                    </span>
                </div>
            </div>
            <div class="description">{{ products[productIndex]?.description || '' }}</div>
            <Sizes class="sizes" section="product" :gender-dependent="gender" :sizes="sizes" />
            <div class="links">
                <nuxt-link :to="links.terms_return" class="link_rules">
                    {{ texts.terms_return }}
                </nuxt-link>
            </div>
            <h2 class="price">
                {{ products[productIndex]?.price || '' }}₽
            </h2>
            <div class="buttons">
                <button>
                    <i class='bx bx-credit-card'></i>
                </button>
                <button>
                    <i class='bx bx-cart-add'></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {
        API_PRODUCT_FIND,
        API_STATIC_FILE,
        BRAND_PLACEHOLDER,
        COUNTRY_PLACEHOLDER,
        MATERIAL_PLACEHOLDER,
        TERMS_RETURN,
        TERMS_RETURN_TEXT,
        COLOR_TITLE,
        GENDER_TITLE,
        BUY_BTN_TEXT,
        CART_BTN_TEXT
    } from '~/constants';
    import PhotoViewer from '~/components/PhotoViewer.vue';
    import Comments from '~/components/Comments.vue';
    import Sizes from '~/components/Sizes.vue';
    import { Product, CommentsType } from '~/typings';
    import { getApiHeaders } from '~/helpers/getApiHeaders';
    import { getValueFromInput } from '~/helpers/getValueFromInput';

    function getModelAndId(route: string): {modelLatin: string, id: string} {
        const paramRouteArray = route.split('-');
        const id = paramRouteArray[paramRouteArray.length - 1];
        const modelLatin = paramRouteArray.filter(param => param !== id).join('-');
        return {modelLatin, id};
    }

    export default {
        components: { PhotoViewer, Comments, Sizes },
        layout: 'sidebar-only',
        data: () => ({
            id: '',
            titles: {
                brand: BRAND_PLACEHOLDER,
                material: MATERIAL_PLACEHOLDER,
                country: COUNTRY_PLACEHOLDER,
                color: COLOR_TITLE,
                gender: GENDER_TITLE
            },
            links: {
                terms_return: TERMS_RETURN
            },
            texts: {
                terms_return: TERMS_RETURN_TEXT,
                buy: BUY_BTN_TEXT,
                in_cart: CART_BTN_TEXT
            },
            API_STATIC_FILE
        }),
        async fetch() {
            // @ts-ignore
            const {modelLatin, id} = getModelAndId(this.$route.params.id);
            // @ts-ignore
            if (this.products.length === 0) {
                // @ts-ignore
                const response = await this.$axios.get(encodeURI(`${API_PRODUCT_FIND}/${modelLatin}`), getApiHeaders());
                let products: Product[] = response.data;
                const product = products.find(prod => prod._id === id)!;
                products = products.filter(d => d._id !== id)
                console.log([product, ...products])
                // @ts-ignore
                this.setState('products')([product, ...products]);
            } else {
                // @ts-ignore
                this.products.forEach((prod, i) => {
                    if (prod._id === id) {
                        // @ts-ignore
                        this.setState('productIndex')({target: {value: i}})
                    }
                })
            }
            // @ts-ignore
            this.id = id;
            // return { products: [product, ...products], id }
        },
        computed: {
            gender(): string {
                // @ts-ignore
                return this.$store.state.params.gender;
            },
            colors(): string[] {
                // @ts-ignore
                return this.products.
                // @ts-ignore
                map(product => product.color).
                // @ts-ignore
                map((color, i) => !i ? color[0].toUpperCase() + color.slice(1) : color)
            },
            sizes(): string[] {
                // @ts-ignore
                this.$store.commit('product/set', {name: 'sizes', value: []})
                // @ts-ignore
                return Object.keys(this.products[this.productIndex]?.sizes||{})
            },
            products(): Product[] {
                // @ts-ignore
                return this.$store.state.product.products;
            },
            comments(): CommentsType[] {
                // @ts-ignore
                return this.products[this.productIndex].comments.map(comment => {
                    return {
                        avatar: comment.user!.avatar,
                        name: comment.user!.name,
                        text: comment.text,
                        like: comment.like
                    }
                })
            },
            productIndex(): number {
                // @ts-ignore
                return this.$store.state.product.productIndex;
            }
        },
        methods: {
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('product/set', { name: stateName, value: getValueFromInput(e)})
            },
            isUndefined(variable: any, dataReturn: any) {
                if (variable === undefined) {
                    return ''
                } else {
                    return dataReturn
                }
            }
        }
    }
</script>
<style scoped>
    .content {
        grid-template-rows: 500px auto;
    }
    .viewer {
        grid-column: 2 / 6;
    }
    .info {
        grid-column: 7 / 11;
        grid-row: 1 / 3;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 100px 380px 210px 55px;
        gap: 10px;
    }

    .title {
        grid-column: 1 / 3;
        text-align: center;
        background: var(--dark);
        outline: 4px solid var(--primary);
        height: fit-content;
    }

    .description {
        grid-column: 2 / 3;
        overflow-y: auto;
    }

    .features,
    .feature
    {
        grid-column: 1 / 2;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .feature {
        gap: 5px;
    }

    .feature > h4 {
        color: var(--warn);
        margin: 0;
    }

    .feature > span {
        color: var(--primary);
    }

    .sizes {
        grid-column: 1 / 3;
    }

    .price {
        outline: 4px solid var(--warn);
        grid-column:  2 / 3;
        font-size: 40px;
        display: grid;
        align-items: center;
        justify-items: center;
        height: fit-content;
    }

    .links {
        display: grid;
        align-content: end;
    }

    .colors {
        display: flex;
        padding-right: 30%;
        gap: 10px;
        overflow-x: auto;
    }

    .colors > img {
        width: 100px;
        height: 100px;
        cursor: pointer;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
        grid-column: 1 / 3;
    }

    .buttons > button {
        height: 70px;
        font-size: 40px;
    }

    .comments {
        grid-column: 2 / 6;
        grid-row: 2 / 3;
        height: 445px;
    }
</style>