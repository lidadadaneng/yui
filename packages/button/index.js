// button/index.js
import ElButton from './src/button.vue'; // 后缀不可省略

/* istanbul ignore next */
ElButton.install = function(Vue) { // 提供给按需加载能力
    Vue.component(ElButton.name, ElButton);
};

export default ElButton;
