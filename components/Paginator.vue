<template>
    <div :class="`paginator ${$attrs.class}`">
        <div
        v-for="page, index in pages.slice(start_page, end_page)"
        :key="page"
        class="page"
        >
            <div
            v-if="index === 0"
            :class="`${active_page === pages[0] ? 'active' : 'edges'} number`"
            @click="()=>clickPage(pages[0])"
            >
                {{pages[0]}}
            </div>
            <div
            v-if="index == 0 && start_page !== 0"
            class="number period_left"
            @click="clickPrevPeriod"
            >
                ...
            </div>
            <div
            v-if="page !== pages[0] && page !== pages[pages.length - 1]"
            :class="`${active_page === page ? 'active' : ''} number`"
            @click="()=>clickPage(page)"
            >
              {{page}}
            </div>
            <div
            v-if="pages.slice(start_page, end_page).length - 1 === index && pages[pages.length - 1] !== page"
            class="number period_right"
            @click="clickNextPeriod"
            >
                ...
            </div>
            <div
            v-if="pages.slice(start_page, end_page).length - 1 === index"
            :class="`${active_page === pages[pages.length - 1] ? 'active' : 'edges'} number`"
            @click="()=>clickPage(pages[pages.length - 1])"
            >
                {{pages[pages.length - 1]}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    export default {
        props: {
            pages: {
                type: Array as PropType<number[]>,
                required: true
            },
            limit: {
                type: Number,
                required: true
            }
        },
        // @ts-ignore
        data: ({limit}) => ({
            active_page: 1,
            start_page: 0,
            end_page: limit,
        }),
        methods: {
          clickPage(page: number) {
                // @ts-ignore
            this.active_page = page
          },
          clickNextPeriod() {
              // @ts-ignore
            if (this.pages[this.end_page + this.limit] === undefined) {
                // @ts-ignore
                const step = this.pages.length - this.end_page;
                // @ts-ignore
                this.start_page += step;
                // @ts-ignore
                this.end_page += step;
            } else {
                // @ts-ignore
                this.start_page += this.limit;
                // @ts-ignore
                this.end_page += this.limit;
            }
          },
          clickPrevPeriod() {
              // @ts-ignore
            if (this.pages[this.start_page - this.limit] === undefined) {
                // @ts-ignore
                this.end_page -= this.start_page;
                // @ts-ignore
                this.start_page = 0;
            } else {
                // @ts-ignore
                this.start_page -= this.limit;
                // @ts-ignore
                this.end_page -= this.limit;
            }
          }
        }
    }
</script>

<style scoped>
 .paginator {
    width: 100%;
    justify-content: space-between;
    height: fit-content;
    display: flex;
    gap: 30px;
  }

  .page {
    display: flex;
    gap: 30px;
  }

  .number {
    width: 50px;
    height: 50px;
    border: 4px solid var(--primary);
    display: grid;
    justify-items: center;
    align-items: center;
    font-size: 20px;
    background: var(--dark);
    cursor: pointer;
  }

  .active {
    background: var(--danger);
    color: var(--primary);
    border: 0;
  }

  .edges {
    background: var(--primary);
    color: var(--danger);
  }

  .period_right {
    order: 0;
  }

  .period_left {
    order: 0;
  }
</style>