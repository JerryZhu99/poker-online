import "normalize.css";
import "jquery";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "main.css";
import Game from "game.vue";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {path: "/", component: Game}
]
const router = new VueRouter({
    routes, 
    mode: 'history'
});

const view = new Vue({
    el: '#wrapper',
    router
}).$mount('#wrapper')