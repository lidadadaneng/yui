import Message from './src/main.vue';
/* istanbul ignore next */
Message.install = function (Vue) {
    Vue.component(Message.name, Message);
};
export default Message;

