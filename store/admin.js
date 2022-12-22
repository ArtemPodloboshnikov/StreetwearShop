export const state = () => ({
    brand: '',
    model: '',
    price: 1,
    description: '',
    country: '',
    category: '',
    subcategory: '',
    card: [],
    photos: []
})

export const mutations = {
    set(state, { name, value }) {
        if (Array.isArray(state[name])) {
            console.log(value.length)
            value.forEach(v => state[name].push(v))
        } else {
            state[name] = value
        }
    }
}

export const actions = {

}