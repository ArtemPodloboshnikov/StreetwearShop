<template>
    <div :class="`wrap ${$attrs.class}`">
        <div v-if="isTable" class="table_btn">
            <span @click="toggleTable">
                Таблица размеров <i class='bx bx-ruler'></i>
            </span>
        </div>
        <div class="sizes_wrap">
            <div
            v-for="size in sizes_constant"
            :key="size"
            :class="`${ active_sizes.includes(size) ? 'active' : (sizes.includes(size) ? '' : 'none')} size`"
            @click="() => changeSize(size)"
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
            },
            section: {
                type: String,
                required: true
            },
            isTable: {
                type: Boolean,
                default: true
            }
        },
        // @ts-ignore
        data: ({$store, section}) => ({
            active_sizes: [...$store.state[section].sizes],
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
            changeSize(size: string) {
                // @ts-ignore
                if (this.active_sizes.includes(size) && this.active_sizes.length > 1) {
                    // @ts-ignore
                    this.active_sizes.splice(this.active_sizes.indexOf(size), 1);
                    // @ts-ignore
                    this.$store.commit(`${this.section}/remove`, { name: 'sizes', value: size})
                    // @ts-ignore
                } else if (!this.active_sizes.includes(size)) {
                    // @ts-ignore
                    this.active_sizes.push(size);
                    // @ts-ignore
                    this.$store.commit(`${this.section}/set`, { name: 'sizes', value: this.active_sizes})
                }
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
        font-size: 18px;
    }

    .table_btn span {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        cursor: pointer;
        gap: 5px;
    }

    .table_btn i {
        color: var(--pr);
        font-size: 45px;
        position: relative;
        top: 2px;
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
        z-index: 101;
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