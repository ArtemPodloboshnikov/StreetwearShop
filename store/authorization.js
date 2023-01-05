export const state = () => ({
    login: '',
    password: ''
})

export const mutations = {
    set(state, { name, value }) {
            state[name] = value
    }
}