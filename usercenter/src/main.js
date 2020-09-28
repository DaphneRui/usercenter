import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import { post,get,del,put } from "./utils/axios"
Vue.prototype.yPost = post
Vue.prototype.yGet = get
Vue.prototype.yDel = del
Vue.prototype.yPut = put

Vue.config.productionTip = false;

Vue.filter("globalFormatTime", time => {
  let value = new Date(time);
  let y = value.getFullYear();
  let m = value.getMonth() + 1;
  let d = value.getDate();
  let h = value.getHours()
  let mm = value.getMinutes()
  return y + "-" + m + "-" + d + ' ' + h + ':' + mm;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
