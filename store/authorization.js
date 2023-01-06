export const state = () => ({
    login: '',
    password: '',
    password_repeat: ''
})

export const mutations = {
    set(state, { name, value }) {
            state[name] = value
    }
}