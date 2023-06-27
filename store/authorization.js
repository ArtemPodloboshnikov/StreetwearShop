import { mutations as paramsMutations } from "./params";

export const state = () => ({
    login: '',
    password: '',
    password_repeat: ''
})

export const mutations = {...paramsMutations}