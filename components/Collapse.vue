<template>
    <div :class="`wrap ${$attrs.class}`">
        <details
        v-for="values in data"
        :key="values.question"
        class=""
        >
            <summary class="title">{{values.question}}</summary>
            <div class="content">{{values.answer}}</div>
        </details>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    type Content = {
        question: string,
        answer: string
    }

    export default {
        props: {
            data: {
                type: Array as PropType<Content[]>,
                required: true
            }
        }
    }
</script>

<style scoped>
    /* Убираем стандартный маркер Chrome */
    details summary::-webkit-details-marker {
        display: none
    }
    /* Убираем стандартный маркер Firefox */
    details > summary {
        list-style: none;
    }

    .wrap {
        grid-column: 2 / 12;
    }
    .title {

    }
    .content {

    }

</style>