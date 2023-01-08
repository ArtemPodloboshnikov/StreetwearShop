<template>
  <div class="content">
    <div class="products">
       <Card
        v-for="product in products.slice(0, 5)"
        :key="product.id"
        brand="Supreme"
        :model="product.title"
        :price="500"
        :src="product.url"
        :alt="product.title"
        />
    </div>
    <Paginator class="paginator" :pages="pages" :limit="14"/>
    <!-- <marquee class="company_name" scrolldelay="0" scrollamount="20">
      <span>
        <h1 v-for="num in 6" :key="num">
          {{company_name.toLocaleUpperCase()}}
        </h1>
      </span>
    </marquee> -->
    <div class="products">
       <Card
        v-for="product in products.slice(5, 10)"
        :key="product.id"
        :brand="$route.params.category"
        :model="product.title"
        :price="500"
        :src="product.url"
        :alt="product.title"
        />
    </div>
  </div>
</template>

<script lang="ts">
    // eslint-disable-next-line import/named
    import { NuxtAxiosInstance } from '@nuxtjs/axios';
    // eslint-disable-next-line import/named
    import { Dictionary } from 'vue-router/types/router';
    import { API_GET, COMPANY_NAME, NAVBAR_OPTIONS, CATEGORIES_BY_LINK } from '@/constants/';
    import { matchPaths } from '@/helpers/matchPaths';
    import Card from '~/components/Card.vue';
    import Paginator from '~/components/Paginator.vue';

    export type Product = {
      albumId: number,
      id: number,
      title: string,
      url: string,
      thumbnailUrl: string
    }

    const pages = new Array(100).fill(1).map((_, i) => { return i+1})
    export default {
        components: {
          Card,
          Paginator
        },
        validate({ params }: {params: Dictionary<string>}) {
            const category = `/${params.category}`;
            const subcategory = `/${params.subcategory}`;
            const accessPaths = [...CATEGORIES_BY_LINK[category].tos];
            return matchPaths(subcategory, accessPaths);
        },
        async asyncData({ $axios }: {$axios: NuxtAxiosInstance}) {
            const products: Product[] = await $axios.$get(API_GET);
            return { products: products.slice(0, 10) }
        },
        data: () => ({
            products: [{}] as Product[],
            clothing_types: NAVBAR_OPTIONS,
            company_name: COMPANY_NAME,
            pages,
        })
    }
</script>

<style scoped>
  .content {
    grid-template-rows: 40% 10% 45%;
    margin-top: 4%;
  }
  .company_name {
    grid-column: 2 / 11;
    height: 100px;
  }
  .company_name > span {
    display: flex;
    flex-direction: row;
    gap: 5%;
    color: var(--primary);
    width: 100%;
    font-size: 20px;
  }
  .company_name > span > h1:nth-child(even) {
    -webkit-text-stroke: 1px var(--primary);
    color: transparent;
  }
  .products {
    grid-column: 2 / 12;
    display: grid;
    column-gap: inherit;
    grid-template-columns: repeat(10, auto);
    height: fit-content;
  }
  .products > div {
    grid-column: span 2;
  }

  :global(.vs-card__title) {
    text-align: center !important;
  }

  .paginator {
    grid-row: 2;
    grid-column: 2 / 12;
    justify-content: center;
  }
</style>