<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Title</h1>
            </div>
        </div>
        <div class="column">
            <div class="col">
                <ul class="list-group">
                    <router-link tag="li" :to="`/game/${game}`" class="list-group-item" v-for="game in games">
                        id: {{game}}
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import socket from "network";
export default {
    data: ()=>({
        games: [],
    }),
    created(){
        let view = this;
        socket.on("games", function(data){
            view.games = data;
        })
    }
}
</script>

<style>

</style>
