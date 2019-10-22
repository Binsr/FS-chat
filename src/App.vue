<template>
  <div id="app" class="wholePage">
    <router-view>
    </router-view>
    <!-- <chatPage v-if="gotIn" />
    <firstPage v-if="!gotIn"/>  -->
  </div>
</template>

<script>
import router from './router.js'
import chatPage from './components/chatPage.vue'
import firstPage from './components/firstPage.vue'
import api from './api'
import store from './store'
import { mapState, mapActions } from "vuex"

export default {
  data(){
    return{

    }
  },
  computed: {
  ...mapState(["gotIn",'messages']),
  },
  name: 'app',
  components: {
    chatPage,
    firstPage
  },
  methods:{
    ...mapActions(['addMessages','disconnectWS']),

  },
  mounted () {
    //router.push('/');
    api.getmessages().then(response => {
          console.log(response.data)
          this.addMessages(response.data.messages)
      });
  },
  beforeDestroy(){
    this.disconnectWS()
  }
}
</script>

<style>
textarea:focus, input:focus, button:focus{
    outline: none;
}
body{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.wholePage{
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}

</style>
