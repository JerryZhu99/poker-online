<template>
    <div class="playing-card" v-bind:class="{ red: (card.suit == 0 || card.suit == 2)}">
        <div class="playing-card-front" v-if="card.value >= 0">
            <div class="playing-card-top">
                {{card.valuestr}}
                <br> {{card.suitstr}}
            </div>
            <div class="playing-card-center">
                {{card.suitstr}}
            </div>
            <div class="playing-card-bottom">
                {{card.valuestr}}
                <br> {{card.suitstr}}
            </div>
        </div>
        <div class="playing-card-back" v-else>
            
        </div>
    </div>
</template>
<script>
    export default {
        props: ['card'],
    }
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Oswald');
    *{
        box-sizing: border-box;
    }
    .playing-card {
        font-family: 'Oswald', sans-serif;
        padding: 5px;
        margin: 10px;
        height: 161.8px;
        width: 100px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
        background-color: #FFFFFF;
        border-radius: 10px;
    }
    .playing-card-front{
        padding: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .playing-card-top {
        align-self: flex-start;
        flex: 1 1;
    }

    .playing-card-center {
        height: 60px;
        font-size: 50px;
        line-height: 60px;
        margin: -40px 0;
        vertical-align: middle;
        align-self: center;
        flex: 1 1;
    }

    .playing-card-bottom {
        align-self: flex-end;
        flex: 1 1;
        transform: rotate(180deg)
        
    }

    .playing-card-back {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: #EE3333;
        background-image: repeating-linear-gradient(60deg, transparent 0px, transparent 8px, #ee8888 8px, #ee8888 10px, transparent 10px), repeating-linear-gradient(120deg, transparent 0px, transparent 8px, #ee8888 8px, #ee8888 10px, transparent 10px)
    }

    .red {
        color: red;
    }
</style>