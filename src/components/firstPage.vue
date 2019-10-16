
// KAD SE VIDIMO VIDACE OBJASNI MI POCICIONIRANJE PARETNT CHILD MARGIN: 0 AUTO I TAKO TO
<template>
  <div class="tatko">
    <div class="wrap">
      <header>
        <div class="imageShip">
          <img src="../assets/mainlogo.jpg"/>
        </div>
        <h1 class="title"><span class="thisIsPart">this is</span>
          <br><span class="titleFSpart">Friend - Sheep </span>
          <span class="areaPart"><br> App</span>
        </h1>
      </header>
      <div class="monitor">
        <p class="textType" id="text"></p>
      </div>
      <button class="getInBtn" @click="toChatPage"><p class="btParagraf" id="clickme">get in</p>
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
<<<<<<< HEAD
          let text = "";
          if(this.user.ip != "NOT_CONNECTED")
            text = "...Dobrodosli na Friend-Sheep App!....                     .";
          else{
            text = "Na zalost ne postoji cet soba za mesto gde se nalazite trenutno";
          }
=======
          const text = "...Poskupeli prilozi u poncu sa 30 na 50 din i pice i sendvici isto...";
>>>>>>> 34a05ee4d95580cb4d558bdd86a7708b18951ab3
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

.monitor {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: top;
  justify-content: center;
  font-family: "Righteous", cursive;
  text-align: left;
  font-size: 14px;
  margin:0 auto;
  margin-top: 10%;
}
.textType {
  padding: 10px;
  color: rgb(119, 158, 122);
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
  border-radius: 100px;
  border-width: 4px;
  border-style: solid;
  border-color: rgb(119, 158, 122);
  max-height: 200px;
<<<<<<< HEAD
  max-width: 300px;
=======
  cursor: pointer;
>>>>>>> 34a05ee4d95580cb4d558bdd86a7708b18951ab3
}
.btParagraf {
  float: left;
  font-size: 35px;
  font-family: "Bangers", cursive;
  color: rgb(119, 158, 122);
  padding-top: 2%;
}


</style>
