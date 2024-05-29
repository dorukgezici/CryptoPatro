import users from "@/api/users";
import axios from "axios";

// initial state
const state = () => ({
  token: localStorage.getItem("token") || null,
  me: {},
});

// getters
const getters = {
  isAuthenticated: (state: any) => {
    return !!state.token;
  },
  me: (state: any) => {
    return state.me;
  },
};

// actions
const actions = {
  async signUp({ commit }: { commit: any }, form: any) {
    const response = await users.signUp(
      form.email,
      form.username,
      form.firstName,
      form.lastName,
      form.password,
      form.password2,
    );
    commit("SET_TOKEN", response.data.token);
    commit("SET_ME", response.data.user);
  },
  async signIn(
    { commit }: { commit: any },
    { username, password }: { username: string; password: string },
  ) {
    const response = await users.signIn(username, password);
    commit("SET_TOKEN", response.data.token);
  },
  async signOut({ commit }: { commit: any }, deleteToken = true) {
    if (deleteToken) await users.signOut();
    commit("REMOVE_TOKEN");
    commit("REMOVE_ME");
  },
  async getMe({ commit }: { commit: any }) {
    const response = await users.getMe();
    commit("SET_ME", response.data);
  },
};

// mutations
const mutations = {
  SET_TOKEN(state: any, token: string) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    state.token = token;
  },
  REMOVE_TOKEN(state: any) {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    state.token = null;
  },
  SET_ME(state: any, user: any) {
    state.me = user;
  },
  REMOVE_ME(state: any) {
    state.me = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
