import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'

import $http from "./js/http"
import './registerServiceWorker'
import './style/reset.css'
import './style/base.css'
import './style/safe-area.css'
import EgHeader from './components/header/eg-header.vue';
import EgFooter from "./components/footer/eg-footer"
import EgInput from "./components/eg-input/eg-input"
import EgSelect from "./components/eg-select/eg-select"
import EgAngle from './components/angle/angle'
import GunBar from './components/gunBar/gunBarBox'
import EgDialog from './components/dialog/dialog';
import inputBox  from "./components/input-box/input-box"

import mainOptions  from "./config/main-option.js"
import interfaces  from "./config/url.js"
import api  from "./js/api.js"

import { PullRefresh,Swipe, SwipeItem,Lazyload,Field,CellGroup,NumberKeyboard,List } from 'vant';
import { toast } from'./js/toast.js'
// import { Toast } from 'vant';
// import { Swipe, SwipeItem } from 'vant';
// import { Lazyload } from 'vant';
// import { Field } from 'vant';
// import { CellGroup } from 'vant';
// import { NumberKeyboard } from 'vant';

Vue.use(NumberKeyboard);
Vue.use(CellGroup);
Vue.use(Field);
// options 为可选参数，无则不传
Vue.use(Lazyload, mainOptions.vLazyOption);
Vue.use(Swipe).use(SwipeItem);
// Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(List);
Vue.component('eg-header', EgHeader);
Vue.component('eg-footer', EgFooter);
Vue.component('eg-input', EgInput);
Vue.component('eg-select', EgSelect);
Vue.component('eg-angle', EgAngle);
Vue.component('eg-dialog', EgDialog);
Vue.component('gun-bar', GunBar);
Vue.component('input-box', inputBox);

Vue.config.productionTip = false;
Vue.prototype.$http = $http;
Vue.prototype.$toast = toast;
Vue.prototype.$api = api;
Vue.prototype.mainOptions = mainOptions;
Vue.prototype.interfaces = interfaces;
fastclick.attach(document.body);


fastclick.prototype.focus = function(targetElement) {
  targetElement.focus();
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
