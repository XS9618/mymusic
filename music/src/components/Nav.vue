<template>
    <div>
        <div>
            <el-menu
                :default-active="$route.path"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color='#fff'
                text-color="#000"
                router
                active-text-color="#ff3333">
                <el-menu-item class="nav-item" index="/">
                    首页
                </el-menu-item>
                <el-menu-item class="nav-item" index="/singer">
                    歌手
                </el-menu-item>
                <el-menu-item class="nav-item" index="/my">
                    我的
                </el-menu-item>
                <el-menu-item class="nav-item" index="/search">
                    搜索
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    // import
    export default {
        name: "Nav",
        data() {
            return {}
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key);
            }
        },
    }
</script>

<style scoped>

    .nav-item {
        height: 45px;
        line-height: 45px;
        width: 25%;
    }
</style>
