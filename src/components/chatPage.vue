<template>
<div>
    <div class="tatkoNaMafiu">
        <div class="headChat">
                <div class="topHead">
                    <div class="chatIcon"></div>
                    <div class="roomWrap"><p class="roomName">F-S area: {{client.name}}</p></div>
                </div>
                <p class="botHead">Number of users online:{{client.users}}</p>
        </div>
        <div class="chatWrap">
            <div class="ChatWindow"> 
                <div>
                    <div class="singleMessageDiv"
                    v-for="(msg, index) in message"
                    v-bind:key="index"
                    >
                        <div class="wrapLine">
                            <div class="Message">
                                <div class="messageText"> {{msg.content}} </div>
                                <div class="timeWrap">
                                    <div class="time"> {{msg.time}} </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="inputWrap">
                <input  type="text" v-model="myMessage" @keyup.enter="submit">
                <button @click="submit">--></button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            client:{
                "name":"Uros",
                "users": 13
            },
            otherMessages: [],
            myMessage:'',
            message:[]
        }
    },
    name: 'chatPage',
    props: {
        msg: String
    },
    methods:{
        submit() {
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

            if(currentMessage == '')
                return;

            let newMsg = {
                "content":currentMessage,
                "time": timeNow
            }
            this.message.push(newMsg);
            this.myMessage = '';
        },
        // loadpage () {
        //     this.otherMessages = "picka";
        //     axios.get("http://990b121.mars1.mars-hosting.com/hello%20:D")
        //     .then(function(response){
        //         this.otherMessages.push = response.data.bpi;
        //     })
        //     .catch(function(error){
        //         this.otherMessages = error;
        //     })
        // }
    },
    created () {
        // this.loadpage();
    },
    mounted () {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.singleMessageDiv{
    display: flex;
    justify-content: flex-end;
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
