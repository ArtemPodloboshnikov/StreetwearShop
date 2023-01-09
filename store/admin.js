export const state = () => ({
    brand: '',
    model: '',
    price: 1,
    description: '',
    material: '',
    country: '',
    category: '',
    gender: 0,
    subcategory: '',
    card: [],
    photos: [],
    sizes: ['XS']
})

export const mutations = {
    set(state, { name, value }) {
        if (Array.isArray(state[name])) {
            value.forEach(v => state[name].push(v))
        } else {
            state[name] = value
        }
    }
}

export const actions = {

}