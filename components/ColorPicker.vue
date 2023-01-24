<template>
    <div class="wrap">
        <button
        :style="`background: linear-gradient(to left, ${active.length > 1 ? active.join(', ') : `${active[0]}, ${active[0]}`});`"
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
                    <i v-if="active.includes(color.hex)" class='bx bx-check'></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { COLORS } from  '@/constants/';
    import { getHexFromColors } from '@/helpers/getHexFromColors';

    export default {
        props: {
            section: {
                type: String,
                required: true
            },
            single: {
                type: Boolean,
                default: false
            }
        },
        // @ts-ignore
        data: ({$store, section}) => ({
            colors: COLORS,
            // @ts-ignore
            active: getHexFromColors($store.state[section].colors),
            isShow: false
        }),
        methods: {
            changeColor( color: {hex: string, text: string }) {
                // @ts-ignore
                const colors: string[] = this.$store.state[this.section].colors;

                // @ts-ignore
                if (this.active.includes(color.hex) && this.active.length > 1) {
                    // @ts-ignore
                    this.active.splice(this.active.indexOf(color.hex), 1);
                    // @ts-ignore
                    this.$store.commit(`${this.section}/remove`, { name: 'colors', value: color.text });
                    // @ts-ignore
                } else if(!this.active.includes(color.hex)) {
                    // @ts-ignore
                    this.active.push(color.hex);
                    // @ts-ignore
                    this.$store.commit(`${this.section}/set`, { name: 'colors', value: [...colors, color.text] });
                }

                // @ts-ignore
                if (this.single && this.active.length === 2) {
                    // @ts-ignore
                    const anotherColor: string = this.active.find(c => c !== color.hex);
                    // @ts-ignore
                    this.active.splice(this.active.indexOf(anotherColor), 1);
                    // @ts-ignore
                    this.$store.commit(`${this.section}/remove`, { name: 'colors', value: COLORS.find(c => c.hex === anotherColor)!.text});
                }
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
        display: grid;
        justify-items: center;
        align-items: center;
    }
</style>