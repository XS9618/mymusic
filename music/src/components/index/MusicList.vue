<template>
    <div class="MusicList">
        <div class="list-header clear">
            <div class="list-title"><h3>{{listName}}</h3></div>
            <div class="list-more"><a href="javascript:">更多</a></div>
        </div>
        <div class="list-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MusicList",
        props:{
            listName:{
                type:String,
                required: true
            }
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style scoped>
    a{
        color: #000;
    }
    .list-title {
        height: 25px;
        line-height: 25px;
        float: left;
        border-left: 4px solid #ff5500;
        padding-left: 8px;
    }
    .list-more {
        float: right;
    }
    .list-header{
        margin-top: 8px;
        margin-bottom: 12px;
    }
    .list-body{

    }

</style>
