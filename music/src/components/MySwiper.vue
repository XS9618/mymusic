<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(slide, index) in bannerImg" :key="index">
                <div class="swiper-imgcon"><img :src="slide" alt=""></div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    export default {
        comments: {
            swiper,
            swiperSlide
        },
        props: {
            bannerImg:{
                type: Array,
                required: true,
            }
        },
        name: "MySwiper",
        data() {
            return {
                swiperOption: {
                    loop: true, // 循环模式选项
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay:true,//等同于以下设置
                    disableOnInteraction: false,
                },
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style scoped>
    .swiper-imgcon{
        /* height: 200px; */
    }
    img{
        height: 100%;
        width: 100%;
    }
</style>
