<template>
    <div class="content">
        <Tabs :titles="tabs" class="tabs">
            <template #first>
                <div v-if="cart.waiting" class="content cart">
                    <div
                    v-for="wait in cart.waiting"
                    :key="wait._id"
                    class="order_wrap"
                    >
                        <div class="order">
                            <Card
                            :brand="wait.brand"
                            :model="wait.model"
                            :alt="wait.model"
                            :src="`${API_STATIC_FILE}/${wait.images[0]}`"
                            :price="currentPrice(wait._id)"
                            :to="`${wait.modelLatin}-${wait._id}`"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template #second>
                <div class="content cart">

                </div>
            </template>
            <template #third>
                <div class="content cart">

                </div>
            </template>
        </Tabs>
    </div>
</template>

<script lang="ts">
    import Tabs from '~/components/Tabs.vue';
    import Card from '~/components/Card.vue';
    import { ACCESS_TOKEN_NAME, API_CART_FIND, API_STATIC_FILE } from '@/constants/';
    import { Cart } from '@/typings/';
    import { getApiHeaders } from '~/helpers/getApiHeaders';

    export default {
        components: { Tabs, Card },
        layout: 'sidebar-only',
        // @ts-ignore
        async asyncData({$axios, app}) {
            const token: string = app.$cookies.get(ACCESS_TOKEN_NAME);
            const response = await $axios.get(`${API_CART_FIND}/self`, getApiHeaders(true, token));
            const cart: Cart = response.data;
            console.log(cart)
            // @ts-ignore
            return { cart }
        },
        data: () => ({
            tabs: ['Ожидание', 'Активные', 'Доставленные'],
            cart: {} as Cart,
            API_STATIC_FILE
        }),
        computed: {
        },
        methods: {
            currentPrice(productId: string): number {
                // @ts-ignore
                return this.cart.prices.find(obj => productId === obj.productId)!.price;
            }
        }
    }
</script>

<style scoped>
    .tabs,
    .order {
        grid-column: 2 / 12;
    }
    .order_wrap {
        grid-column: 1 / 13;
        display: inherit;
        grid-template-columns: inherit;
        gap: inherit;
        border-bottom: 4px solid var(--primary);
    }

    .order {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 20px;
        align-items: center;
    }

    .cart {

    }
</style>