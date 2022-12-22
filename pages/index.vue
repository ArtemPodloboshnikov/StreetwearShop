<template>
  <div class="content">
      <a
      v-for="image, index in images" :key="image.src"
      :class="`category category_${index+1}`"
      >
        <nuxt-link
        class="image"
        tag="img"
        :src="image.src"
        :alt="image.alt"
        :to="image.to"
        />
      </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DATA_IMAGES } from '@/constants/';

export default Vue.extend({
  name: 'IndexPage',
  data: () => ({
    images: DATA_IMAGES
  }),
  layout: 'sidebar-only'
})
</script>

<style scoped>
  .category {
    height: 100%;
    width: 100%;
    transform: translateX(0);
    border: 0;
    position: relative;
    transition: 0.6s;
    cursor: pointer;
  }

  .category_1,
  .category_2,
  .category_3,
  .category_4 {
    grid-column: 1 / span 3;
    grid-row: 1
  }

  .category_2 {
    grid-column: 4 / span 3;
  }

  .category_3 {
    grid-column: 7 / span 3;
  }

  .category_4 {
    grid-column: 10 / span 3;
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: 0;
    position: relative;
    transition: zIndex 0.6s;
  }

  .category::after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.6s;
    opacity: 1;
  }

  .category:hover::after {
    opacity: 0;
  }

  .category:hover .image {
    z-index: 11;
  }

  .category:hover {
    transform: translateX(-20%);
    width: 145%;
    z-index: 10;
  }
</style>
