// YDUI/Message/code/main.js
import Vue from 'vue';
import Main from './main.vue';

const messageConstructor = Vue.extend(Main);
let instance = null;
let instances = [];
let seed = 1;

const message = (options = {}) => {
    // 将传递进来参数与data中的合并
    instance = new messageConstructor({
        data: options // 会自动与main.vue中的data数据进行同名合并
    });
    // 唯一id标识
    instance.id = 'myMessage_' + seed++;
    // 手动挂载-上面说过了, $mount()没有参数的话只是渲染还没挂载
    instance.$mount();
    // 把组件加入页面的body中
    document.body.appendChild(instance.$el);

    // 距离顶部偏移量
    let offset = options.offset || instance.offset; // 如果没有传递就取默认值20
    instances.forEach(item => {
        offset += item.$el.offsetHeight + 16 // 下一个组件与上一个组件相距16px, 也可以将它改成可变参数
    });
    instance.offset = offset;

    // 保存每个组件实例
    instances.push(instance);
    // 每一个调用this.$message()都能返回对应的组件的实例，方便后续的操作
    return instance
};

export default message
