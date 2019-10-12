<template>
  <div id="app">
    <router-view>      
    </router-view>
    <!-- <chatPage v-if="gotIn" />
    <firstPage v-if="!gotIn"/>  -->
  </div>
</template>

<script>
import router from './router.js'
import chatPage from './components/chatPage.vue'
import firstPage from './components/firstPage.vue'
import api from './api'
import store from './store'
import { mapState, mapActions } from "vuex"

export default {
  data(){
    return{
      
    }
  },
  computed: {
  ...mapState(["gotIn",'messages']),
  },
  name: 'app',
  components: {
    chatPage,
    firstPage
  },
  methods:{
    ...mapActions(['addMessages']),
    test () {
      api.getmessages().then(response => {
          console.log(response.data)
          this.addMessages(response.data.messages)
      });
    },
  },
  mounted () {
    //router.push('/');
    api.getmessages().then(response => {
          console.log(response.data)
          this.addMessages(response.data.messages)
      });
  }
}
</script>

<style>

.Message{
  width: auto;
  height: auto;
  min-height: 20px;
  background-color: rgba(51, 51, 51, 0.6);
  float: right;
  margin: 7px;
  padding-right: 40px;
  font-size: 14px;
  border-style: solid;
  border-radius: 15px;
  border-width: 1px;
  padding-top: 3px;
  color: rgb(255, 255, 255);
  max-width: 400px;
  /* margin-left: 400px; */
  padding-left: 10px;
  font-weight: 300;
  word-break: break-all;
  display: flex;
  flex-direction: column;
    
}
.messageText{
  float: left;
  text-align: left;
  /* word-wrap:break-word; */
}
/* .wrapLine{
  position:relative;
  display:block;
  width: 400px;
  height: fit-content;
  padding-left: 300px;
  float: right;
} */

.wrapLine{
  display:flex;
  max-width: 500px;
  height: fit-content;
  flex-wrap:  wrap;
  justify-content:flex-end;
  margin-right: 0;
}

.time{
  font-size: 10px;
  margin-left: 5px;
}
.timeWrap{
  color: rgb(160, 159, 159);
  background-color: rgba(255, 255, 255, 0);
  display:flex;
  justify-content: flex-end;
  margin-right: -25px;
  margin-bottom: 3px;   
}
.chatWrap{
  align-content: center;
  display: inline-block; 
  color: white;
}
.ChatWindow{
  position: relative;
  width: 550px;
  height: 550px;
  background-color: rgb(0, 0, 0);
  border-width: 3px;
  border-color: green;
  border-style:solid;
  overflow-y: scroll;
  display: flexbox;
  /* flex-direction: column; */
}

.TypeBarTextArea{
  margin-top: 10px;
  margin-left: 50px;
  width: 400px;
  height: 30px;
  background-color: rgb(51, 51, 51);
  font-size: 18px;
  color: rgb(255, 255, 255);
  position: relative;
  padding-left: 10px;
  border-radius: 15px;
}

.imgButton{
  position: relative;
  float: right;
  right: 43px;
  bottom: 33px;
  border-radius: 30%;
  width:32px;
  height: 30px;
  border-radius: 25%;
  background-color: green;
  border-style: solid;
  border-width: 2px;
  border-color: green;
  /* display: none; */
}
.inputHide{
  display: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
