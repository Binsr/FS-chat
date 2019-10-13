import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import router from './router'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    messages: null,
    client:{
      name:null,
      number:null
    },
    user: {
      name: null,
      ip: null,
      ws: null,
      sid: null,
      scrolled: true
    },
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
    ADD_MESSAGES : (state, payload) => {
      console.log(payload)
      state.messages = payload;
    },
    ADD_USERNAME : (state, payload) => {
      state.user.name = payload;
    }
  },


  actions: {
    addMessages (store, payload){
      store.commit( 'ADD_MESSAGES' , payload);
    },
    addUsername (store, payload){
      store.commit( 'ADD_USERNAME' , payload);
    },
    connectToWS(store){
      console.log(store.state.user.sid);
      if(store.state.user.sid != null){
        let WS = new WebSocket('ws://990b121.mars1.mars-hosting.com/stockings?sid='+ store.state.user.sid);
        store.state.user.ws = WS;
        
        store.state.user.ws.onopen = () =>{
          console.log('connected to WS')
          store.state.user.ws.onmessage = (data) => {
            store.dispatch('getClient');
            console.log(data.data);
            let object = JSON.parse(data.data)
            if(object.sid == store.state.user.sid)
              object.myMsg = true
            else
              object.myMsg = false
              
            store.state.messages.push( object )
            store.state.user.scrolled = false;
            // console.log(store.state.messages)
          }
        }
      }
    },
    disconnectWS (store) {
      store.state.user.ws.close();
    },
    getClient () {
      let sid = store.state.user.sid
      api.getclient(sid).then(response =>{
          console.log(response)
          store.state.client.name = response.data.cafe.caf_name;
          store.state.client.number = response.data.cafe.caf_number;
      })
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