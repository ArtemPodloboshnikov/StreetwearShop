<template>
    <div class="content">
        <Collapse :data="data" />
    </div>
</template>

<script lang="ts">
    import Collapse from '~/components/Collapse.vue';
    import { FAQ_CONTENT } from '@/constants/';
    export default {
        components: {
            Collapse
        },
        layout: 'empty',
        data: () => ({
            data: FAQ_CONTENT
        })
    }
</script>

<style scoped>
</style>