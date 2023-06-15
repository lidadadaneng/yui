//项目总入口
// src/index.js
import Button from '../packages/Button/index.js';
import Divider from '../packages/divider/index.js';

const components = [Button,Divider];

const install = (Vue) => {
    components.forEach(component => {
        Vue.component(component.name, component); // 每个组件需提供 name 属性
    })
}

export default {
    install,
    Button,
    Divider
}
