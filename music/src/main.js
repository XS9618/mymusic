// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Menu, MenuItem, } from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
import 'jquery'

Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.component(Button.name, Button);
Vue.use(Menu)
Vue.use(MenuItem)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
