import "normalize.css";
import "jquery";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "main.css";
import Welcome from "welcome.vue";
import Lobbies from "lobbies.vue";
import Game from "game.vue";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {path: "/", component: Welcome},
    {path: "/lobbies", component: Lobbies},
    {path: "/game/:id", component: Game},
]
const router = new VueRouter({
    routes, 
    mode: 'history'
});

const view = new Vue({
    el: '#wrapper',
    router
}).$mount('#wrapper')