<template>
    <transition name="slide-fade">
        <div v-if="show" class="toast">
            <div class="controllers">
                <h3>{{title || settings[code].title}}</h3>
                <button @click="close">
                    <i class="bx bx-x"></i>
                </button>
            </div>
            <div class="hr" />
            <div class="message">
                <p>{{ (extend ? ($md.render(`${settings[code].message} ${message}`)) : (message || settings[code].message)) }}</p>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    import {
        TITLE_WRONG_FORMAT,
        WRONG_FORMAT_ERROR,
        TOAST_BAD_FORMAT,
        TOAST_EMPTY_FIELDS,
        TOAST_UNSAVE_DATA,
        EMPTY_FIELD_MESSAGE,
        TITLE_WRONG_EMPTY,
        TOAST_SAVE_DATA,
        SUCCESS_SAVE,
        TITLE_SAVE,
        TITLE_WRONG_SERVER,
        UNSAVE_MESSAGE
    } from '~/constants';

    const settings = {
        [TOAST_BAD_FORMAT]: {
            message: WRONG_FORMAT_ERROR,
            title: TITLE_WRONG_FORMAT
        },
        [TOAST_EMPTY_FIELDS]: {
            message: EMPTY_FIELD_MESSAGE,
            title: TITLE_WRONG_EMPTY
        },
        [TOAST_SAVE_DATA]: {
            message: SUCCESS_SAVE,
            title: TITLE_SAVE
        },
        [TOAST_UNSAVE_DATA]: {
            message: UNSAVE_MESSAGE,
            title: TITLE_WRONG_SERVER
        }

    } as {[key: string]: {message: string; title: string}}

    export default {
        props: {
            title: {
                type: String,
                default: null
            },
            message: {
                type: String,
                default: null
            },
            code: {
                type: String,
                required: true
            },
            show: {
                type: Boolean,
                required: true
            },
            close: {
                type: Function as PropType<()=>void>,
                required: true
            },
            extend: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            settings
        })
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        width: 20%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        left: 50%;
        top: 3%;
        transform: translateX(-50%);
        z-index: 100;
        background: var(--primary);
        outline: 5px solid var(--dark);
    }

    .toast * {
        color: var(--dark);
    }

    .hr {
        background-color: var(--dark);
        width: 100%;
        height: 2px;
    }

    button {
        background: var(--dark);
    }

    button > i {
        color: var(--primary) !important;
    }

    .controllers {
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
    }

    .message {
        padding: 15px;
        overflow-y: auto;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        top: -150px;
    }
</style>