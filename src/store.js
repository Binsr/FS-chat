import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import router from './router'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    messages: [],
    connected:false,
    client:{
      name:null,
      number:null
    },
    user: {
      name: null,
      ip: null,
      ws: null,
      sid: null,
      scrolled: true,
    }
  },
  mutations: {
  // =================================================UTILITY MUTATIONS START=======================================================
  //   CHANGE_LOGGED: (state, value) => {
  //     state.isLogged = value;
  //   },
  //   CHANGE_WHO_DAT: (state, type) => {
  //     state.whosUsing = type;
  //     sessionStorage.setItem('whodat', type);
  //   },
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
      store.commit('ADD_USERNAME' , payload);
    },
    connectToWS(store){
        let sidd;
        if(store.state.user.sid)
          sidd = store.state.user.sid;
        else{
          let name = window.localStorage.getItem('name');
          if(name)
            store.dispatch('subName', name)
          else{
            return 'vrati na popup page'
          }
        }
        let WS = new WebSocket('ws://990b121.mars1.mars-hosting.com/stockings?sid='+ sidd);
        store.state.user.ws = WS;
        window.localStorage.setItem("ws",WS);
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
            if(object.name == "Logged"){
              object.newUser = false;
            }else{
              object.newUser = true;
            }
            store.state.messages.push( object )
            store.state.user.scrolled = false;
          }
          return 'ok';
      }
    },
    subName(namee){
      if(namee == ''){
        console.log("Name needed");
        return 'nema ime';
      }
      if(typeof namee == typeof {})
        namee = window.localStorage.getItem('name')

      api.login(namee).then(Response => {
        store.state.user.sid = Response.data.sid;
        store.state.user.name = Response.data.name;
        store.state.user.ip = Response.data.ip;
        window.localStorage.setItem('sid',  Response.data.sid);
        window.localStorage.setItem('name', namee);
        window.localStorage.setItem('ip',   Response.data.ip);
        // console.log('dosao do ovde')
        let response = store.dispatch('connectToWS');
        if(response == 'vrati na popup page')
          return 'vrati na popup page'
          //router.push('/')
        else
          return 'goto chatpage'
          // router.push('/chatpage');
      });
    },
    disconnectWS (store) {
      store.state.user.ws.close();
      console.log('WS closed');
    },
    getClient () {
      let sid = store.state.user.sid
      api.getclient(sid).then(response =>{
          console.log(response)
          if(response.data.cafe === null){
            store.state.user.ip = "NOT_CONNECTED";
          }
          store.state.client.name = response.data.cafe.caf_name;
          store.state.client.number = response.data.cafe.caf_number;
      })
    }
  }
})

export default store;