<template>
    <transition name="slide-fade">
        <div v-if="show" class="toast">
            <div class="controllers">
                <h3>{{title}}</h3>
                <button @click="close">
                    <i class="bx bx-x"></i>
                </button>
            </div>
            <div class="hr" />
            <div class="message">
                <p>{{message}}</p>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { PropType } from 'vue';

    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            show: {
                type: Boolean,
                required: true
            },
            close: {
                type: Function as PropType<()=>void>,
                default: null
            }
        }
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