<template>
    <div class="wrap">
        <i :class="`bx bx-${ icon }`"></i>
        <textarea :class="`${$attrs.class}`" :placeholder="placeholder" @input="(e)=>set(e)"></textarea>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';

    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Надо что-то написать'
            },
            icon: {
                type: String,
                default: 'pencil'
            },
            set: {
                type: Function as PropType<(payload: Event) => void>,
                required: true
            }
        }
    }
</script>

<style scoped>
    .wrap {
        display: grid;
        grid-template-rows: 40px 1fr;
    }

    .wrap > i {
        background: var(--warn);
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 30px;
        color: var(--dark);
    }
</style>