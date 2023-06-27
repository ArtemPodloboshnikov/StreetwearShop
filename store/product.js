import { mutations as paramsMutations } from "./params";

export const state = () => ({
    sizes: [],
    products: [],
    productIndex: 0
})

export const mutations = { ...paramsMutations}