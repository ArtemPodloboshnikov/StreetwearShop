import { mutations as paramsMutations } from "./params";

export const state = () => ({
    brand: '',
    model: '',
    price: 1,
    code: '',
    description: '',
    material: '',
    country: '',
    category: '',
    gender: 'мужчина',
    subcategory: '',
    card: [],
    cards: [],
    count: {},
    photos: [],
    sizes: ['XS'],
    colors: ['чёрный']
})

export const mutations = { ...paramsMutations}