<template>
    <div class="popwrap">
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
#poptext{
    color:rgb(255, 0, 0);
    font-weight: bolder;
    margin: 2px 2px;
}
.popwrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}
.popupwrap{
    background-image: url(../assets/monitor.png);
    width: 80%;
    height: 61px;
    margin:  auto;
    display: flex;
    justify-content: center;
}
.input{
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.input input{
    color: red;
    background-color: rgba(112, 112, 112, 0.267);
    width: 199px;
    height: 35px;
    text-align: center;
    border-width: 0px;

}
.input input::placeholder{
    color: red;
    font-size: 15px;
    font-weight:bolder;
}
.input input:focus{
    border-color: red;
}
.input input:focus::placeholder{
       color:transparent;
       font-size: 20px;
  }
.input button{
    margin-top: 2px;
    margin-left: 10px;
    border-radius: 50%;
    font-size: 15px;
    width: 50px;
    height: 50px;
    font-weight:bolder;
    background-color: rgba(112, 112, 112, 0.267);
    color: rgb(141, 0, 0);
    border-width: 0px;
}
</style>
