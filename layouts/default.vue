<template>
    <div class="layout">
        <Navbar/>
        <main>
            <nuxt/>
        </main>
        <Sidebar/>
    </div>
</template>
<script>
    import Sidebar from '@/components/Sidebar.vue';
    import Navbar from '@/components/Navbar.vue';

    export default {
        components: {
            Sidebar,
            Navbar
        }
    }
</script>
<style>
    .layout {
        display: grid;
        grid-template-columns: 90% 10%;
    }
</style>