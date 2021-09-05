import users from '../../api/users'

// initial state
const state = () => ({
    isAuthenticated: !!localStorage.getItem('token'),
    me: {},
    theme: false,
})

// getters
const getters = {
    isAuthenticated: (state: any) => {
        return state.isAuthenticated
    },
    me: (state: any) => {
        return state.me
    },
}

// actions
const actions = {
    getMe({commit}: { commit: any }) {
        users.getMe((response: any) => {
            commit('setMe', response)
        })
    },
    authenticate({commit}: { commit: any }) {
        commit('authenticate', {token: 'c73ad7196b0bbdd860b0a184535ba60c5d14d991', expiration: 1000})
    },
}

// mutations
const mutations = {
    setMe(state: any, payload: JSON) {
        state.me = payload
    },
    authenticate(state: any, {token, expiration}: { token: any, expiration: any }) {
        localStorage.setItem('token', token)
        localStorage.setItem('expiration', expiration)
    },
    changeTheme(state: any) {
        state.theme = !state.theme
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
