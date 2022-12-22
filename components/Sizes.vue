<template>
    <div :class="`wrap ${$attrs.class}`">
        <div class="table_btn">
            <i class='bx bx-ruler' @click="toggleTable"></i>
        </div>
        <div class="sizes_wrap">
            <div
            v-for="(size, index) in sizes_constant"
            :key="size"
            :class="`${ active_sizes.includes(index) ? 'active' : (sizes.includes(size) ? '' : 'none')} size`"
            @click="() => changeSize(index)"
            >
                {{size}}
            </div>
        </div>
        <div
        v-if="showTable"
        class="tables_wrap">
            <div class="tables">
                <div
                v-for="table in tables"
                :key="table.title"
                >
                    <h1>{{table.title}}</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th
                                v-for="title in table.content.titles"
                                :key="title"
                                >
                                    {{title}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="(sizes_arr, index) in table.content.sizes"
                            :key="index"
                            >
                                <td
                                v-for="size in sizes_arr"
                                :key="size"
                                >
                                    {{size}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    import { SIZES, TABLES_SIZES, Gender } from '@/constants/'

    type Table = {
        title: string,
        content: {
            titles: string[],
            sizes: string[][]
        }
    }

    export default {
        props: {
            sizes: {
                type: Array as PropType<string[]>,
                required: true
            }
        },
        data: () => ({
            active_sizes: [0],
            sizes_constant: SIZES,
            showTable: false,
        }),
        computed: {
            tables(): Table[] {
                // @ts-ignore
                if (TABLES_SIZES[this.$store.state.params.gender] === undefined) {
                    return [...TABLES_SIZES[Gender.FEMALE], ...TABLES_SIZES[Gender.MALE]]
                }
                // @ts-ignore
                return TABLES_SIZES[this.$store.state.params.gender];
            }
        },
        methods: {
            changeSize(index: number) {
                // @ts-ignore
                if (this.active_sizes.includes(index) && this.active_sizes.length > 1) {
                    // @ts-ignore
                    const i = this.active_sizes.indexOf(index);
                    // @ts-ignore
                    this.active_sizes.splice(i, 1);
                } else {
                    // @ts-ignore
                    this.active_sizes.push(index);
                }

                // @ts-ignore
                this.$store.commit('params/set', { name: 'sizes', value:  this.active_sizes})
            },
            toggleTable() {
                // @ts-ignore
                this.showTable = !this.showTable;
            }
        }
    }
</script>

<style scoped>
    .wrap {
        display: grid;
        grid-template-rows: 30px 90%;
        height: fit-content;
        background: var(--danger);
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        gap: 20px;
    }
    .sizes_wrap {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        height: fit-content;
        width: 100%;
        gap: 20px;
    }
    .size {
        width: 100%;
        height: 50px;
        background: var(--dark);
        color: var(--primary);
        display: grid;
        justify-items: center;
        align-items: center;
        cursor: pointer;
        transition: 200ms linear;
    }

    .none {
        color: var(--dark);
        background: transparent;
    }

    .active {
        background: var(--primary);
        color: var(--danger);
    }

    .table_btn {
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 50px;
    }

    .table_btn > i {
        cursor: pointer;
        color: var(--pr);

    }

    .tables_wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: grid;
        justify-items: center;
        align-items: center;
        backdrop-filter: blur(5px);
    }

    .tables {
        display: flex;
        gap: 200px;
        width: 50%;
        overflow: hidden;
    }

    .table {
        width: 50%;
        height: 50%;
        background: var(--dark);
        text-align: center;
        padding: 10px;
        border-spacing: 20px;
    }
</style>