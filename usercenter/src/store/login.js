import * as types from "./mutation-type"
const login = {
  state: {
    user: JSON.parse(localStorage.getItem('userinfo')) || {}
  },
  mutations: {
    [types.SET_USER_INFO] (state, data) {
      state.user = data;
    }
  },
  actions: {
    setUser({ commit }, data) {
      localStorage.setItem('userinfo', JSON.stringify(data));
      commit(types.SET_USER_INFO, data)
    }
  }
}
    
   
   
export default login