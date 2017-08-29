<template>
    <div class="card" v-bind:class="{ red: (card.suit == 0 || card.suit == 2)}">
        <div class="card-front" v-if="card.value >= 0">
            <div class="card-top">
                {{card.valuestr}}
                <br> {{card.suitstr}}
            </div>
            <div class="card-center">
                {{card.suitstr}}
            </div>
            <div class="card-bottom">
                {{card.valuestr}}
                <br> {{card.suitstr}}
            </div>
        </div>
        <div class="card-back" v-else>
            
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
    .card {
        font-family: 'Oswald', sans-serif;
        padding: 5px;
        margin: 10px;
        height: 161.8px;
        width: 100px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
        background-color: #FFFFFF;
        border-radius: 10px;
    }
    .card-front{
        padding: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .card-top {
        align-self: flex-start;
    }

    .card-center {
        height: 60px;
        font-size: 50px;
        line-height: 60px;
        vertical-align: middle;
        align-self: center;
    }

    .card-bottom {
        align-self: flex-end;
        transform: rotate(180deg)
    }

    .card-back {
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