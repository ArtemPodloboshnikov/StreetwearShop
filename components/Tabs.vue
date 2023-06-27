<template>
  <div :class="`tabs ${$attrs.class}`">
    <div class="tabs__nav">
      <button
      v-for="(title, index) in titles"
      :key="title"
      :class="`tabs__btn ${active_classes.tabs[index]}`"
      @click="() => toggleClasses(index)">
        {{title}}
      </button>
    </div>
    <div class="tabs__content">
      <div
      v-for="(slot, index) in slots"
      :key="index"
      :class="`tabs__pane ${active_classes.content[index]}`"
      >
        <slot :name="slot"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { PropType } from 'vue';
    const tabClassActive = 'tabs__btn_active';
    const contentClassActive = 'tabs__pane_show';

    export default {
        props: {
            titles: {
                type: Array as PropType<string[]>,
                required: true
            }
        },
        data: () => ({
          active_classes: {
            tabs: [tabClassActive],
            content: [contentClassActive]
          }
        }),
        computed: {
            slots(): string[] {
                // @ts-ignore
                return Object.keys(this.$slots);
            }
        },
        methods: {
          toggleClasses(index: number) {
            // @ts-ignore
            this.active_classes.tabs = [];
            // @ts-ignore
            this.active_classes.tabs[index] = tabClassActive;
            // @ts-ignore
            this.active_classes.content = [];
            // @ts-ignore
            this.active_classes.content[index] = contentClassActive;
          }
        }
    }
</script>

<style scoped>
    .tabs {
      border: 5px solid var(--dark);
      width: 100%;
      display: grid;
      grid-template-rows: 5% 95%;
    }

    .tabs__nav {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      background: var(--dark);
      margin: 0;
    }

    .tabs__btn {
      padding: 0.5rem 0.75rem;
      text-decoration: none;
      color: var(--primary);
      text-align: center;
      flex-shrink: 0;
      flex-grow: 1;
      border: 1px solid transparent;
      cursor: pointer;
      background: var(--dark);
    }

    .tabs__btn_active {
      color: var(--warn);
      cursor: default;
    }

    .tabs__btn:not(.tabs__btn_active):hover,
    .tabs__btn:not(.tabs__btn_active):focus {
      color: var(--danger);
    }

    .tabs__pane {
      display: none;
      height: 100%;
    }

    .tabs__pane_show {
      display: block;
    }

    .tabs__content {
      height: 100%;
    }
</style>