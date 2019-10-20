<template>
    <div class="popupContainer">
        <div class="sheepLogo">
          <img src="../assets/mainlogo.jpg"/>
        </div>
        <div class="title">
            <div class="titleFSpart"> Friend - Sheep </div>
          <div class="areaPart">App</div>
        </div>
        <div class="wifiContainer">
            <img class="wifiImg" src="../assets/wifi.png"/>
        </div>
      <div>
          <div class="inputContainer">
            <div class="writingTextContainter">
                <p id="poptext">Unesite ime koje ce biti vidljivo samo u cetu</p>
            </div>
            <div class="input">
                    <input type="text" v-model="name" @keyup.enter="submitName" placeholder="~~~Ime~~~">
            </div>
            <div class="btnOkContainer">
                <button @click="submitName">Next</button>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import router from '../router';
import api from '../api'
import { setTimeout, clearInterval } from 'timers';

export default {
    data(){
        return {
            name: '',
            typingAllowed: true
        }
    },
    computed:{
    ...mapState(['user','client']),
    },
    methods:{
        ...mapActions(['addUsername','connectToWS','messages']),
            submitName(){
                if(this.name == ''){
                    if(this.typingAllowed)
                        this.typing("Morate uneti ime prvo");
                        this.typingAllowed = false;
                    return;
                }    
                this.addUsername(this.name);
                api.login(this.name).then(Response => {
                    // console.log(Response.data)
                    this.user.sid = Response.data.sid;
                    this.user.name = Response.data.name;
                    this.user.ip = Response.data.ip;
                    console.log(this.user);
                    this.connectToWS();
                });
                router.push('/firstpage');
            },
            typing(poruka) {
                let text = poruka;
                const el = document.querySelector("#poptext");
                if(poruka){
                    el.textContent = "";
                }

                var i = 0;
                this.interval = setInterval(function () {
                    if (i < text.length) {
                        el.textContent += text[i];

                        if (i == text.length) {
                            return;
                        }
                    }
                    i++;
                }, 90);
            },
        },
    mounted(){
    }
}
</script>

<style>
.popupContainer{
    width: 100vw;
    height: 100vh;
    background-color: rgb(179, 77, 29);
    border-style: solid; 
    border-color: white;
}
.sheepLogo{
    margin: 0 auto;
    width: 100vw;
    background-color: rgb(179, 77, 29);
}
.sheepLogo img{
    margin: 0 auto;
    border-width: 20px;
    border-style: solid;
    border-color: black;
    border-radius: 50%;
}

.titleFSpart{
  color: #fff;
  text-shadow: 2px 2px #fff;
}

/* TITLE EDIT PART
------------------------------------*/

.title {
    display: flex;
    text-align: center;
    font-size: 10vw;
    margin: 0 auto;
    flex-direction: column;
}


.titleFSpart {
  color: rgb(255, 255, 255);
  letter-spacing: 3px;
  font-family: "Bangers", cursive;
  text-shadow: 2px 2px black;
}
.areaPart {
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px rgb(255, 255, 255);
}
.wifiImg{
    width: 50vw;
    height: 50vw;
    margin: 0 auto;
}
.wifiContainer{
    display: flex;
    width: 100vw;
}
.writingTextContainter{
    transform: rotate(10deg);
    color:white;
}

/* ----------------------------------*/
.inputContainer{
    display:flex;
    width: 100vw;
    position: absolute;
    bottom: 0%;
    flex-direction: column;
    margin-bottom: 2vh;
}
.input{
    margin: 0 auto;
}
.input input{
    width: 40vw;
    height: 6vh;
    background-color: red;
    border-radius: 20px;
    text-align: center;   
}
.input ::placeholder{
    color: white;
}

.input input:focus{
    border-color: gray;
    margin-top: 10vh;
    width: 100vw;
    height: 100vh;
    font-size: 20px;
    background-color: black;
    color: white;
}
.btnOkContainer{
    width: 100vw;
    display: flex;
    align-content: center;
    transform: rotate(-20deg);
    margin-top: 5vh;
}
.btnOkContainer button{
    margin: 0 auto;
    color: rgb(184, 0, 0);
    border: none;
    outline: none;
    display: flex;
    background-color: rgb(255, 255, 255);
    font-size: 10vw;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
}

</style>
