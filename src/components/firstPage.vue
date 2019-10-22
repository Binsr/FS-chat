
<template>
  <div class="tatko">
    <div class="headerText"> <!--TextType -->
      <div class="headerTextContainer">
        <p>#</p>
        <p id="text">F-S "get to know" Area</p>
      </div>
    </div>
    <div class="imagesContainer">
      <cafeList :caffes="caffeNames" class="cafeList" v-if="showCaffeList" @update="showCaffeList = false"></cafeList>
      <div v-for="(image,index) in images" v-bind:key="index" >
       <img class="images" :src='imagesBuild(image.slika)'>
       <p class="tagovi">{{image.tag}}</p>
      </div>
    </div>
      <div class="btnContainer">
        <button class="chatBtn" @click="toChatPage"><p class="btParagraf" id="clickme">Chat</p>
        </button>
        <button class="meniBtn" @click="this.showCaffes"><p class="btParagraf">List of F-S Areas</p>
      </button>
      </div>
  </div>
</template>

<script>
import router from "../router.js"
import api from '../api'
import { mapState, mapActions } from "vuex"
import cafeList from './cafeList.vue'

export default {
    components: {
      cafeList
    },
    data() {
      return{
        caffeApi:true,
        caffeNames: "",
        showCaffeList: false,
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
      ...mapActions(['addUsername','client']),

        showCaffes(){
          if(this.caffeApi){
            api.getCaffeNames().then(Response => {
              this.caffeNames = Response.data.caffes;
              console.log(this.caffeNames);
            });
            this.caffeApi = false;
          }
          this.showCaffeList = true;
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
        },
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
  text-align: left;
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
  font-size: 30px;
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
  font-size: 25px;
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
