<template>
<div>
    <div class="tatkoNaMafiu">
        <div class="headChat">
                <div class="topHead">
                    <div class="chatIcon"></div>
                    <div class="roomWrap"><p class="roomName">F-S area: {{client.name}}</p></div>
                </div>
                <p class="botHead">Number of users online:{{client.number}}</p>
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
                <div class="singleMessageDiv invis"></div>
                
            </div>
            <div class="scrollDownButton" @click="scrollToEnd" v-if="!user.scrolled">
                <i class="material-icons">keyboard_arrow_down</i>
            </div>
            <div class="inputWrap">
                <input  type="text" v-model="myMessage" @keyup.enter="submit" @focus="scrollToEnd">
                <button @click="submit">--></button>
            </div>
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
        
        
    },
    created () {
        //dodati api za nalazenje cafe room name
        
    },
    mounted () {
        this.message = this.messages;
        this.scrollToEnd();
        
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
    border-color:red;
}
div.singleMessageDiv.my-message .wrapLine .Message{
    border-color: rgb(49, 0, 228);
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
    margin: 9px 0 0 9px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 550px;
    background-color: rgb(0, 0, 0);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.topHead{
    display: flex;
}
.botHead{
    color: rgb(133, 133, 133);
    font-size: 10px;
}
.roomName{
    font-size: 20px;
    color: rgb(33, 160, 29);
    font-size: 20px;
    color: rgb(33, 160, 29);
    font-family: "Righteous", cursive;
    margin-left: -60px;
}
.roomWrap{
width: 100%;
display: flex;
align-items: center;
justify-content: center;
}

.inputWrap{
    background-color: rgb(20, 82, 20);
}
.inputWrap input{
    width: 88%;
    display: block;
    float: left;
    border-radius: 30px;
    background-color: gray;
    font-size: 18px;
    padding-left: 5px;
}
.inputWrap button{
    color: rgb(20, 233, 13);
    background-color: rgb(0, 0, 0);
    font-weight: bolder;
    font-family: sans-serif;
    font-size: 18px;
    width: 9%;
    border: none;
    display: block;
    float: right;
    border-radius: 30px;
    border-style: solid;
    border-width: 2px;
    border-color: green;
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
