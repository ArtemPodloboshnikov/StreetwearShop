export const state = () => ({
    gender: 0,
    color: '',
    sizes: [0]
})

export const mutations = {
    set(state, { name, value }) {
        if (Array.isArray(state[name])) {
            state[name] = [];
            value.forEach(v => state[name].push(v))
        } else {
            state[name] = value
        }
    }
}