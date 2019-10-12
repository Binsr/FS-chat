import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import router from './router'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    gotIn: false,
<<<<<<< HEAD
    messages: null,
    user: {
      name: null
    },
=======
    fromBackendMessages: null,
    
>>>>>>> vidak
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
    },
    ADD_MESSAGES : (state, payload) => {
<<<<<<< HEAD
      console.log(payload)
      state.messages = payload;
    },
    ADD_USERNAME : (state, payload) => {
      state.user.name = payload;
=======
      state.fromBackendMessages = payload;
>>>>>>> vidak
    }
  },


  actions: {
    changeGotIn (store) {
        store.commit('CHANGE_GOTIN');
    },
    addMessages (store, payload){
      store.commit( 'ADD_MESSAGES' , payload);
    },
    addUsername (store, payload){
      store.commit( 'ADD_USERNAME' , payload);
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