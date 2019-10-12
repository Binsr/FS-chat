
// KAD SE VIDIMO VIDACE OBJASNI MI POCICIONIRANJE PARETNT CHILD MARGIN: 0 AUTO I TAKO TO
<template>
<div class="tatko">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" type="image/ico" href="resources/logo.jpg"/>
        <link href="https://fonts.googleapis.com/css?family=Shojumaru&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet"> 
        <link href="https://fonts.googleapis.com/css?family=Righteous&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Bangers&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Ultra&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/startPage.css">
        <link rel="stylesheet" href="css/chatPage.css">
        <title>Friend-Sheep Area</title>
        </head>
        <body>
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
                    <button class="button" @click="changeGot"><p class="btParagraf" id="clickme">get in</p>
                        <div class="imageShip">
                            <img src="../assets/mainlogo.jpg"/>
                        </div>
                    </button>
                </div>
        </body>
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
      ...mapActions(['addUsername']),
        typing() {
          var i = 0;
          var j = 0;
          const text = "...OVO JE BRANCH MASTER. . . . . ....";
          const el = document.getElementById("text");
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
        changeGot () {
          //console.log(this.interval)
          clearInterval(this.interval);
          router.push('/chatpage');
        }
    },
    mounted() {
        this.typing();
    },
    computed: {
      ...mapState([]),
    }
}
</script>

<style>
.tatko{
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
}
.wrap{
    width: 500px;
}

body {
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
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
  font-size: 16px;
  background-image: url(../assets/monitor.png);
  margin-top: 10%;
  margin:0 auto;
  margin-top: 10%;
}
.textType {
  padding: 10px;
  color: rgb(157, 255, 0);
}
.button {
  align-content: center;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  font-size: 20px;
  background-color: rgba(224, 20, 20, 0);
  border-radius: 10%;
  border-width: 8px;
  border-style: solid;
  border-color: rgb(255, 0, 0);
  max-height: 200px;
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

/* ``````````````````````````````````````````````````RESPONSIVE``````````````````````````````````````````````````` */

@media screen and (max-width: 320px) {
  body {
    width: 320px;
  }
}

@media screen and (max-width: 360px) {
  body {
    width: 360px;
  }
}

@media screen and (max-width: 375px) {
  body {
    width: 375px;
  }
}

@media screen and (max-width: 384px) {
  .monitor {
    margin-top: 5%;
  }
  body {
    width: 400px;
  }
}
@media screen and (max-width: 414px) {
  .monitor {
    margin-bottom: 10px;
  }
  body {
    width: 414px;
  }
}
@media screen and (max-width: 480px) {
  .monitor {
    margin-bottom: 10px;
  }
  body {
    width: 480px;
  }
}

@media screen and (min-width: 600px) {
  header {
    font-size: 25px;
  }
  body {
    width: 600px;
  }
  .button {
    width: 360px;
    height: 150px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
