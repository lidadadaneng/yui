// examples/entry.js
import Vue from 'vue';
import entry from './app.vue';
import VueRouter from 'vue-router';
import routes from './route.config.js'; // 引入路由配置文件
import MainHeader from './components/header.vue';
import demoBlock from './components/demo-block.vue';

import Element from '../lib/element-ui.common.js';
import '../lib/theme-chalk/index.css';
Vue.use(Element);

Vue.use(VueRouter);
Vue.component('main-header', MainHeader);
Vue.component('demo-block', demoBlock);

const router = new VueRouter({
    mode: 'hash',
    base: __dirname, // 应用的基路径, 因为 entry.js 本身为项目的入口文件, 所以 __dirname => '/'
    routes
});

new Vue({
    ...entry,
    router
}).$mount('#app');
