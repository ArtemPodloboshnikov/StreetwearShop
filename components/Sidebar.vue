<template>
  <aside class="sidebar">
    <nuxt-link tag="button" :to="profile_route">
     <i class="bx bx-user"></i>
    </nuxt-link>
    <nuxt-link tag="button" :to="cart_route">
     <i class="bx bx-cart"></i>
    </nuxt-link>
    <Genders class="gender_wrap" section="params"/>
    <ColorPicker section="params"/>
    <Sizes class="sizes_wrap" section="params" :sizes="SIZES" :is-table="false" />
    <button>
     <i class="bx bx-purchase-tag"></i>
    </button>
  </aside>
</template>
<script lang="ts">
    import Genders from './Gender.vue';
    import ColorPicker from './ColorPicker.vue';
    import Sizes from './Sizes.vue';
    import { PROFILE_ROUTE, CART_ROUTE, Gender, SIZES } from '@/constants/';

    export default {
      components: { Genders, ColorPicker, Sizes },
      data:() => ({
        active: 'user',
        profile_route: PROFILE_ROUTE,
        cart_route: CART_ROUTE,
        Gender,
        SIZES
      }),
      computed: {
            gender(): string {
                // @ts-ignore
                return this.$store.state.params.gender;
            }
      },
      methods: {
      }
    }
</script>
<style scoped>
    .sidebar {
      width: 100%;
      height: 100vh;
      background: var(--danger);
      display: flex;
      flex-direction: column;
      z-index: 100;
      position: relative;
    }

    .sidebar i {
      font-size: 40px;
    }

    .gender_wrap {
      height: 75px !important;
      width: 100%;
      border-bottom: 4px solid var(--dark);
    }

    .sizes_wrap {
      height: 400px !important;
      /* justify-content: stretch; */
      background: var(--dark);
      padding: 0;
    }

    .sizes_wrap * {
      gap: 0 !important;

    }

    button, a {
      border-bottom: 4px solid var(--dark);
      background-color: var(--primary);
      transition: 0.3s;
    }

    button:hover, a:hover {
      color: var(--primary);
      background-color: var(--dark);
    }
</style>