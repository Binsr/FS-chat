<template>
    
</template>

<script>
export default {
    methods:{
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
    }
}
</script>

<style>

</style>
