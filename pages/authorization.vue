<template>
    <div class="layout">
        <div class="logo logo_top"></div>
        <div class="logo logo_left"></div>
        <form class="form" @submit.prevent="formHandler">
            <Inputs :set="setState('login')" :placeholder="placeholders.phone" :error="phoneCheck" :message="messages.phone" type="tel" />
            <Inputs :set="setState('password')" :placeholder="placeholders.password" :error="passwordCheck" :message="messages.password" type="password" />
            <Inputs :set="setState('password_repeat')" :placeholder="placeholders.password_repeat" type="password" />
            <button type="submit">{{ register_btn }}</button>
        </form>
        <div class="logo logo_right"></div>
        <div class="logo logo_bottom"></div>
        <Toast :title="titles.wrong_format" :message="messages.wrong_format" :show="wrong" :close="closeToast" />
    </div>
</template>

<script lang="ts">
    import {
        API_ROUTE_REGISTET,
        REGISTER_BTN_TEXT,
        TITLE_AUTH,
        DESCRIPTION_AUTH,
        KEYWORDS_AUTH,
        PHONE_PLACEHOLDER,
        PASSWORD_PLACEHOLDER,
        PASSWORD_REPEAT_PLACEHOLDER,
        MESSAGE_ERROR_PASSWORD,
        MESSAGE_ERROR_PHONE,
        WRONG_FORMAT_ERROR,
        TITLE_WRONG_FORMAT
    } from '@/constants/';

    import Inputs from '~/components/Input.vue';
    import Toast from '~/components/Toast.vue';

    type ResponseRegister = {
        access_token: string
    }

    export default {
        components: { Inputs, Toast },
        layout: 'empty',
        data: () => ({
            register_btn: REGISTER_BTN_TEXT,
            placeholders: {
                phone: PHONE_PLACEHOLDER,
                password: PASSWORD_PLACEHOLDER,
                password_repeat: PASSWORD_REPEAT_PLACEHOLDER
            },
            messages: {
                password: MESSAGE_ERROR_PASSWORD,
                phone: MESSAGE_ERROR_PHONE,
                wrong_format: WRONG_FORMAT_ERROR
            },
            titles: {
                wrong_format: TITLE_WRONG_FORMAT
            },
            wrong: false
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
        computed: {
            phone(): string {
                // @ts-ignore
                return this.$store.state.authorization.login;
            },
            pwd(): string {
                // @ts-ignore
                return this.$store.state.authorization.password;
            },
            pwd_repeat(): string {
                // @ts-ignore
                return this.$store.state.authorization.password_repeat;
            }
        },
        methods: {
            async formHandler() {
                // @ts-ignore
                if (!this.isWrong()) {
                    // @ts-ignore
                    const response = await this.register(this.phone, this.pwd);
                    console.log(response);
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
                    return response;

                } catch(e: any) {
                    console.log(e.response.data.message)
                }
            },
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('authorization/set', { name: stateName, value: e?.target?.value})
            },
            passwordCheck(text: string): boolean {
                if (text.length >= 8) {
                    return true;
                }

                return false;
            },
            phoneCheck(text: string): boolean {
                const regexp = /^[\d\\+][\d\\(\\)\\ -]{4,14}\d$/;
                if (regexp.test(text)) {
                    return true;
                }

                return false;

            },
            isWrong(): boolean {
                // @ts-ignore
                if (this.pwd === this.pwd_repeat) {
                    // @ts-ignore
                    const res = !(this.phoneCheck(this.phone) && this.passwordCheck(this.pwd));
                    // @ts-ignore
                    console.log(this.phone, this.pwd)
                    // @ts-ignore
                    console.log(this.phoneCheck(this.phone), this.passwordCheck(this.pwd))
                    // @ts-ignore
                    this.wrong = res;
                    // @ts-ignore
                    return res;
                } else {
                    // @ts-ignore
                    this.wrong = true;
                    return true;
                }
            },
            closeToast() {
                // @ts-ignore
                this.wrong = false;
            }
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