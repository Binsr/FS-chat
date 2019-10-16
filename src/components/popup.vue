<template>
    <div class="popwrap">
      <header>
        <div class="imageShip">
          <img src="../assets/mainlogo.jpg"/>
        </div>
        <h1 class="title"><span class="thisIsPart">this is</span>
          <br><span class="titleFSpart">F - S </span>
          <span class="areaPart"><br> App</span>
        </h1>
      </header>
      <div>
          <div class="popupwrap">
              <p id="poptext"></p>
          </div>
          <div class="input">
                  <input type="text" v-model="name" placeholder="Anonymous" @keyup.enter="submitName">
                  <button @click="submitName">Oki</button>
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
          const text = "...Dobrodosli na Friend-Sheep App! Unesite ime ako zelite...";
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

.areaPart,
.title{
  color: rgb(119, 158, 122);
  text-shadow: 2px 2px #fff;
}
.titleFSpart{
  color: #fff;
  text-shadow: 2px 2px #fff;
}
.tatko{
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
}
.wrap{
    width: 100%;
}


header {
  height: 200px; /* Deo za promenu  */
  font-size: 20px;
  font-family: "Righteous", cursive, "Ultra", serif;
  width: 100%;
}

/* TITLE EDIT PART
------------------------------------*/
.title {
  text-align: center;
}

.thisIsPart {
  color: rgb(119, 158, 122);
  text-shadow: 2px 2px cyan;
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

.popupwrap{
    width: 50%;
    height: 61px;
    margin: 0 auto;
    display: block;
    clear: both;
    margin-top: 15%;
}
.input{
    width: 30%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
.input input{
    width: 78%;
    text-align: center;
    border-width: 0px;
    height: 30px;
    border-radius: 12px;
    background: #fafafa;
    color: cyan;
    font-size: 16px;
    padding-left: 20px;
}
.input input::placeholder{
    color: cyan;
    font-size: 15px;
    font-weight:bolder;
}
.input input:focus{
    border-color: gray;
}
.input input:focus::placeholder{
       color:transparent;
       font-size: 20px;
  }
.input button{
    margin: 2px;
    color: cyan;
    border: none;
    outline: none;
    width: 20%;
    height: 40px;
    background-color: rgba(112, 112, 112, 0.867);
    font-size: 14px;
    font-weight: bold;
    border-radius: 20px;
    text-decoration: none;
    cursor: pointer;
}

</style>
