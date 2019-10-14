
// KAD SE VIDIMO VIDACE OBJASNI MI POCICIONIRANJE PARETNT CHILD MARGIN: 0 AUTO I TAKO TO
<template>
  <div class="tatko">
    <div class="wrap">
      <header>
        <h1 class="title"><span class="thisIsPart">this is</span>
          <br><span class="titleFSpart">F - S </span>
          <span class="areaPart"><br> App</span>
        </h1>
      </header>
      <div class="monitor">
        <p class="textType" id="text"></p>
      </div>
      <button class="getInBtn" @click="toChatPage"><p class="btParagraf" id="clickme">get in</p>
        <div class="imageShip">
          <img src="../assets/mainlogo.jpg"/>
        </div>
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
        interval:null
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
.tatko{
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
}
.wrap{
    width: 100vw;
    height: 100vh;
}


header {
  background: linear-gradient(
    #000000,
    rgb(41, 41, 41),
    rgb(28, 196, 6),
    #000000
  );
  height: 200px; /* Deo za promenu  */
  font-size: 20px;
  font-family: "Righteous", cursive, "Ultra", serif;
  width: 100%;
}

/* TITLE EDIT PART
------------------------------------*/
.title {
  text-align: center;
  padding-top: 4%;
}

.thisIsPart {
  color: rgb(65, 177, 0);
  text-shadow: 2px 2px rgb(0, 0, 0);
}

.titleFSpart {
  color: rgb(255, 255, 255);
  font-family: "Bangers", cursive;
  text-shadow: 2px 2px black;
}
.areaPart {
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px rgb(11, 114, 2);
}

/* ----------------------------------*/

.monitor {
  height: 200px;
  width: 200px;
  display: flex;
  align-items: top;
  justify-content: flex-start;
  border-radius: 10%;
  border-width: 8px;
  border-style: solid;
  border-color: rgb(55, 56, 54);
  font-family: "Righteous", cursive;
  text-align: left;
  font-size: 14px;
  background-image: url(../assets/monitor.png);
  margin-top: 10%;
  margin:0 auto;
  margin-top: 10%;
}
.textType {
  padding: 10px;
  color: rgb(157, 255, 0);
}
.getInBtn {
  align-content: center;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  font-size: 20px;
  margin: 5px auto;
  background-color: rgba(224, 20, 20, 0);
  border-radius: 10px;
  border-width: 8px;
  border-style: solid;
  border-color: rgb(255, 0, 0);
  max-height: 200px;
  max-width: 300px;
}
.btParagraf {
  float: left;
  font-size: 35px;
  font-family: "Bangers", cursive;
  color: rgb(255, 0, 0);
  padding-top: 2%;
}
.imageShip {
  float: right;
  margin-right: 5%;
  margin-left: 20px;
}


</style>
