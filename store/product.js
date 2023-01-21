import { mutations as paramsMutations } from "./params";

export const state = () => ({
    products: []
})

export const mutations = { ...paramsMutations}