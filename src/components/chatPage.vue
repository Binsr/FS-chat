<template>
<div>
    <div class="tatkoNaMafiu">
        <div class="physicallyBodyOfHeader">
            <div class="chatIcon"></div>
        </div>
        <div class="headChat">
                <div class="topHead">
                    <div class="chatIcon"></div>
                    <div class="roomWrap">
                        <p class="roomName">F-S area: {{client.name}}</p>
                        <p class="botHead">Number of users online:{{client.number}}</p>
                    </div>
                </div>
        </div>
        <div class="chatWrap">
            <div class="ChatWindow">
                <div class="singleMessageDiv"
                v-for="(msg, index) in message"
                v-bind:key="index"
                :class="[msg.myMsg ? 'my-message': '',msg.newUser ? 'new-user': '']"
                >
                    <div class="wrapLine">
                        <div class="Message">
                            <div class="messageText" > {{msg.content}} </div>
                            <div class="timeWrap">
                                <div class="time"> {{msg.time}} </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="singleMessageDiv invis"></div>
            <div class="scrollDownButton" @click="scrollToEnd" v-if="!user.scrolled">
                <i class="material-icons">keyboard_arrow_down</i>
            </div>
            </div>
        </div>
        <div class="inputOMEGAWrap">
            <div class="inputWrap">
                <div @click="files" class="content"></div>
                <input  type="text" v-model="myMessage" @keyup.enter="submit" @keyup="changeIcon" @focus="scrollToEnd">
                <div @click="submit" class="sendBtnWrap">
                    <button @click="submit" class="btn_icon"></button>
                </div>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import api from '../api';
