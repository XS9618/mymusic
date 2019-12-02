<template>
    <div class="Lyric">
        <p>歌词</p>
<!--        <p>{{currentTime}}</p>-->
        <div v-if="lrcTimesArr.length" class="lrc-container">
            <div class="lrc-con" ref="lrcCon">
                <p :class="{'lrc-items':true, 'active':currentTime>=key && currentTime<lrcTimesArr[index+1]}"
                   v-for="(val,key,index) in lrcObj"
                   :key="key">&nbsp;{{ val }}{{scrollFn(index,key)}}</p>
            </div>
        </div>
        <div v-else><img :src="loading" alt=""></div>
    </div>
</template>

<script>
    import axios from 'axios'
    import loading from '../../static/loading.gif'
    export default {
        name: "Lyric",
        props:{
            currentTime:{
                type: [Number,String],
                required: true,
                lrcCon: null,
            }
        },
        data() {
            return {
                lrcObj: {},
                lrcTimesArr: [],
                loading:loading,
            }
        },
        methods: {
            scrollFn(index,key){
                // console.log(this);
                if (this.$refs.lrcCon){
                    if(this.currentTime >= key && this.currentTime<this.lrcTimesArr[index+1]){
                        //this.$refs.lrcCon.style.top = -50*(index-3) + 'px'; //通过定位滚动歌词
                        // this.$refs.lrcCon.style.transform = 'translate(0,' + -50*(index-3) + 'px)';      //通过位移滚动歌词
                        // this.$refs.lrcCon.scrollTop = 50*(index-3);
                        if (this.$refs.lrcCon.scrollTop < 50*(index-1)){    //必须判断，不然滚动效果不佳
                            $(this.$refs.lrcCon).animate({scrollTop: 50*(index-1)}, 400)
                            console.log(this.$refs.lrcCon.scrollTop);
                        }
                        if (this.$refs.lrcCon.scrollTop > 50*(index-1)){
                            let _this = this;
                            //setTimeout(()=>{
                                $(this.$refs.lrcCon).animate({scrollTop: 50*(index-1)}, 400)
                            //},1000)
                            console.log(this.$refs.lrcCon.scrollTop);
                        }
                        // $(this.$refs.lrcCon).animate({scrollTop: 50*(index-3)}, 500)
                        //this.$refs.lrcCon.style.transition= 'all 1s ease';    //定位或位移过渡
                    }
                }
            }
        },
        mounted() {
            console.log($);
            this.lrcCon = this.$refs.lrcCon;
            axios({
                type: 'get',
                url: `/req?method=baidu.ting.song.lry&songid=${this.$route.params.songid}`
            }).then(res => {
                //console.log('歌词----', res.data.lrcContent);

                let lrcContent = res.data.lrcContent.split(/\n/g); //以空格分割，转为数组
                let len = lrcContent.length
                for (let i = 0; i < len; i++) {
                    let lrcTime = lrcContent[i].match(/\[\d*:\d*(:|.)\d*\]/g);
                    let lrcText = lrcContent[i].replace(/\[\d*:\d*(:|.)\d*\]/g, '');
                    if (!lrcText){
                        lrcText = '...'
                    }
                    if (lrcTime) {
                        lrcTime = lrcTime[0].slice(1, lrcTime[0].length - 1);
                        //console.log(lrcTime)    //纯时间
                        // console.log(lrcTime.substr(0, 2) * 60);  //分钟转秒
                        // console.log(lrcTime.slice(3));   //歌词的秒
                        let lrcSeconds = (parseInt(lrcTime.substr(0, 2) * 60) + parseFloat(lrcTime.slice(3))).toFixed(2)    //时间相加----总时间
                        // console.log(lrcSeconds);
                        this.lrcObj[lrcSeconds] = lrcText;   //时间：歌词
                        this.lrcTimesArr.push(lrcSeconds);      //时间数组
                    }
                }
                console.log(this.lrcObj);
            })

        }
    }
</script>

<style scoped>
    .lrc-container {
        height: 450px;
        line-height: 50px;
        overflow: hidden;
        position: relative;
        /* background: linear-gradient(to right bottom, #ff22cf, #ccffbe); */
    }
    .lrc-con {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        margin: 0 auto;
        height: 450px;
        overflow-x: hidden;
        overflow-y: scroll;

    }
        /*滚动条样式*/
        .lrc-con::-webkit-scrollbar {/*滚动条整体样式*/
            width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 10px;
        }
        .lrc-con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .lrc-con::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }
    .lrc-con .active{
        color: #fffb00;
    }
    .lrc-items {

    }
</style>
