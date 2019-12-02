<template>
    <div>
        <Nav></Nav>
        <MusicList :listName="newListName">
            <MListItem :musicInfo="newListInf">

            </MListItem>
        </MusicList>
        <MusicList :listName="hotListName">
            <MListItem  :musicInfo='hotListInf'>

            </MListItem>
        </MusicList>
        <MusicList :listName="rockListName">
            <MListItem :musicInfo='rockListInf'>

            </MListItem>
        </MusicList>
        <MySwiper :bannerImg="bannerImg"></MySwiper>
        <MyTabs></MyTabs>
    </div>
</template>

<script>
    import axios from 'axios';
    import Nav from "../components/Nav";
    import MusicList from "../components/index/MusicList";
    import MListItem from "../components/index/MListItem";
    import MySwiper from "../components/MySwiper";
    import img1 from '../assets/img/b1.jpg'
    import img2 from '../assets/img/b2.jpg'
    import img3 from '../assets/img/b3.jpg'
    import MyTabs from "../components/MyTabs";
    export default {
        name: "Index",
        components: {MyTabs, MySwiper, MListItem, MusicList, Nav},
        data() {
            return {
                newListName: '',
                hotListName: '',
                rockListName: '',
                newListInf: [],
                hotListInf: [],
                rockListInf: [],
                bannerImg: [img1,img2,img3],
            }
        },
        methods: {},
        created() {
            axios({
                methods: 'get',
                url: '/req?method=baidu.ting.billboard.billList&type=1&size=6&offset=0',
            })
                .then(res => {
                    //console.log(res);
                    this.newListName = res.data.billboard.name
                    this.newListInf = res.data.song_list
                })
            axios({
                methods: 'get',
                url: '/req?method=baidu.ting.billboard.billList&type=2&size=6&offset=0',
            })
                .then(res => {
                    //console.log(res);
                    this.hotListName = res.data.billboard.name
                    this.hotListInf = res.data.song_list
                })
            axios({
                methods: 'get',
                url: '/req?method=baidu.ting.billboard.billList&type=11&size=6&offset=0',
            })
                .then(res => {
                    //console.log(res);
                    this.rockListName = res.data.billboard.name
                    this.rockListInf = res.data.song_list
                })
        },
        mounted(){
            let Person = {}
            let temp = null
            Object.defineProperty(Person, 'name', {
            get: function () {
                return temp
            },
            set: function (val) {
                temp = val
            }
            })
            Person.name = 'jack'
            console.log(Person.name);
        }
    }
</script>

<style scoped>

</style>
