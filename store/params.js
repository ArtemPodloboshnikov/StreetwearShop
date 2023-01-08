export const state = () => ({
    gender: 0,
    colors: ['чёрный'],
    sizes: ['XS']
})

export const mutations = {
    set(state, { name, value }) {
        if (Array.isArray(state[name])) {
            state[name] = [];
            value.forEach(v => state[name].push(v))
        } else {
            state[name] = value
        }
    },
    remove(state, {name, value}) {
        state[name].splice(state[name].indexOf(value), 1)
    }
}