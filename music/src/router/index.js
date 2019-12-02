import Vue from 'vue'
import Router from 'vue-router'
import Index from "../pages/Index";
import My from "../pages/My";
import Singer from "../pages/Singer";
import Search from "../pages/Search";
import Player from "../pages/Player";


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/my',
            name: 'My',
            component: My
        },
        {
            path: '/singer',
            name: 'Singer',
            component: Singer
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/player/:songid',
            name: 'Player',
            component: Player
        },
    ]
})
