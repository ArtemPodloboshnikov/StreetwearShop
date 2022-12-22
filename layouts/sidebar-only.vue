<template>
    <div class="layout">
        <main>
            <nuxt/>
        </main>
        <Sidebar/>
    </div>
</template>
<script>
    import Sidebar from '@/components/Sidebar.vue';

    export default {
        components: {
            Sidebar,
        }
    }
</script>