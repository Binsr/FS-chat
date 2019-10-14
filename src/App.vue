<template>
  <div id="app" class="ceoPage">
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
    ...mapActions(['addMessages','disconnectWS']),
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
  },
  beforeDestroy(){
    this.disconnectWS()
  }
}
</script>

<style>
textarea:focus, input:focus, button:focus{
    outline: none;
}
body{
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
html {
    overflow: auto;
}
.ceoPage{
  margin: 0 auto;
}
.Message{
  min-width: 100px;
  height: auto;
  min-height: 20px;
  background-color: rgb(245, 209, 209);
  float: right;
  margin: 7px 20px;
  padding-right: 40px;
  font-size: 17px;
  border-style: solid;
  border-radius: 15px;
  border-width: 0;
  padding-top: 3px;
  color: rgb(0, 0, 0);
  min-width: 70px;
  min-height: 38px;
  /* margin-left: 400px; */
  padding-left: 10px;
  font-weight: 300;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px;
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
  font-weight: bold;
}
.timeWrap{
  color: rgb(78, 78, 78);
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
  background-color: rgb(119, 158, 122);
  position: relative;
  width: 550px;
  height: 550px;
  border-width: 0px;
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
  background-color: rgb(255, 255, 255);
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
/*----------------------------------------- RESPONSIVEE -------------------------------------------------*/

</style>
