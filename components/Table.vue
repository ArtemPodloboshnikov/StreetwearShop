<template>
    <table>
        <thead>
            <tr>
                <th
                v-for="title in titles"
                :key="title"
                >
                    {{ title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <slot name="body"></slot>
        </tbody>
    </table>
</template>
<script lang="ts">
    import { PropType } from 'vue';

    export default {
        props: {
            titles: {
                type: Array as PropType<string[]>,
                required: true
            }
        }
    }
</script>
<style scoped>
    table {
        background: var(--dark);
        text-align: center;
        padding: 10px;
        border-spacing: 20px;
    }

    tr {
        border-bottom: 2px solid var(--primary);
    }
</style>