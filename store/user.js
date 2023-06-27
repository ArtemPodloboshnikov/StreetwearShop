import { mutations as paramsMutations } from "./params";

const defaultState = () => ({
    avatar: undefined,
    name: '',
    phone: '',
    address: '',
    flat: '',
    period: ''
})

export const state = defaultState()

export const mutations = {...paramsMutations}

export const getters = {
    default() {
        return defaultState();
    }
}