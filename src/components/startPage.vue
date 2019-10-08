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
                <input type="text" v-model="myMessage">
                <button @click="submit">asdas</button>
                <br>
                <span>{{myMessage}}</span>
            </div>
        
            <!-- <form onSubmit={this.handleSubmit} >
                <input  type="text" class= "TypeBarTextArea" onChange={event => this.handleChange(event)} >
                </input>
            </form>
                    <input type="file" class="inputHide" id="fileupload" 
                    onChange={this.imgHandle} 
                    ref={fileInput => this.fileInput = fileInput}/>
                    <button class="imgButton" @click="nekafunckija" ></button> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            client:{
                "name":"djordje",
                "users": 13
            },
            myMessage:'',
            message:[
                {
                "content":"asda as das asd as da s ASfasfafasfas",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                },{
                "content":"asjdsajasdaasdasdasasddsadasdaasdasdasdadsadadsdsadasasdasdasdasdasdasdasdasd",
                "time":'23:14'
                }
            ]
            
        }
    },
    name: 'startPage',
    props: {
        msg: String
    },
    methods:{
        hello() {
            console.log('hello');
            
        },
        submit() {
            // axios.post('ahsdhas').data(this.myMessage)
            let timeHours = new Date().getHours().toString;
            let timeMin = new Date().getMinutes().toString;
            if(timeHours < 10 ){
                timeHours = '0'+timeHours
            }
            if(timeMin < 10 ){
                timeMin = '0'+timeMin
            }
            let timeNow = timeHours + ":" + timeMin;
            let currentMessage = this.myMessage;
            let newMsg = {
                "content":currentMessage,
                "time":'12:32'
            }
            this.message.push(newMsg);
            this.myMessage = '';
        }
    },
    created () {
        //ovde idu api pozivi koji ucitavaju sadrzaj
    },
    mounted () {
        this.hello();
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
    
}
.headChat{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 550px;
    background-color: rgb(22, 88, 20);
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
/*
CHATHEAD
    <div class="topHead">
        <div class="chatIcon"></div>
        <p class="roomName">Chat area:</p>
    </div>
    <p class="botHead">Number of users online:</p>
*/


</style>
