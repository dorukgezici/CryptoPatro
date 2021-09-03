import { createStore } from "vuex";

const store = createStore({
  state: {
    theme: true,
  },
  mutations: {
    changeTheme(state) {
      if (state.theme) {
        state.theme = false;
      } else {
        state.theme = true;
      }
    },
  },
});

export default store;
