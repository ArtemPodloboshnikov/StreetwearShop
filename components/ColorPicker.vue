<template>
    <div class="wrap">
        <button
        :style="`background: ${active};`"
        class="color"
        @click="showColors"
        >
            <i class='bx bx-palette'></i>
        </button>
        <div
        v-if="isShow"
        class="colors"
        >
            <div class="options_wrap">
                <div
                v-for="color in colors"
                :key="color.hex"
                :style="`background: ${color.hex};`"
                class="options"
                @click="() => changeColor(color)"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { COLORS } from  '@/constants/';

    export default {
        data: () => ({
            colors: COLORS,
            active: COLORS[0].hex,
            isShow: false
        }),
        methods: {
            changeColor( color: {hex: string, text: string }) {
                // @ts-ignore
                this.active = color.hex;
                // @ts-ignore
                this.$store.commit('params/set', { name: 'color', value: color.text });
                // @ts-ignore
                console.log(this.$store.state.params.color);
            },
            showColors() {
                // @ts-ignore
                this.isShow = !this.isShow;
            }
        }
    }
</script>

<style scoped>
    .wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .color, .colors {
        height: inherit;
        width: 100%;
        height: 100px;
        text-align: center;
        font-size: 40px;
        color: var(--warn);
    }

    .colors {
        height: fit-content;

        position: relative;
    }

    .options_wrap {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .options {
        width: 100%;
        height: 100px;
        cursor: pointer;
        position: relative;
    }
</style>