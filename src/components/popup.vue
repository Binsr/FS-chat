<template>
    <div class="popupContainer">
        <div class="sheepLogo">
          <img src="../assets/mainlogo.jpg"/>
        </div>
        <div class="title">
            <div class="titleFSpart"> Friend - Sheep </div>
          <div class="areaPart">App</div>
        </div>
      <div>
          <div class="inputContainer">
            <div class="writingTextContainter">
                <p>.</p>
                <p id="poptext"></p>
            </div>
            <div class="input">
                    <input type="text" v-model="name" @keyup.enter="submitName">
            </div>
            <div class="btnOkContainer">
                <button @click="submitName">Oki</button>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import router from '../router';
import api from '../api'
import { setTimeout } from 'timers';

export default {
    data(){
        return {
            name: ''
        }
    },
    computed:{
    ...mapState(['user','client']),
    },
    methods:{
        ...mapActions(['addUsername','connectToWS','messages']),
        submitName(){
            if(this.name == '')
                this.name = 'Anonymous'
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
        typing() {
          var i = 0;
          const text = "Unesite ime koje ce biti vidljivo samo u cetu...";
          const el = document.querySelector("#poptext");
          this.interval = setInterval(function () {

            if (i < text.length) {
              el.textContent += text[i];

              if (i == text.length) {
                i = 0;
                el.textContent = "";
              }
            }
            if (i > text.length) {
              if (i == (text.length + 30)) {
                /* when text end how long till typing again */
                i = -1;
                el.textContent = "";
              }
            }
            i++;
          }, 90);
        },
    },
    mounted(){
        this.typing();

    }
}
</script>

<style>
.sheepLogo{
    margin: 0 auto;
    width: 100px;
    height: 100px;
}
.sheepLogo img{
    margin: 0 auto;
}
.title{
  color: rgb(119, 158, 122);
  text-shadow: 2px 2px #fff;
}
.titleFSpart{
  color: #fff;
  text-shadow: 2px 2px #fff;
}

/* TITLE EDIT PART
------------------------------------*/

.popupContainer{
    width: 100vw;
    height: 100vh;
}
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
  color: rgb(119, 158, 122);
  text-shadow: 2px 2px cyan;
}

/* ----------------------------------*/
.inputContainer{
    display:flex;
    width: 100vw;
    position: absolute;
    bottom: 0%;
    flex-direction: column;
    margin-bottom: 10vh;
}
.input{
    margin: 0 auto;
}
.input input{
    width: 40vw;
    height: 6vh;
    background-color: red;
    border-radius: 20px;
}

.input input:focus{
    border-color: gray;
    margin-top: 10vh;
    width: 100vw;
    height: 80vh;
    font-size: 20vw;
    background-color: black;
    color: white;
}
.btnOkContainer{
    width: 100vw;
    display: flex;
    align-content: center;
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
