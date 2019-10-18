
// KAD SE VIDIMO VIDACE OBJASNI MI POCICIONIRANJE PARETNT CHILD MARGIN: 0 AUTO I TAKO TO
<template>
  <div class="tatko">
    <div class="headerText"> <!--TextType -->
      <div class="headerTextContainer">
        <p>#</p>
        <p id="text">F-S   "get to know Area"</p>
      </div>
    </div>
    <div class="imagesContainer">
      <div v-for="(image,index) in images" v-bind:key="index" >
       <img class="images" :src='imagesBuild(image.slika)'>
       <p class="tagovi">{{image.tag}}</p>
      </div>
    </div>
      <div class="btnContainer">
        <button class="chatBtn" @click="toChatPage"><p class="btParagraf" id="clickme">Chat</p>
        </button>
        <button class="meniBtn"><p class="btParagraf">Menu</p>
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
        images:
        [{"slika":"www.yorkshireeveningpost.co.uk/images-a.jpimedia.uk/imagefetch/http://www.lep.co.uk/webimage/1.9969596!image/image",
          "tag":"#Beograd #VeseliKafe"},
          {"slika":"www.officelovin.com/wp-content/uploads/2014/10/google-campus-tel-aviv-h2",
          "tag":"#Nis #BeerRes"},
          {"slika":"alwayshungry.ph/wp-content/uploads/2016/10/8be33d0f41db2eae6ac5d316c8bba8e2_1475770150",
          "tag":"#Zajecar #KafeCaffe"},
          {"slika":"www.cafesunflower.com/wp-content/uploads/2015/07/Buckhead-Main-Dining-Room-01",
          "tag":"#Pozarevac #BluePlace"}
        ]
      }
    },
    methods: {
      ...mapActions(['addUsername','client','user']),
        typing() {
          var i = 0;
          var j = 0;
          let text = "";
          if(this.user.ip != "NOT_CONNECTED")
            text = "Videcemo";
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
              document.getElementById("clickme").style.color = "rgb(255, 255, 255)";
            }
            if (j % 40 == 0) {
              document.getElementById("clickme").style.color = "rgb(0, 0, 0)";
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
        },
        imagesBuild(img){
          return ('https://' + img + '.jpg');
        }
    },
    mounted() {
          // this.typing();
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
.tatko{
  display: flex;
  background-color: rgb(0, 0, 0);
}

.headerText {
  display: flex;
  width: 100vw;
  background-color: rgb(179, 77, 29);
  border-style: solid;
  border-color: white;
  border-width: 0 0 3px 0;
  top: 0;
  position: fixed;
  z-index: 1;
  color:white;
    font-family: "Bangers", cursive;
  font-size: 20px;
}
.headerTextContainer{
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.imagesContainer{
  display: flex;
  align-content: center;
  flex-direction: column;
 /* TESTIRAJ NA CHAT PAGE ZA  CHAT DA SE OSIGURAS  */
  margin: 15vh auto 15vh auto;
}
.images{
  display: block;
  width: 80vw;
  height: 60vh;
}
.tagovi{
  color: white;
  font-size: 15px;
}
.btnContainer{
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  text-align: center;
  background-color: rgb(179, 77, 29);
}
.chatBtn {
  width: 50vw;
  height: 10vh;
  font-size: 40px;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  border-color: rgb(255, 255, 255);
  text-align: center;
  font-family: "Bangers", cursive;
  border-right-style: solid;
  border-width: 3px 3px 0 0;
}
.meniBtn{
  width: 50vw;
  height: 10vh;
  font-size: 40px;
  background-color: rgba(255, 255, 255, 0);
  border-width: 3px 0 0 0;
  border-color: white;
  color: rgb(255, 255, 255);
  font-family: "Bangers", cursive;
}
.btParagraf{
  margin: 0 auto;
}


</style>
