import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import VueDND from 'awe-dnd'  //拖拽
import VueAwesomeSwiper from 'vue-awesome-swiper'  //轮播
import _ from 'lodash' //高性能等特性的 JavaScript 工具库


Vue.use(VueDND) //使用拖拽

Vue.use(VueAwesomeSwiper) //使用轮播

Vue.use(ElementUI, { locale })


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
