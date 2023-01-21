export const state = () => ({
    gender: 'мужчина',
    colors: ['чёрный'],
    sizes: ['XS']
})

export const mutations = {
    set(state, { name, value, keyObject=null }) {
        if (Array.isArray(state[name])) {
            state[name] = [];
            value.forEach(v => state[name].push(v))
        } else if(keyObject) {
            state[name][keyObject] = value;
        } else {
            state[name] = value
        }
    },
    remove(state, {name, value}) {
        state[name].splice(state[name].indexOf(value), 1)
    }
}