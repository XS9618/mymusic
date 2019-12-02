<template>
    <div>
        <Nav></Nav>
        <h1>My</h1>
        <p>
            type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
        </p>
        <hr>
        <p>method=baidu.ting.song.lry&songid=877578</p>
        <p>data.billboard.name</p>
    </div>
</template>

<script>
    import Nav from "../components/Nav";
    export default {
        name: "My",
        components: {Nav},
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style scoped>

</style>
