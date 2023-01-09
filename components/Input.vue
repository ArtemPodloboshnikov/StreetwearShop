<template>
    <div class="wrap">
        <div class="input">
            <input
            :value="value"
            :placeholder="placeholder"
            :max="max"
            :min="min"
            :type="passwordOpen ? 'text' : type"
            @input="inputHandler"
            @blur="checkActivate"
            />
            <i
            :class="`bx bx-${passwordOpen ? 'lock-open-alt' : (icon ? icon : typeIcons[type])}`"
            @click="togglePassword"></i>
        </div>
        <div v-if="!error(value) && isCheck" class="hint">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';

    const typeIcons: {[key: string]: string} = {
        'text': 'question-mark',
        'email': 'envelope',
        'password': 'lock-alt',
        'tel': 'phone'
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
                default: 'Заполните поле'
            },
            error: {
                type: Function as PropType<(text: string) => boolean>,
                default: () => { return  false }
            },
            set: {
                type: Function as PropType<(payload: Event) => void>,
                required: true
            },
            required: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            typeIcons,
            passwordOpen: false,
            value: '',
            isCheck: false
        }),
        methods: {
            togglePassword(){
                // @ts-ignore
                if (this.type === 'password') {
                    // @ts-ignore
                    this.passwordOpen = !this.passwordOpen;
                }
            },
            checkActivate() {
                    // @ts-ignore
                if (this.required && this.value === '') {
                    // @ts-ignore
                    this.isCheck = true;
                    // @ts-ignore
                } else if (this.error(this.value) || this.value === '' || this.required) {
                    // @ts-ignore
                    this.isCheck = false;
                } else {
                    // @ts-ignore
                    this.isCheck = true;
                }
            },
            inputHandler(e: Event) {
                // @ts-ignore
                this.value = e.target.value;
                // @ts-ignore
                this.set(e);
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

    .hint {
        color: var(--danger);
    }
</style>