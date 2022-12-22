<template>
    <div class="gender">
        <button
        :class="`${active === Gender.FEMALE ? 'active' : 'btn'}`"
        @click="() => toggleGender(Gender.FEMALE)"
        >
            <i class='bx bx-female'></i>
        </button>
        <button
        :class="`${active === Gender.MALE ? 'active' : 'btn'}`"
        @click="() => toggleGender(Gender.MALE)"
        >
            <i class='bx bx-male'></i>
        </button>
    </div>
</template>

<script lang="ts">
    import { Gender } from '@/constants/';

    export default {
        data: () => ({
            active: Gender.FEMALE,
            Gender
        }),
        methods: {
            toggleGender(gender: Gender) {
                // @ts-ignore
                this.$store.commit('params/set', { name: 'gender', value: gender });
                // @ts-ignore
                this.active = gender;
            }
        }
    }
</script>

<style scoped>
    .gender {
        display: flex;
        height: 200px;
    }

    .gender button {
        font-size: 50px;
    }
    .btn {
        background: var(--dark);
        color: var(--primary);
    }

    .active {
        background: var(--primary);
        color: var(--dark);
    }
</style>