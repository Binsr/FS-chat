<template>
    <div class="caffeListWraper">
        <div class="caffeList">
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
    data(){
        return{testa: "da"}
    },
    props: {
            listOfCaffes: ["Kurac kafe","Ledeni Udar","Nebeska Munja","Bugarski trotinet","Leteci Kolac","Ugrejana Pritka"],
         }
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
    border-color: rgb(126, 71, 0);
}
.btnClose{
    width: 40vw;
    height: 5vh;
    color: white;
    font-size: 15px;
    background-color: rgb(126, 71, 0);
    border-width: 0;
    border-top-left-radius: 20px;
	position: absolute;
	bottom: 0;
    right: 0;
}
</style>
