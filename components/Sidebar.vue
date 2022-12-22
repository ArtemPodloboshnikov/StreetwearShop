<template>
  <aside class="sidebar">
    <nuxt-link tag="button" :to="account_route">
     <i class="bx bx-user"></i>
    </nuxt-link>
    <button>
     <i class="bx bx-cart"></i>
    </button>
    <div class="gender">
      <button>
       <i class="bx bx-female"></i>
      </button>
      <button>
       <i class="bx bx-male"></i>
      </button>
    </div>
    <button>
     <i class="bx bx-purchase-tag"></i>
    </button>
  </aside>
</template>
<script lang="ts">
    import { ACCOUNT_ROUTE, Gender } from '@/constants/';

    let gender: Gender;


    export default {
      data:() => ({
        active: 'user',
        account_route: ACCOUNT_ROUTE,
        gender,
        Gender
      }),
      methods: {
          toggleGender: (gen: Gender) => {
            gender = gen
            console.log(gender)
          }
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

    .gender {
      display: grid;
      grid-auto-flow: column;
    }

    .gender > button:first-child {
      border-right: 4px solid var(--dark);
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