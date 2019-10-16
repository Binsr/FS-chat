
// KAD SE VIDIMO VIDACE OBJASNI MI POCICIONIRANJE PARETNT CHILD MARGIN: 0 AUTO I TAKO TO
<template>
  <div class="tatko">
    <div class="images" v-for="image in images">
     <img v-bind:src ="image" alt="cafeAdd">
     </div>
    <div class="wrap">
      <div class="monitor">
        <p class="textType" id="text"></p>
      </div>
      <button class="getInBtn" @click="toChatPage"><p class="btParagraf" id="clickme">get in</p>
      </button>
      <button class="getInBtn"><p class="btParagraf" id="konobar">call</p>
      </button>
    </div>
  </div>
</template>

<script>
import router from "../router.js"
import api from '../api'
import { mapState, mapActions } from "vuex"

export default {
    name: "startPage",
    data() {
      return{
        interval:null,
        images:['/img/1.76538e7c.jpg','/img/2.8988a771.jpg','/img/3.395c94cd.jpg','/img/4.2e42ee66.jpg']
      }
    },
    methods: {
      ...mapActions(['addUsername','client','user']),
        typing() {
          var i = 0;
          var j = 0;
          let text = "";
          if(this.user.ip != "NOT_CONNECTED")
            text = "...Dobro u FS kafic....                     .";
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
              document.getElementById("clickme").style.color = "rgb(255, 0, 0)";
              document.getElementById("konobar").style.color = "rgb(255, 0, 0)";
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
        toChatPage () {
          clearInterval(this.interval);
          if(this.user.ip != "NOT_CONNECTED")
            router.push('/chatpage');
          else{
            this.typing();
          }
        }
    },
    mounted() {
          this.typing();
    },
    computed: {
      ...mapState(['user']),
    },
    beforeDestroy() {
      clearInterval(this.interval);
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
.wrap{
  position: fixed;
  bottom: 10vh;
  width: 50% !important;
  margin: 0 auto;
}
.images{
  display: block;
  width: 100%;
}
.images img{
  display: block;
  width: 80vw;
  height: 50vh;
  margin: 0 auto;
}
</style>