import store from '../store.js';
import { mapState, mapActions } from 'vuex';
export default {
    data(){
        return{
            otherMessages: [],
            myMessage:'',
            message:[],
        }
    },
    name: 'chatPage',
    props: {
        msg: String
    },
    computed : {
        ...mapState(['messages','user','client'])
    },
    methods:{
        ...mapActions(['disconnectWS']),
        test () {
            console.log(this.messages);
        },
        scrollToEnd: function() {
            var container = this.$el.querySelector(".ChatWindow");
            // console.log(container);
            container.scrollTop = container.scrollHeight - 55;

            this.user.scrolled = true;
        },
        submit() {
            let time = new Date();
            let min = time.getMinutes();
            let hours = time.getHours();
            let name = this.user.name;

            if(hours < 10){
                hours = "0" + hours;
            }
            if(min < 10){
                min = "0" + min;
            }

            let timeNow = hours + ":" + min;
            let currentMessage = this.myMessage;

            if(currentMessage == '')
                return;

            let newMsg = {
                "content":currentMessage,
                "time": name + " " + timeNow,
                "sid": this.user.sid,
                "name": "Logged"
            }
            // console.log(this.messages);
            // this.messages.push(newMsg);
            this.user.ws.send(JSON.stringify(newMsg));
            console.log('sent');
            this.scrollToEnd();
            this.myMessage = '';
        },
        userJoined() {
            let time = new Date();
            let min = time.getMinutes();
            let hours = time.getHours();

            if(hours < 10){
                hours = "0" + hours;
            }
            if(min < 10){
                min = "0" + min;
            }
            let timeNow = hours + ":" + min;
            let currentMessage = this.myMessage;

            let name = this.user.name;
            let newMsg = {
                "content": "~~~"+name + " has joined room~~~",
                "time": timeNow,
                "sid": this.user.sid,
                "name": name
            }
            store.state.user.ws.send(JSON.stringify(newMsg));
        },
        changeIcon(){
          let icon = this.$el.querySelector('.btn_icon');
          let inputValue = this.myMessage;
          if(inputValue !== ''){
            icon.style.display = 'block';
          }else{
            icon.style.display = 'none';
          }
        },
        files(){
          console.log('radi');
        }
    },
    created () {

    },
    mounted () {
        this.message = this.messages;
        this.userJoined();
    },
    beforeDestroy(){
        this.disconnectWS();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollDownButton {
    animation: MoveUpDown 1s ease-in-out infinite;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    position: fixed;
    transform: translateX(-50%);
    right: 10px;
    bottom: 500px;
    border-radius: 50%;
    background-color: rgba(121, 121, 121, 0.65);
    border: 1px rgb(58, 58, 58);
}
@keyframes MoveUpDown {
    0%, 100% {
        bottom: 10vh;
    }
    50% {
        bottom: 11vh;
    }
}
div.singleMessageDiv.my-message{
    justify-content: flex-end;
}
.invis{
    visibility: hidden;
    height: 50px;
}
.singleMessageDiv{
    display: flex;
    justify-content: flex-start;
}

div.singleMessageDiv.my-message .wrapLine .Message{
    background-color:#FF3232;
}

div.singleMessageDiv.new-user .wrapLine .Message{
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
    color:rgb(78, 78, 78);
    box-shadow: 0 0;
    font-size: 15px;
}

div.singleMessageDiv.new-user{
    justify-content: center;
}

div.singleMessageDiv.new-user .timeWrap{
    justify-content: center;
}
body{
    display: flex;
    justify-content: center;
}
.tatkoNaMafiu{
    background-color: rgb(194, 176, 158); ;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
.chatWrap{
    width: 100%;
    background-color: rgb(255, 255, 255);
}
.chatIcon{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
    align-self: flex-start;
    margin: 10px 0 10px 10px;
    background-image: url("../assets/avatar.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.headChat{
    position: fixed;
    z-index: 1;
    border-style:solid;
    border-width: 3px;
    border-bottom-width: 0px;
    border-style:solid;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 13vh; */
    border-width: 0px;
    background-color: #B71C1C;
}
.physicallyBodyOfHeader{
    opacity: 0;
    border-style:solid;
    border-width: 3px;
    border-bottom-width: 0px;
    border-style:solid;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 13vh; */
    border-width: 0px;
    background-color: rgba(7, 43, 8, 0.979);
}
.topHead{
    display: flex;
    align-items: flex-start;
}
.botHead{
    color: rgb(255, 255, 255);
    font-size: 10px;
    margin: 0 0 5px 0;
}
.roomName{
    font-size: 10px;
    color: rgb(255, 255, 255);
    font-size: 20px;
    margin: 17px 0 5px 0px;
}
.roomWrap{
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 10px;
}
.inputOMEGAWrap{
    position: fixed;
    bottom: 10px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(194, 176, 158); 
}
.inputWrap{
    background-color: #F7E7CE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    /* height: 5vh; */
    width: 90vw;
}
.inputWrap input{
    display: block;
    font-size: 18px;
    width: calc(100% - 50px);
    height: 5vh;
    padding: 0 5px;
    font-size: 14px;
    border-width: 0;
    background-color: #F7E7CE;
}
.sendBtnWrap{
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Message{
  min-width: 40vw;
  height: auto;
  min-height: 20px;
  background-color: #F7E7CE;
  float: right;
  margin: 7px 20px;
  font-size: 19px;
  font-weight: bolder;
  border-radius: 15px;
  color: rgb(0, 0, 0);
  font-weight: 300;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px;
}
.messageText{
  text-align: left;
  margin:3px 5px;
}
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
  margin: 0 6px 4px 0 ; 
}
.chatWrap{
  align-content: center;
  display: inline-block; 
  color: white;
  height: 80vh; 
  background-color:rgb(194, 176, 158); 
}
.ChatWindow{
  position: relative;
  width: 100%;
  height: 100%;
  border-width: 0px;
  border-style:solid;
  overflow-y: scroll;
  display: flexbox;
  /* flex-direction: column; */
}
.inputWrap button{
    /* display: none; */
    width: 29px;
    height: 29px;
    color: gray;
    background-color: rgb(0, 0, 0);
    color: rgb(97, 97, 97);
    font-weight: bolder;
    font-family: sans-serif;
    font-size: 18px;
    float: right;
    border: 2px solid gray;
    border-radius: 30px;
    margin: 4px;
    background-image: url('../assets/arrow-up.png');
    background-size: 30px 30px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
    overflow: hidden;
}
.content{
  border: 2px solid gray;
  background-image: url('../assets/white_clip.png');
  background-color: #fff;
  background-size: 35px 35px;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 4px;
  width: 25px;
  height: 25px;
  display: block;
  border-radius: 30px;
  float: left;
}


</style>
