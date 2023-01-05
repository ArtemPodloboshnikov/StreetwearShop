<template>
  <aside class="sidebar">
    <nuxt-link tag="button" :to="account_route">
     <i class="bx bx-user"></i>
    </nuxt-link>
    <button>
     <i class="bx bx-cart"></i>
    </button>
    <Genders class="gender_wrap" section="params"/>
    <ColorPicker section="params"/>
    <!-- <div class="gender">
      <button>
       <i class="bx bx-female"></i>
      </button>
      <button>
       <i class="bx bx-male"></i>
      </button>
    </div> -->
    <button>
     <i class="bx bx-purchase-tag"></i>
    </button>
  </aside>
</template>
<script lang="ts">
    import Genders from './Gender.vue';
    import ColorPicker from './ColorPicker.vue';
    import { ACCOUNT_ROUTE, Gender } from '@/constants/';

    export default {
      components: { Genders, ColorPicker },
      data:() => ({
        active: 'user',
        account_route: ACCOUNT_ROUTE,
        Gender
      }),
      computed: {
            gender() {
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