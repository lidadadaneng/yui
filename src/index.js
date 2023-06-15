
import Button from '../packages/button/index.js';
import Divider from '../packages/divider/index.js';
import Input from '../packages/input/index.js';
import Message from '../packages/message/index.js';
const components = [
    Button,
  Divider,
  Input,
  Message
];
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
export default {
  install,
    Button,
  Divider,
  Input,
  Message
};
