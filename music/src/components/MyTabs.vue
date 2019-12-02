<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch=true>
        <el-tab-pane label="流行榜" name="first">
            <TabsMList :MusicInf="popMusic"></TabsMList>
        </el-tab-pane>
        <el-tab-pane label="欧美榜" name="second">
            <TabsMList :MusicInf="europeMusic"></TabsMList>
        </el-tab-pane>
        <el-tab-pane label="经典老歌" name="third">
            <TabsMList :MusicInf="oldMusic"></TabsMList>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import {Tabs, TabPane} from 'element-ui'
    import TabsMList from "./index/TabsMList";
    Vue.use(Tabs)
    Vue.use(TabPane)
    export default {
        name: "MyTabs",
        components: {TabsMList},
        data() {
            return {
                activeName: 'first',
                popMusic: [],
                europeMusic: [],
                oldMusic: [],
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        mounted() {
            axios({
                methods: 'get',
                url: '/req?method=baidu.ting.billboard.billList&type=16&size=6&offset=0',
            })
                .then(res => {
                    //console.log(res);
                    // this.newListName = res.data.billboard.name
                    this.popMusic = res.data.song_list
                })
            //欧美榜
            axios({
                methods: 'get',
                url: '/req?method=baidu.ting.billboard.billList&type=21&size=6&offset=0',
            })
                .then(res => {
                    //console.log(res);
                    // this.newListName = res.data.billboard.name
                    this.europeMusic = res.data.song_list
                })
            //老歌榜
            axios({
                methods: 'get',
                url: '/req?method=baidu.ting.billboard.billList&type=22&size=6&offset=0',
            })
                .then(res => {
                    //console.log(res);
                    // this.newListName = res.data.billboard.name
                    this.oldMusic = res.data.song_list
                })
        }
    }
</script>

<style scoped>

</style>
