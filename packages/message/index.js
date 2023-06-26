import Message from './src/main.vue';
import message from "./src/main.js";

/* istanbul ignore next */
Message.install = function (Vue) {
    Vue.prototype.$message = message; // 挂载方法
};
export default Message;
