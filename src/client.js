import "normalize.css";
import "jquery";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "main.css";
import Welcome from "welcome.vue";
import Games from "games.vue";
import Game from "game.vue";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {path: "/", component: Welcome},
    {path: "/games", component: Games},
    {path: "/game/:id", component: Game, props: true},
]
const router = new VueRouter({
    routes, 
    mode: 'history'
});

const view = new Vue({
    el: '#wrapper',
    router
}).$mount('#wrapper')