<template>
<div>
    <div class="tatkoNaMafiu">
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
                    :class="{'my-message':msg.myMsg}"
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

                    <div class="singleMessageDiv invis">

                    </div>

            </div>
            <div class="scrollDownButton" @click="scrollToEnd" v-if="!user.scrolled">
                <i class="material-icons">keyboard_arrow_down</i>
            </div>
            <div class="inputWrap">
            <div @click="files" class="content">
                  &nbsp;
                </div>
                <input  type="text" v-model="myMessage" @keyup.enter="submit" @keyup="changeIcon" @focus="scrollToEnd">
                <button @click="submit" class="btn_icon"></button>
            </div>
            <div class="dopuna"></div>
        </div>
    </div>
</div>
</template>

<script>
import api from '../api'
import { mapState } from 'vuex';
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
        test () {
            console.log(this.messages)
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
                "name": name
            }
            // console.log(this.messages);
            // this.messages.push(newMsg);
            this.user.ws.send(JSON.stringify(newMsg));
            console.log('sent');
            this.scrollToEnd();
            this.myMessage = '';
        },

        changeIcon(){
          let icon = this.$el.querySelector('.btn_icon');
          let inputValue = this.myMessage;
          if(inputValue !== ''){
            console.log('radi');
            icon.style.backgroundImage = 'url("/img/arrow-up.3873f299.png")';
            icon.style.backgroundSize = '30px 30px';
          }else{
            icon.style.backgroundImage = 'url(/img/microphone_icon.fac92fde.png)';
            icon.style.backgroundSize = '40px 40px';
          }
        },
        files(){
          console.log('radi');
        }


    },
    created () {
        //dodati api za nalazenje cafe room name

    },
    mounted () {
        this.message = this.messages;
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
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  background-color: rgba(121, 121, 121, 0.65);
  border: 1px rgb(58, 58, 58);
}

@keyframes MoveUpDown {
  0%, 100% {
    bottom: 10px;
  }
  50% {
    bottom: 20px;
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
.singleMessageDiv Message{
    background-color: rgb(212, 228, 241);
}
div.singleMessageDiv.my-message .wrapLine .Message{
    background-color:rgb(62, 145, 76);
}

.tatkoNaMafiu{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    border-style:solid;
    border-width: 3px;
    border-bottom-width: 0px;
    border-color: rgb(0, 155, 0);
    border-style:solid;
    display: flex;
    flex-direction: column;
    width: 550px;
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
.typingShell{
    background-color: rgb(119, 158, 122);
    display: flex;
    width: fit-content;
}
.inputWrap{
    display: flex;
    flex-direction: row;
    border-radius: 30px;
    flex:1;
    background-color: rgb(212, 228, 241);
    margin: 0 3% 0 2%;
}
.inputWrap input{
    width: 84%;
    display: block;
    float: left;
    border-radius: 30px;
    font-size: 18px;
    padding-left: 5px;
    margin-top: 4px;
    margin: 0 0 0px 4%;
    width: 88%;
    display: flex;
    float: left;
    font-size: 14px;
    padding-left: 5px;
    border-width: 0;
    background-color: rgb(212, 228, 241);
    /* box-shadow: rgb(22, 22, 22) 10px -10px 50% 10px; */
}

.inputWrap button{
    display: block;
    width: 30px;
    height: 30px;
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
    background-image: url('../assets/microphone_icon.png');
    background-size: 40px 40px;
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
.dopuna{
    background-color: rgb(119, 158, 122);
    display: flex;
    height: 6px;
}
/*
CHATHEAD
    <div class="topHead">
        <div class="chatIcon"></div>
        <p class="roomName">Chat area:</p>
    </div>
    <p class="botHead">Number of users online:</p>
*/

</style>
