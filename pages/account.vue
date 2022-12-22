<template>
    <div class="content">

    </div>
</template>

<script lang="ts">
    import { NuxtAppOptions } from '@nuxt/types';
    import { REDIRECT_AUTHORIZATION } from '@/constants/';
    export default {
        validate({ app }: { app: NuxtAppOptions}) {
            app.router?.push(REDIRECT_AUTHORIZATION)

            return true;
        }
    }
</script>