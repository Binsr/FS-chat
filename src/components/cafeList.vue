<template>
    <div class="caffeListWraper">
        <div class="caffeList">
            <div class="namesOfCaffes" style="border-bottom-width:0"></div>
            <div class="namesCaffe" v-for="(names,index) in caffes" v-bind:key = index>
                <p class="namesOfCaffes">{{names.caf_name}}</p>
            </div>
            <button class="btnClose" @click="close">Close</button>
        </div>    
    </div>
</template>

<script>

export default {
     methods: {
         close(){
            this.$emit('update')
         }
    },
    name: 'cafeList',
    props: ['caffes'],
    data(){
        return{
            testa: "da",
            listOfCaffes: ["","Ledenko","Topli Caffe","Ledeni Udar","Nebeska Munja","Bugarski trotinet","Leteci Kolac","Ugrejana Pritka","Svecnjak"]
        }
    },

    mounted() {
        // console.log(this.caffes.caf_name);
    },
}
</script>

<style>
.caffeListWraper{
    display: flex;
    flex-direction: column;
}
.caffeList{
    position: fixed;
    z-index: 2;
    width: 75vw;
    height: 70vh;
    background-color: black;
    border-radius: 20px;
    display: flex;
    border-width: 7px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
.namesOfCaffes{
    font-size: 17px;
    border-style: solid;
    border-width: 0 0 3px 0;
    border-color: rgb(255, 255, 255);
    height: 10vw;
    color:white;
}
.btnClose{
    width: 40vw;
    height: 5vh;
    color: rgb(146, 83, 1);
    font-size: 20px;
    background-color: rgb(255, 255, 255);
    border-width: 0;
    border-bottom-right-radius: 20px; 
    position: fixed;
}
</style>
