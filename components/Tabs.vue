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
    <div>
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
      border: 1px solid #e0e0e0;
      width: 100%;
    }

    .tabs__nav {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      background: #fafafa;
      margin: 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .tabs__btn {
      padding: 0.5rem 0.75rem;
      text-decoration: none;
      color: black;
      text-align: center;
      flex-shrink: 0;
      flex-grow: 1;
      border: 1px solid transparent;
      cursor: pointer;
    }

    .tabs__btn_active {
      background: #e0e0e0;
      cursor: default;
    }

    .tabs__btn:not(.tabs__btn_active):hover,
    .tabs__btn:not(.tabs__btn_active):focus {
      background-color: #eee;
    }

    .tabs__pane {
      display: none;
    }

    .tabs__pane_show {
      display: block;
    }
</style>