<template>
    <div class="content">
        {{ JSON.stringify(product) }}
    </div>
</template>
<script lang="ts">
    import { API_PRODUCT_GET } from '~/constants';

    export default {
        layout: 'sidebar-only',
        // @ts-ignore
        async asyncData({$axios, route}) {
            const response = await $axios.get(`${API_PRODUCT_GET}${route.params.id}`);
            console.log(response);
            return { product: response.data }
        },
        data: () => ({
            product: {}
        })
    }
</script>
<style scoped>
</style>