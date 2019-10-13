<template>
    <div>
        <div class="popupwrap">
            <div class="space"></div>
            <p id="poptext"></p>
        </div>
        <div class="input">
                <input type="text" v-model="name" placeholder="Anonymous">
                <button @click="submitName">Oki</button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import router from '../router';
import api from '../api'

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
        ...mapActions(['addUsername','connectToWS']),
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
                this.getClient();
            });
            
            router.push('/chatpage');
        },
        getClient () {
            let sid = this.user.sid
            api.getclient(sid).then(response =>{
                console.log(response)
                this.client.name = response.data.cafe.caf_name;
                this.client.number = response.data.cafe.caf_number;
            })
        },
        typing() {
          var i = 0;
          const text = "...Unesite ime ako zelite...";
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
.space{
    height: 20px;
}
#poptext{
    color:rgb(255, 0, 0);
    height: 15px;
    font-weight: bolder;
    justify-self: center;
    margin-top: auto;
    margin-bottom: auto;
}
.popupwrap{
    background-image: url(../assets/monitor.png);
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    border-style: solid;
    border-color: rgb(68, 68, 68);
    border-width: 4px;
    border-radius: 20px;
}
.input{
    margin: 0 auto;
    justify-self: flex-end;
}
.input input{
    color: red;
    background-color: rgba(112, 112, 112, 0.267);
    border-color: rgb(69, 165, 255);
    width: 199px;
    height: 35px;
    text-align: center;

}
.input input::placeholder{
    color: rgb(0, 124, 240);
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
    margin-left: 10px;
    border-radius: 20px;
    font-size: 15px;
    font-weight:bolder;
    background-color: rgb(0, 124, 240);
    color: rgb(141, 0, 0);
}
</style>
