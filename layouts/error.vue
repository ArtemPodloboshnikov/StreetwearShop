<template>
    <div class="error">
        <h1>404</h1>
    </div>
</template>

<script lang="ts">
    export default {
        layout: 'empty'
    }
</script>

<style scoped>
    .error {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .error h1 {
        color: var(--primary);
        font-size: 120px;
    }
</style>