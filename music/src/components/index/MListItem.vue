<template>
    <div v-if="musicInfo.length" class="MListItem-con">
        <router-link class="MListItems" :to="{name:'Player',params:{'songid':ele.song_id}}"
                     v-for="(ele,index) in musicInfo" :key="index">
            <div class="list-img"><img :src="ele.album_1000_1000" alt=""></div>
            <div class="songs-name">{{ele.title}}</div>
            <div class="songs-author">{{ele.author}}</div>
        </router-link>
    </div>
    <div v-else>
        <img :src="loading" alt="">
    </div>
</template>

<script>
import loading from '../../../static/loading.gif'
    export default {
        name: "MListItem",
        props: {
            musicInfo: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                loading:loading,
            }
        },
        methods: {},
    }
</script>

<style scoped>
    .MListItem-con {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        box-sizing: border-box;
        flex-wrap: wrap;
    }

    .MListItems {
        display: inline-block;
        box-sizing: border-box;
        padding: 0 3px;
        width: 33.3%;
        /* height: 194px; */
    }

    .list-img {
        width: 100%;
       margin: 5px 0;
    }

    .list-img img {
        width: 100%;
        height: 100%;
        border-radius: 5%;
    }

    .songs-name, .songs-author {
        width: 100%;
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }

    .songs-name {
        color: #000
    }

    .songs-author {
        color: #888;
        font-size: 12px
    }
</style>
