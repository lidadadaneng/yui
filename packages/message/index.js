import Message from './src/main.vue';
import service from './src/main.js';

/* istanbul ignore next */
Message.install = function (Vue) {
    Vue.prototype.$message = service; // 挂载方法
};
export default Message;
