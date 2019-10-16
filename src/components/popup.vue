<template>
    <div class="popwrap">
      <div class="sliderContainer clearfix">
        <img src="" alt="shopAdd">
      </div>
        <div>
            <div class="popupwrap">
                <p id="poptext"></p>
            </div>
            <div class="input">
                    <input type="text" v-model="name" placeholder="Anonymous" @keyup.enter="submitName">
                    <button @click="submitName">Dalje</button>
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
        backgroundSlider(){
          var i = 0;
          const popwrap = document.querySelector('.popwrap');
          const images = ['/img/code-cafe.395c94cd.jpg', '/img/roll-bar.2e42ee66.jpg', '/img/witch-bar-caffe.76538e7c.jpg', '/img/witch-bar.8988a771.jpg'];
          var  img = document.querySelector('.sliderContainer img');
          img.src = images[i];
          var background = setInterval(() => {
            if (i < images.length -1) {
              i += 1;
              img.src = images[i];
            }else {
              clearInterval(background);
              this.backgroundSlider();
            }
          }, 5000)
        }
    },
    mounted(){
        this.typing();
        this.backgroundSlider();
    }
}
</script>

<style>
.clearfix::after{
  content: '';
  clear: both;
  display: block;
  height: 1px;
  visibility: hidden;
}
#poptext{
    color: cyan;
    font-weight: bolder;
    margin: 2px 2px;
}
.popwrap{
    height: 100vh;
    width: 100vw;
    background-color: #000;
}
.popupwrap{
    width: 50%;
    height: 61px;
    margin: 0 auto;
    display: block;
    clear: both;
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
    color: rgb(119, 158, 122);
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
}
.sliderContainer{
  display: block;
  width: 100%;
  height: 450px;
}
.sliderContainer img{
  display: block;
  height: 100vh;
  width: 100vw;
}
</style>
