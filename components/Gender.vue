<template>
    <div :class="`gender ${$attrs.class}`">
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
        props: {
            section: {
                type: String,
                required: true
            }
        },
        // @ts-ignore
        data: ({$store, section}) => ({
            active: $store.state[section].gender,
            Gender
        }),
        methods: {
            toggleGender(gender: Gender) {
                // @ts-ignore
                this.$store.commit(`${this.section}/set`, { name: 'gender', value: gender });
                // @ts-ignore
                this.active = gender;
            }
        }
    }
</script>

<style scoped>
    .gender {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
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