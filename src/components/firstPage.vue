<template>
    <div class="popwrap">
      <div class="sliderContainer">
        <img src="" alt="shopAdd">
      </div>
      <div class="monitor">
        <p class="textType" id="text"></p>
      </div>
      <div class="buttons">
        <button class="getInBtn" @click="toChatPage"><p class="btParagraf" id="clickme">chat</p>
        </button>
        <button class="getInBtn"><p class="btParagraf" id="konobar">pozovi konobara</p>
        </button>
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
        toChatPage () {
          clearInterval(this.interval);
          if(this.user.ip != "NOT_CONNECTED")
            router.push('/chatpage');
          else{
            this.typing();
          }
        },
        typing() {
          var i = 0;
          var j = 0;
          let text = "";
          if(this.user.ip != "NOT_CONNECTED")
            text = "Dobrodosli, odaberite opciju!                     .";
          else{
            text = "Na zalost ne postoji cet soba za mesto gde se nalazite trenutno";
          }
          const el = document.getElementById("text");
          if(this.user.ip == "NOT_CONNECTED")
            document.getElementById("text").style.color = "red";
          if(el.textContent.length != 0){
            el.textContent = "";
          }
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
            if (j % 20 == 0) {
              document.getElementById("clickme").style.color = "rgb(119, 158, 122)";
              document.getElementById("konobar").style.color = "rgb(119, 158, 122)";
            }
            if (j % 40 == 0) {
              document.getElementById("clickme").style.color = "rgb(0, 0, 0)";
              document.getElementById("konobar").style.color = "rgb(0, 0, 0)";
            }
            if (j == 40) {
              j = 0;
            }
            j++;
            i++;
          }, 90);
        },
        backgroundSlider(){
          var i = 0;
          const popwrap = document.querySelector('.popwrap');
          const images = ['/img/code-cafe.395c94cd.jpg', '/img/roll-bar.2e42ee66.jpg', '/img/witch-bar-caffe.76538e7c.jpg', '/img/witch-bar.8988a771.jpg'];
          var  img = document.querySelector('.sliderContainer img');
          img.src = images[i];
          console.log(img);
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

.sliderContainer{
  display: block;
  width: 100%;
  height: 70vh;
}
.sliderContainer img{
  display: block;
  height: 70vh;
  width: 100%;
}
 .getInBtn {
  width: 40%;
  display: block;
  float: left;
  height: 20%;
  font-size: 20px;
  margin: 20px;
  background-color: rgba(224, 20, 20, 0);
  border-radius: 100px;
  border-width: 4px;
  border-style: solid;
  border-color: rgb(119, 158, 122);
  max-height: 200px;
  max-width: 300px;
  cursor: pointer;
}
 .btParagraf {
  font-size: 26px;
  font-family: "Bangers", cursive;
  color: rgb(119, 158, 122);
}
.buttons{
  display: block;
  width: 50%;
  margin: 0 auto;
}
.monitor {
  height: 50px;
  width: 50%;
  display: flex;
  align-items: top;
  justify-content: center;
  font-family: "Righteous", cursive;
  text-align: left;
  font-size: 14px;
  margin:0 auto;
}
.textType {
  padding: 10px;
  color: rgb(119, 158, 122);
}
</style>
