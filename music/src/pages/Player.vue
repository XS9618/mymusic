<template>
    <div class="Player" :style="backgroundImg">
        <div class="palyer-header">
            <div>
                <i class="iconfont" @click="backHome">&#xe8ff;</i>
            </div>
            <div class="palyer-header-center">
                <span>{{songData.title}}</span>
                <p>{{songData.author}}</p>
            </div>
            <div>
                <i class="iconfont">&#xe752;</i>
            </div>
        </div>
        <div v-show="songData.pic_big" class="palyer-body">
            <img ref="musicImg" :src="songData.pic_big" alt="">
            <p @click="playControl" ref="imgControl" class="controlPlayer"></p>
        </div>
        <div class="middle">
            <Lyric :currentTime="currentTime"></Lyric>
        </div>
        <div class="myaudio">
           <div ref="myLine" class="line">
               <div @mousedown="circledowm($event)" 
                    @touchstart="down($event)"
                    @touchmove="move($event)"
                    @touchend="end($event)"
                    ref="circle" class="circle"></div>
               <div ref="curLine" class="line-2"></div>
           </div>
           <div class="myaudio-control">
               <div></div>
               <div @click="playControl" ref="mycontrol"></div>
               <div></div>
           </div>
        </div>
        <div class="palyer-audio">
            <audio :src="songLink"  autoplay ref="myAudio"></audio>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Lyric from "../components/Lyric";

    export default {
        name: "Player",
        components: {Lyric},
        data() {
            return {
                songData: {},
                songLink: '',
                currentTime: 0,
                rdeg: 0,
                interval: null,//定时器
                stopR: true,    //控制计时器触发，点击进度条会误触两次播放事件
                backgroundImg: '',
                flags: false,   //移动端触摸判断
                movex: "",      //移动端移动位置
                stylex: "",     //控制跟随播放器样式
            }
        },
        methods: {
            backHome(){
                window.history.back()
            },
            musicRfun(){
                let that = this;
                let musicImg = this.$refs.musicImg;
                var myAudio = this.$refs.myAudio;
                that.interval = setInterval(function () {
                    that.rdeg = that.rdeg + 0.2;
                    musicImg.style.transform = 'rotate('+that.rdeg+'deg)';
                    /* that.$refs.circle.style.left=(myAudio.currentTime/myAudio.duration).toFixed(2)*100 + '%'; */
                }, 10);
            },
            //播放暂停控制按钮事件
            playControl(){
                if(this.$refs.myAudio.paused){      //当前暂停状态  为 true
                    this.$refs.myAudio.play();
                    this.$refs.imgControl.style.backgroundPosition = '-24px 0';
                    this.$refs.mycontrol.style.backgroundPosition = '-24px 0';
                }else{
                     this.$refs.myAudio.pause();
                     this.$refs.imgControl.style.backgroundPosition = '5px 0';
                     this.$refs.mycontrol.style.backgroundPosition = '5px 0';
                }
                
            },
            //进度条拖拽事件
                /* 1. 给需要拖拽的节点绑定mousedown, mousemove, mouseup事件 
                2. mousedown事件触发后，开始拖拽 
                3. mousemove时，需要通过event.clientX和clientY获取拖拽位置，
                并实时更新位置 
                4. mouseup时，拖拽结束 
                5. 需要注意浏览器边界的情况
                */
            circledowm(e){
                var that = this
                let offsetX = this.$refs.circle.style.left; // 获取当前的x轴距离
                let innerX = e.clientX - offsetX; // 获取鼠标在方块内的x轴距
                let circle = this.$refs.circle;
                let myAudio = this.$refs.myAudio;
                console.log(offsetX);
                // console.log(e.clientX);
                // console.log(document.body.clientWidth);
                console.log(e.clientX/document.body.clientWidth);
                // console.log(document.body.offsetWidth);
                // console.log(window.screen.width);
                // console.log(window.screen.availWidth);
                console.log('鼠标按下，开始拖拽',innerX);
                document.onmousemove = e => {
                    console.log( this.stylex);
                    console.log(e.layerY,'e.layerY');
                    console.log(document.body.clientWidth,'document.body.clientWidth');
                    this.stylex = ((e.clientX-50)/this.$refs.myLine.offsetWidth).toFixed(8)*100;
                    if(parseInt(this.stylex) >= 100){
                        this.stylex = '100%';
                    }
                    console.log(this.stylex);
                    circle.style.left = this.stylex + '%';   //圆点位置
                    that.$refs.curLine.style.width= this.stylex + '%';   //横线位置
                }

                document.onmouseup = e => {
                    console.log('鼠标已抬起');
                    document.onmousemove = null;
                         //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
                    document.onmouseup = null;
                    console.log(this.stylex);
                    let audioCurTime = myAudio.duration*this.stylex/100
                    myAudio.currentTime = audioCurTime;     //改变音频的当前时间
                    circle.style.left = this.stylex + '%';
                    that.$refs.curLine.style.width = this.stylex + '%';
                }
            },  
            
            down(event) {
                console.log('移动端开始触摸');
                this.flags = true;
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }   
            },
            move(event) {
                console.log('移动端开始滑动');
                event.preventDefault();
                if (this.flags) {
                    var touch;
                    if (event.touches) {
                    touch = event.touches[0];
                    } else {
                    touch = event;
                    }
                    this.movex = touch.clientX - 50;
                    this.stylex = (this.movex/this.$refs.myLine.offsetWidth*100).toFixed(8)
                    if(parseInt(this.stylex) <= 0){
                        this.stylex = 0
                    }else if(parseInt(this.px) >= 100){
                        this.stylex = 100
                    }
                    this.$refs.circle.style.left = this.stylex + '%'
                    this.$refs.curLine.style.width = this.stylex + '%'

                    //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
                    document.addEventListener(
                    "touchmove",
                    function() {
                        // event.preventDefault();
                    },
                    false
                    );
                }
            },
            //鼠标释放时候的函数
            end() {
                console.log('移动端抬起手指');
                let myAudio = this.$refs.myAudio
                let audioCurTime = myAudio.duration*this.stylex/100
                myAudio.currentTime = audioCurTime;     //改变音频的当前时间
                this.flags = false;
            }
        },
        computed:{

        },
        beforeMount() {
            //console.log(this.$route.params.songid);
            axios({
                type: 'get',
                url: `/req?method=baidu.ting.song.play&songid=${this.$route.params.songid}`,
            }).then(res => {
                console.log(res);
                this.songData = res.data.songinfo
                localStorage.setItem('curSongData',JSON.stringify(this.songData))
                localStorage.setItem('curSongLink',res.data.bitrate.file_link)
                this.songLink = localStorage.getItem('curSongLink')
                this.backgroundImg = {
                    backgroundImage:"url("+res.data.songinfo.pic_big+")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }
            })
        },
        mounted() {
            //console.log(this.$refs.myAudio);
            console.log('mounted');
            console.log(new Date().toLocaleDateString().replace(/\//g,'-'));
            this.$refs.imgControl;
        },
        updated() {
            let myAudio = this.$refs.myAudio;
            // let musicImg = this.$refs.musicImg;
            let _this = this;
            if (myAudio.paused){    //音乐暂停
                //musicImg.style.transform = 'rotate('+_this.rdeg+'deg)';
                console.log('已经暂停');
                clearInterval(_this.interval)
            }else {     //音乐播放
                // console.log('正在播放');    //一直触发
                // _this.musicRfun();
            }

            myAudio.onplaying = function(){
                console.log('ontimeupdate--------正在播放');
                console.log(_this.stopR);
                _this.$refs.imgControl.style.backgroundPosition = '-24px 0';
                _this.$refs.mycontrol.style.backgroundPosition = '-24px 0';
                if (_this.stopR){
                    _this.musicRfun();      //执行计时器，开始旋转
                }
                _this.stopR = false         //控制图片是否旋转
            },
            myAudio.onpause = function(){
                _this.stopR = true
                console.log('onpause---------已经暂停');
                clearInterval(_this.interval)
                _this.$refs.imgControl.style.backgroundPosition = '5px 0';
                _this.$refs.mycontrol.style.backgroundPosition = '5px 0';
            },
            myAudio.ontimeupdate = function () {
                _this.currentTime = myAudio.currentTime
                console.log(myAudio.duration);
                console.log(myAudio.currentTime);
                let curTime = (myAudio.currentTime/myAudio.duration).toFixed(8)*100 + '%';
                _this.$refs.circle.style.left = curTime;
                _this.$refs.curLine.style.width = curTime;
            }
        }
    }
</script>

<style scoped>
.Player{
    /* background: linear-gradient(to right bottom, #ff22cf, #e1ffbe); */
    background-size: cover;
    height: 100%;
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.myaudio{
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 50px auto 0;
    padding: 0 50px;
}
.line{
    border-top: 2px solid #aaa;
    border-bottom: 2px solid #ccc;
    position: relative;
}
.line-2{
    border-top: 2px solid #F5B242;
    border-bottom: 2px solid #F6C770;
    position: absolute;
    top: -2px;
    left: 0;
    width: 0%;
}
.circle{
    height: 8px;
    width: 8px;
    border: 2px solid #F5B242;
    border-radius: 50%;
    position: absolute;
    top: -6px;
    left: 0%;
    z-index: 66;
    background: #fff;
    cursor: move;
}
.myaudio-control{
    width: 60%;
    margin: 10px auto 0;
    display: flex;
    justify-content: space-around;
    vertical-align: middle;
}
.myaudio-control>div{
    margin: 5px;
    display: inline-block;
    height: 22px;
    width: 22px;
    background-color: #ff22cf;
    background: url('../../static/player.png') no-repeat;
}
.myaudio-control>div:nth-child(2){
    height: 30px;
    width: 30px;
    background-position: 5px 0;
}
.myaudio-control>div:nth-child(1){
    margin-top: 8px;
    background-position: 5px -30px;
}
.myaudio-control>div:nth-child(3){
    margin-top: 8px;
    background-position: 2px -52px;
}
    .palyer-header {
        display: flex;
        justify-content: space-around;
        height: 45px;
        line-height: 45px;
        padding-top: 5px;
        color: #fff;
    }
    .palyer-header>div{
        flex: 1;
    }
    .palyer-header>div>i{
        font-size: 24px;
    }
    .palyer-header-center{
        flex: 1;
        line-height: 22px;
        padding: 0 5px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .palyer-header-center p,.palyer-header-center span{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 20px;
    }
    .palyer-body{
        width: 100%;
        position: absolute;
        top: 50px;
    }
    .middle{
        width: 100%;
        position: absolute;
        top: 200px;
        bottom: 54px;
        overflow: hidden;
    }
    .palyer-body>img{
        border-radius: 50%;
    }
    .controlPlayer{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 30px;
        width: 30px;
        background: url('../../static/player.png')  no-repeat;
        /* background: url('../../static/player.png') -24px 0 no-repeat; */
        background-position: 5px 0;
    }
    .palyer-audio{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .music-rotate{

    }
    .anima{
        -webkit-animation: spin 10s linear infinite;
        animation: spin 10s linear infinite;
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
            transition: all 18s;
        }
    }
</style>
