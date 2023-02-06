import { mutations as paramsMutations } from "./params";

export const state = () => ({
    brand: '',
    model: '',
    price: 1,
    codes: {},
    description: '',
    material: '',
    country: '',
    category: '',
    gender: 'Мужчина',
    subcategory: '',
    card: [],
    cards: [],
    count_sizes: {},
    photos: [],
    sizes: ['XS'],
    colors: ['чёрный']
})

export const mutations = { ...paramsMutations}