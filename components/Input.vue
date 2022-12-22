<template>
    <div class="wrap">
        <div class="input">
            <input
            v-bind="value"
            :placeholder="placeholder"
            :max="max"
            :min="min"
            :type="passwordOpen ? 'text' : type"
            @input="set"
            />
            <i
            :class="`bx bx-${passwordOpen ? 'lock-open-alt' : (icon ? icon : typeIcons[type])}`"
            @click="togglePassword"></i>
        </div>
        <div v-if="message && error(value)" class="hint">

        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

    const typeIcons: {[key: string]: string} = {
        'text': 'question-mark',
        'email': 'envelope',
        'password': 'lock-alt'
    }

    export default {
        name: 'Inputs',
        props: {
            type: {
                type: String,
                default: 'text'
            },
            min: {
                type: Number,
                default: null
            },
            max: {
                type: Number,
                default: null
            },
            placeholder: {
                type: String,
                default: 'Какой-то текст'
            },
            icon: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            error: {
                type: Function as PropType<(text: string) => boolean>,
                default: () => { return  false }
            },
            set: {
                type: Function as PropType<(payload: Event) => void>,
                required: true
            }
        },
        data: () => ({
            typeIcons,
            passwordOpen: false,
            value: ''
        }),
        methods: {
            togglePassword(){
                // @ts-ignore
                if (this.type === 'password') {
                    // @ts-ignore
                    this.passwordOpen = !this.passwordOpen;
                }
            }
        }
    }
</script>

<style scoped>
    .wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
    }

    .input {
        display: grid;
        grid-template-columns: 80% 20%;

    }

    .input > input {
        width: 100%;
        height: 100%;
        min-height: 50px;
        padding-left: 15px;
    }

    .input > input::placeholder {
        text-align: center;
    }

    .input > i {
        background: var(--warn);
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 30px;
        color: var(--dark);
        cursor: pointer;
    }
</style>