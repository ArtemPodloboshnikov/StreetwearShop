<template>
    <div class="layout">
        <div class="logo logo_top"></div>
        <div class="logo logo_left"></div>
        <form class="form" @submit.prevent="formHandler">
            <Inputs :set="()=>setState('login')" icon="user" />
            <Inputs :set="()=>setState('password')" type="password" />
            <button type="submit">{{ register_btn }}</button>
        </form>
        <div class="logo logo_right"></div>
        <div class="logo logo_bottom"></div>
    </div>
</template>

<script lang="ts">
    import {
        API_ROUTE_REGISTET,
        REGISTER_BTN_TEXT,
        TITLE_AUTH,
        DESCRIPTION_AUTH,
        KEYWORDS_AUTH
    } from '@/constants/';

    import Inputs from '~/components/Input.vue';

    type FormData = {
        phone: string,
        pwd: string,
        pwd_repeat: string
    }

    type ResponseRegister = {
        access_token: string
    }

    const formData: FormData = {
        phone: '',
        pwd: '',
        pwd_repeat: ''
    }
    export default {
        components: { Inputs },
        layout: 'empty',
        data: () => ({
            formData,
            register_btn: REGISTER_BTN_TEXT
        }),
        head: () => ({
            title: TITLE_AUTH,
            meta: [
                {
                    hid: DESCRIPTION_AUTH.name,
                    name: DESCRIPTION_AUTH.name,
                    content: DESCRIPTION_AUTH.text
                },
                {
                    hid: KEYWORDS_AUTH.name,
                    name: KEYWORDS_AUTH.name,
                    content: KEYWORDS_AUTH.text
                }
            ]
        }),
        methods: {
            async formHandler() {
                if (formData.pwd === formData.pwd_repeat) {
                    await this.register(formData.phone, formData.pwd)
                } else {
                    alert('dsds')
                }
            },
            async register(phone: string, pwd: string) {
                try {
                    // @ts-ignore
                    const response: ResponseRegister = await this.$axios.$post(API_ROUTE_REGISTET,
                    {
                        phone,
                        pwd
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:8080',
                            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        }
                    });
                    console.log(response);

                } catch(e: any) {
                    console.log(e.response.data.message)
                }
            },
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('authorization/set', { name: stateName, value: e?.target?.value})
            },
        }
    }
</script>

<style scoped>
    .layout {
        display: grid;
        grid-template-columns: 20% 60% 20%;
        grid-template-rows: 20% 60% 20%;
        grid-template-areas: ". logo_t ."
                            "logo_l form logo_r"
                            ". logo_b .";
        height: 100%;
    }

    .logo {
        width: 100%;
        height: 100%;
        background-color: var(--danger);
    }

    .logo_top {
        grid-area: logo_t;
    }

    .logo_left {
        grid-area: logo_l;
    }

    .logo_right {
        grid-area: logo_r;
    }

    .logo_bottom {
        grid-area: logo_b;
    }

    .form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        grid-area: form;
        gap: 3%;
    }
</style>