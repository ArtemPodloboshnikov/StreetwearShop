<template>
    <div :class="`wrap ${$attrs.class}`">
        <div class="input">
            <input
            :value="value"
            :placeholder="placeholder"
            @focus="toggleOptions"
            />
            <i :class="`bx bx-${ icon }`"></i>
        </div>
        <div v-if="error" class="hint">
                {{ message }}
        </div>
        <div v-if="show_options" class="options_wrap">
            <div
            v-if="Array.isArray(options)"
            class="options">
                <div
                v-for="option in options"
                :key="option"
                class="option"
                @click="()=>clickOption(option)"
                >
                    {{ option }}
                </div>
            </div>
            <div
            v-if="!Array.isArray(options)"
            class="options">
                <div
                v-for="values, title in options"
                :key="title"
                class="section"
                >
                    <span>{{ title }}</span>
                    <div
                    v-for="option in values"
                    :key="option"
                    class="option"
                    style="text-align: start"
                    @click="()=>clickOption(option)"
                    >
                        <span>{{ option }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';

    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Выбери что-то'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: 'checkbox-checked'
            },
            set: {
                type: Function as PropType<(payload: any) => void>,
                required: true
            },
            options: {
                type: [Array, Object],
                required: true
            },
            message: {
                type: String,
                default: 'Зыберите значение'
            }
        },
        data: () => ({
            value: '',
            show_options: false,
            error: false
        }),
        methods: {
            toggleOptions(e: any) {
                // @ts-ignore
                e.target.blur()
                // @ts-ignore
                if (this.show_options) {
                    // @ts-ignore
                    this.show_options = false;
                    // @ts-ignore
                    this.isError();
                } else {
                    // @ts-ignore
                    this.show_options = true;
                }

            },
            clickOption(option: string) {
                // @ts-ignore
                this.value = option
                const e = {
                    target: {
                        value: option
                    }
                }
                // @ts-ignore
                this.set(e);
                // @ts-ignore
                this.show_options = false;
                // @ts-ignore
                this.error = false;
            },
            isError() {
                // @ts-ignore
                console.log(this.error)
                // @ts-ignore
                if (this.value === '') {
                    // @ts-ignore
                    this.error = true;
                } else {
                    // @ts-ignore
                    this.error = false;
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
        cursor: pointer;
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

    .options {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 200px;
        overflow-y: auto;
    }

    .options_wrap {
        position: relative;
    }

    .option {
        color: var(--dark);
        background: var(--primary);
        padding: 5px 5px 5px 15px;
        cursor: pointer;
    }

    .section:nth-child(5) {
        border-top: 5px solid var(--warn);
        background: var(--dark);
    }

    .section {
        background: var(--primary);
        text-align: center;
        color: var(--danger);
    }
    .option:not(:last-child) {
        border-bottom: 5px solid var(--warn);
    }

    .section:not(:last-child) {
        border-bottom: 5px solid var(--dark);
    }

    .input > input:disabled {
        background: var(--primary);
        color: var(--dark);
    }

    .hint {
        width: 100%;
        color: var(--danger);
    }
</style>