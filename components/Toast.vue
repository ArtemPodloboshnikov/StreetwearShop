<template >
    <transition name="slide-fade">
        <div v-if="show && showLocal" class="toast">
            <div class="controllers">
                <h3>{{title}}</h3>
                <button @click="close()">
                    <i class="bx bx-x"></i>
                </button>
            </div>
            <hr/>
            <div class="message">
                <p>{{message}}</p>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
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
            }
        },
        data: () => ({
            showLocal: true
        }),
        methods: {
            close() {
                // @ts-ignore
                this.showLocal = false;
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
        top: 10%;
        transform: translateX(-50%);
        z-index: 100;
        background: var(--primary);
    }

    .toast * {
        color: var(--dark);
    }

    hr {
        background-color: var(--dark);
        width: 100%;
        margin: 0;
    }

    .controllers {
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
    }

    .message {
        padding: 15px;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>