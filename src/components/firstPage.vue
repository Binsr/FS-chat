
// KAD SE VIDIMO VIDACE OBJASNI MI POCICIONIRANJE PARETNT CHILD MARGIN: 0 AUTO I TAKO TO
<template>
  <div class="tatko">
    <div class="textType">
      <p>#</p>
      <p id="text"></p>
    </div>
    <div class="imagesContainer">
      <img class="images" v-for="(image,index) in images" v-bind:key="index" :src="image.url" :alt="image.alt">
    </div>
      <div class="btnContainer">
        <button class="chatBtn" @click="toChatPage"><p class="btParagraf" id="clickme">Cet</p>
        </button>
        <button class="meniBtn"><p class="btParagraf">Meni</p>
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
        images:[{url:'../assets/witch-bar.jpg'},{url:'../assets/witch-bar-caffe.jpg'},{url:'../assets/white_clip.png'},{url:'../assets/roll-bar.jpg'}]
      }
    },
    methods: {
      ...mapActions(['addUsername','client','user']),
        typing() {
          var i = 0;
          var j = 0;
          let text = "";
          if(this.user.ip != "NOT_CONNECTED")
            text = "Dobro u FS kafic#";
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
.tatko{
  display: flex;
  background-color: #000;
}

.textType {
  display: flex;
  width: 100vw;
  background-color: white;
  top: 0;
  position: fixed;
  z-index: 1;
  color: rgb(119, 158, 122);
  font-size: 15px;
  align-content: center;
}

.imagesContainer{
  display: flex;
  align-content: center;
  flex-direction: column;
  margin-top: 5vh; /* TESTIRAJ NA CHAT PAGE ZA  CHAT DA SE OSIGURAS  */
  margin: 0 auto;
}
.images{
  display: block;
  width: 60vw;
  height: 30vh;
}
.btnContainer{
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  text-align: center;
}
.chatBtn {
  width: 50vw;
  height: 10vh;
  font-size: 40px;
  background-color: rgb(255, 255, 255);
  border-color: rgb(119, 158, 122);
  text-align: center;
}
.btParagraf{
  margin: 0 auto;
}
.meniBtn{
  width: 50vw;
  height: 10vh;
  font-size: 40px;
  background-color: white;
  color: #000;
}

</style>
