<template>
    <div class="layout">
        <div class="logo logo_top"></div>
        <div class="logo logo_left"></div>
        <form class="form" @submit.prevent="formHandler">
            <Inputs :set="setState('login')" :placeholder="placeholders.phone" :error="checks.phoneCheck" :message="messages.phone" type="tel" />
            <Inputs :set="setState('password')" :placeholder="placeholders.password" :error="checks.passwordCheck" :message="messages.password" type="password" />
            <Inputs :set="setState('password_repeat')" :placeholder="placeholders.password_repeat" :error="()=>checks.passwordRepeatCheck(pwd, pwd_repeat)" :message="messages.pwd_repeat" type="password" />
            <button type="submit">{{ button.text_register }}</button>
            <nuxt-link :to="routes.login" class="link_rules">{{ button.text_login }}</nuxt-link>
        </form>
        <div class="logo logo_right"></div>
        <div class="logo logo_bottom"></div>
        <Toast :code="toastCode" :title="titles.toast" :message="messages.toast" :show="isToast" :close="closeToast" />
    </div>
</template>

<script lang="ts">
    import {
        API_ROUTE_REGISTET,
        REGISTER_BTN_TEXT,
        TITLE_PAGE_SIGNUP,
        DESCRIPTION_AUTH,
        KEYWORDS_AUTH,
        PHONE_PLACEHOLDER,
        PASSWORD_PLACEHOLDER,
        PASSWORD_REPEAT_PLACEHOLDER,
        MESSAGE_ERROR_PASSWORD,
        MESSAGE_ERROR_PWD_REPEAT,
        MESSAGE_ERROR_PHONE,
        WRONG_FORMAT_ERROR,
        TITLE_WRONG_FORMAT,
        TITLE_WRONG_SERVER,
        ACCESS_TOKEN_NAME,
        PROFILE_ROUTE,
        SIGNIN_ROUTE,
        LIGIN_BTN_TEXT,
TOAST_BAD_FORMAT
    } from '@/constants/';

    import Inputs from '~/components/Input.vue';
    import Toast from '~/components/Toast.vue';
    import { phoneCheck } from '~/helpers/phoneCheck';
    import { passwordCheck } from '~/helpers/passwordCheck';
    import { passwordRepeatCheck } from '~/helpers/passwordRepeatCheck';
    import { setCookie } from '~/helpers/setCookie';
import { getApiHeaders } from '~/helpers/getApiHeaders';

    type ResponseRegister = {
        access_token: string
    }

    export default {
        components: { Inputs, Toast },
        layout: 'empty',
        data: () => ({
            button: {
                text_register: REGISTER_BTN_TEXT,
                text_login: LIGIN_BTN_TEXT
            },
            placeholders: {
                phone: PHONE_PLACEHOLDER,
                password: PASSWORD_PLACEHOLDER,
                password_repeat: PASSWORD_REPEAT_PLACEHOLDER
            },
            messages: {
                password: MESSAGE_ERROR_PASSWORD,
                pwd_repeat: MESSAGE_ERROR_PWD_REPEAT,
                phone: MESSAGE_ERROR_PHONE,
                toast: WRONG_FORMAT_ERROR
            },
            titles: {
                toast: TITLE_WRONG_FORMAT
            },
            checks: {
                passwordCheck,
                passwordRepeatCheck,
                phoneCheck
            },
            routes: {
                login: SIGNIN_ROUTE
            },
            isToast: false,
            toastCode: TOAST_BAD_FORMAT
        }),
        head: () => ({
            title: TITLE_PAGE_SIGNUP,
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
                    if (response) {
                        setCookie(ACCESS_TOKEN_NAME, response.access_token);
                        // @ts-ignore
                        this.$router.push(PROFILE_ROUTE);
                    }
                    console.log(document.cookie);
                } else {
                    // @ts-ignore
                    this.isToast = true;
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
                    getApiHeaders()
                    );
                    return response;

                } catch(e: any) {
                    console.log(e.response.data.message);
                    const message = e.response.data.message.join('. ');
                    // @ts-ignore
                    this.messages.toast = message;
                    // @ts-ignore
                    this.titles.toast = TITLE_WRONG_SERVER;
                    // @ts-ignore
                    this.isToast = true;
                }
            },
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('authorization/set', { name: stateName, value: e?.target?.value})
            },
            isWrong(): boolean {
                // @ts-ignore
                if (passwordRepeatCheck(this.pwd, this.pwd_repeat)) {
                    // @ts-ignore
                    const res = !(phoneCheck(this.phone) && passwordCheck(this.pwd) && passwordRepeatCheck(this.pwd, this.pwd_repeat));
                    // @ts-ignore
                    console.log(this.phone, this.pwd)
                    // @ts-ignore
                    console.log(phoneCheck(this.phone), passwordCheck(this.pwd));
                    // @ts-ignore
                    return res;
                } else {
                    return true;
                }
            },
            closeToast() {
                // @ts-ignore
                this.isToast = false;
            }
        }
    }
</script>

<style scoped>
    @import 'assets/authorization.css';
</style>