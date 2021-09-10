import users from '../../api/users'
import router from '../../router'

// initial state
const state = () => ({
    isAuthenticated: !!localStorage.getItem('token'),
    me: {},
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
    signUp({commit}: { commit: any }, {form}: { form: any }) {
        users.signUp((response: any) => {
            commit('setToken', response)
        }, form.email, form.username, form.firstName, form.lastName, form.password, form.password2)
    },
    signIn({dispatch, commit}: { dispatch: any, commit: any }, {username, password}: { username: string, password: string }) {
        users.signIn((response: any) => {
            commit('setToken', response)
            dispatch('auth/getMe')
        }, username, password)
    },
    signOut({commit}: { commit: any }) {
        users.signOut(() => {
            commit('removeToken')
        })
    },
    getMe({commit}: { commit: any }) {
        users.getMe((response: any) => {
            commit('setMe', response)
        })
    },
}

// mutations
const mutations = {
    setToken(state: any, payload: any) {
        localStorage.setItem('token', payload.token)
        state.isAuthenticated = !!localStorage.getItem('token')
        router.push('/')
    },
    removeToken(state: any) {
        localStorage.removeItem('token')
        state.isAuthenticated = !!localStorage.getItem('token')
        router.push('/login')
    },
    setMe(state: any, payload: any) {
        state.me = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
