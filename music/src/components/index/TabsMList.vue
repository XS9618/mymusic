<template>
  <div v-if="MusicInf.length">
    <!-- <div @click="playSing" class="tabs-list" v-for="(ele,index) in MusicInf" :key="index"> -->
    <router-link
      class="tabs-list"
      v-for="(ele,index) in MusicInf"
      :key="index"
      :to="{name:'Player',params:{'songid':ele.song_id}}"
    >
      <div class="tabs-list-left">
        <img :src="ele.album_1000_1000" alt />
      </div>
      <div class="tabs-list-right">
        <p>{{ele.title}}</p>
        <p class="songs-author">{{ele.author}}</p>
      </div>
    </router-link>
    <!-- </div> -->
  </div>
  <div v-else>
    <img :src="loading" alt="">
  </div>
</template>


<script>
import loading from '../../../static/loading.gif'
export default {
  name: "TabsMList",
  props: {
    MusicInf: {
      type: Array,
      required: true
    }
  },
  data() {
    return {loading:loading};
  },
  methods: {
    playSing() {
      console.log("play");
      console.log(this);
    }
  }
};
</script>

<style scoped>
.tabs-list {
  display: flex;
  cursor: pointer;
  background-color: #F5F6FA;
  border-bottom: 1px solid #ccc;
  align-items: flex-end;
}
.tabs-list:hover {
    background-color: #fff;
}
.tabs-list-left {
  width: 20%;
  border-radius: 5%;
}
.tabs-list-left img {
  width: 100%;
  border-radius: 5%;
}
.tabs-list-right {
  flex: 1;
  text-align: left;
  background-color: #F2F3F4;
  padding: 10px 0;
}
.tabs-list-right:hover{
  background-color: #f2f3ff;     /* 仅电脑端生效 */
}
.tabs-list-right>p {
  color: #000;
  padding-left: 10px;
}
.tabs-list-right .songs-author {
    color: #888;
    font-size: 12px
}
</style>
