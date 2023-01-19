const defaultState = () => ({
    avatar: undefined,
    name: '',
    phone: '',
    address: '',
    flat: '',
    period: ''
})

export const state = defaultState()

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

export const getters = {
    default() {
        return defaultState();
    }
}