// index.js
import Divider from './src/main.vue'; // 后缀不可省略
/* istanbul ignore next */
Divider.install = function(Vue) {
    Vue.component(Divider.name, Divider);
};
export default Divider;
