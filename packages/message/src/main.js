// YDUI/Message/code/main.js
import Vue from 'vue';
import Main from './main.vue';

const messageConstructor = Vue.extend(Main);
let instance = null;
let instances = [];
let seed = 1;

const message = (options = {}) => {
    // 处理直接传字符串的情况
    if(typeof options === 'string') {
        options = {
            message: options
        }
    }

    // 将传递进来参数与data中的合并
    instance = new messageConstructor({
        data: options // 会自动与main.vue中的data数据进行同名合并
    });
    // 唯一id标识
    instance.id = 'myMessage_' + seed++;

    // 处理options参数传递进来的关闭回调
    let optionsOnClose = options.onClose;
    // 在实例的data属性中挂载onClose()方法, 等关闭的事件触发后来回调处理后续的事情。
    instance.onClose = () => {
        message.close(instance.id, optionsOnClose);
    };
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
    // 显示dom
    instance.visible = true;

    // 保存每个组件实例
    instances.push(instance);
    // 每一个调用this.$message()都能返回对应的组件的实例，方便后续的操作
    return instance
};


/**
 * 当前组件隐藏后需要做的事情:
 * 1. 处理一下其他组件的偏移量往上移
 * 2. 调用options参数传进来的关闭回调
 * 3. 删除保存instances变量中的实例
 * @param id: 实例id
 */
message.close = function(id, optionsOnClose) {
    let len = instances.length;
    let index = -1;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            index = i;
            if (typeof optionsOnClose === 'function') {
                optionsOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
    // 多个的时候关闭中间的,要下面的上移
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    const removedHeight = instances[index].$el.offsetHeight;
    for (let i = index; i < len - 1 ; i++) {
        let dom = instances[i].$el;
        dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
};


export default message
