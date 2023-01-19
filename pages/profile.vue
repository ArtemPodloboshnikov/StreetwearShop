<template>
    <div class="content">
        <Avatar :id="ids.avatar" class="avatar" :set-file-list="setState('avatar')" :default-value="initialData.avatar"/>
        <form :ref="ids.form" class="base" @submit.prevent="updateUser">
            <Inputs :placeholder="placeholders.name" :set="setState('name')" icon="user" :default-value="initialData.name"/>
            <Inputs :placeholder="placeholders.phone" :set="setState('phone')" type="tel" :default-value="initialData.phone"/>
            <Inputs :placeholder="placeholders.address" :set="setState('address')" icon="map" :default-value="initialData.address"/>
            <Inputs :placeholder="placeholders.flat" :set="setState('flat')" icon="buildings" :default-value="initialData.flat"/>
            <Inputs :placeholder="placeholders.password" :set="setState('password')" type="password"/>
            <button type="submit">{{ text.save }}</button>
        </form>
        <Toast :show="isToast" :title="titles.toast" :message="messages.toast" :close="closeToast" />
    </div>
</template>

<script lang="ts">
    import { NuxtAppOptions } from '@nuxt/types';
    import {
        ACCESS_TOKEN_NAME,
        AUTHORIZATION_ROUTE,
        AVATAR_PHOTO_ID,
        PASSWORD_PLACEHOLDER,
        ADDRESS_PLACEHOLDER,
        FLAT_PLACEHOLDER,
        PHONE_PLACEHOLDER,
        USER_NAME_PLACEHOLDER,
        SAVE_TEXT_BTN,
        API_USER_UPDATE,
        TITLE_WRONG_EMPTY,
        EMPTY_FIELD_MESSAGE,
        FORM_USER_OPTIONS,
        API_USER_SELF,
        SUCCESS_SAVE,
        TITLE_SAVE,
        API_STATIC_FILE
    } from '@/constants/';
    import Avatar from '~/components/Avatar.vue';
    import Inputs from '~/components/Input.vue';
    import Toast from '~/components/Toast.vue';
    import { getApiHeaders } from '@/helpers/getApiHeaders';
    import { formValidator } from '~/helpers/formValidator';
    import { deleteEmptyAttributes } from '@/helpers/deleteEmptyAttributes';
    import { getValueFromInput } from '@/helpers/getValueFromInput';
    import { uploadFiles } from '~/helpers/uploadFiles';

    export default {
        components: { Avatar, Inputs, Toast },
        layout: 'sidebar-only',
        validate({ app }: { app: NuxtAppOptions}) {
            const token = app.$cookies.get(ACCESS_TOKEN_NAME);
            if (!token) {
                app.router?.push(AUTHORIZATION_ROUTE);
                return false;
            }

            return true;
        },
        // @ts-ignore
        async asyncData({$axios, app}) {
            const response = await $axios.$get(API_USER_SELF, getApiHeaders(true, app.$cookies.get(ACCESS_TOKEN_NAME)));
            response.avatar = `${API_STATIC_FILE}/${response.avatar}`
            return { initialData: response };
        },
        data: () => ({
            ids: {
                avatar: AVATAR_PHOTO_ID,
                form: FORM_USER_OPTIONS
            },
            placeholders: {
                name: USER_NAME_PLACEHOLDER,
                password: PASSWORD_PLACEHOLDER,
                address: ADDRESS_PLACEHOLDER,
                flat: FLAT_PLACEHOLDER,
                phone: PHONE_PLACEHOLDER
            },
            text: {
                save: SAVE_TEXT_BTN
            },
            isToast: false,
            titles: {
                toast: TITLE_WRONG_EMPTY
            },
            messages: {
                toast: EMPTY_FIELD_MESSAGE
            },
            initialData: {
                name: '',
                address: '',
                flat: '',
                phone: '',
                avatar: ''
            }
        }),
        computed: {
            name(): string {
                // @ts-ignore
                return this.$store.state.user.name;
            },
            address(): string {
                // @ts-ignore
                return this.$store.state.user.address;
            },
            flat(): string {
                // @ts-ignore
                return this.$store.state.user.flat;
            },
            phone(): string {
                // @ts-ignore
                return this.$store.state.user.phone;
            },
            avatar(): FileList {
                // @ts-ignore
                return this.$store.state.user.avatar[0];
            }
        },
        methods: {
            setState(stateName: string) {
                // @ts-ignore
                return (e: any) => this.$store.commit('user/set', { name: stateName, value: getValueFromInput(e) })
            },
            async updateUser() {
                const user = {
                        // @ts-ignore
                        name: this.name,
                        // @ts-ignore
                        address: this.address,
                        // @ts-ignore
                        flat: this.flat,
                        // @ts-ignore
                        phone: this.phone,
                        avatar: ''
                }

                // @ts-ignore
                if (this.avatar) {
                    // @ts-ignore
                    const filesResponse = await uploadFiles(this.$axios.$post, this.avatar, this.initialData.name || this.name);
                    user.avatar = filesResponse[0].url;
                }

                if (formValidator(user, true)) {
                    // @ts-ignore
                    const response: any = await this.$axios.patch(API_USER_UPDATE, deleteEmptyAttributes(user), getApiHeaders(true))
                    if (response.status === 200) {
                        // @ts-ignore
                        this.setToastOptions(true);
                    }

                } else {
                    // @ts-ignore
                    this.setToastOptions(false);
                }
            },
            closeToast() {
                // @ts-ignore
                this.isToast = false;
            },
            setToastOptions(isSuccess: boolean) {
                // @ts-ignore
                this.isToast = true;
                if (isSuccess) {
                    // @ts-ignore
                    this.messages.toast = SUCCESS_SAVE;
                    // @ts-ignore
                    this.titles.toast = TITLE_SAVE;
                } else {
                    // @ts-ignore
                    this.messages.toast = EMPTY_FIELD_MESSAGE;
                    // @ts-ignore
                    this.titles.toast = TITLE_WRONG_EMPTY;
                }
            }
        }
    }
</script>

<style scoped>

    .avatar,
    .base {
        margin-top: 10%;
    }

    .avatar {
        height: 250px;
        grid-column: 2 / 4;
        margin-top: 20%;
    }

    .base {
        grid-column: 4 / 8;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>