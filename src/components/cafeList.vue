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
    width: 74vw;
    height: 70vh;
    margin: 16vh 13vw 10vh 13vw;
    background-color: black;
    border-radius: 20px;
    display: flex;
    border-width: 7px;
    border-style: solid;
    border-color: rgb(126, 71, 0);
}
.btnClose{
    left: 30vw;
    position: fixed;
    text-align: center;
    bottom: 12vh;
    width: 40vw;
    height: 5vh;
    color: white;
    font-size: 15px;
    background-color: rgb(126, 71, 0);
    border-width: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
</style>
