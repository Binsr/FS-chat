import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import router from './router'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    gotIn: false,

    isLogged: false,
    whosUsing: sessionStorage.getItem('whodat'),
    user: {
      rideReqIntervalId: null,
      rideStatus: false,
      reqStatus: false,
      socket: null,
      socketData: [],
      chosenTaxi: null  
    },
    taxi: {
      socket: null,
      socketData: [],
      chosenUser: null,
      socketBackup: [],
      active: 0,
      tax_id: null
    }
  },
  mutations: {
    // =================================================UTILITY MUTATIONS START=======================================================
    CHANGE_LOGGED: (state, value) => {
      state.isLogged = value;
    },
    CHANGE_WHO_DAT: (state, type) => {
      state.whosUsing = type;
      sessionStorage.setItem('whodat', type);
    },
    CHANGE_GOTIN : (state) => {
        state.gotIn = !state.gotIn
    }
    
  },





  actions: {
    changeGotIn (store) {
        store.commit('CHANGE_GOTIN');
    },





    // =================================================UTILITY ACTIONS=======================================================

    setWhodat(store, type) {
      store.commit('CHANGE_WHO_DAT', type);
    },
    // =================================================USER ACTIONS START=======================================================
    userLogin(store, credentials) {
      if (credentials.email && credentials.password)
        api.userlogin(credentials.email, credentials.password).then(response => {
          if (response.data.sid != null) {
            store.commit("CHANGE_LOGGED", true);
            sessionStorage.setItem("sid", response.data.sid);
            store.dispatch("userCheckStatus",response.data.sid);
            router.push('about');
          }
        })
    },
}
})

export default store;