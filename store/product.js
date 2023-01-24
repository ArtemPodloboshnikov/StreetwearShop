import { mutations as paramsMutations } from "./params";

export const state = () => ({
    sizes: []
})

export const mutations = { ...paramsMutations}