// build-entry.js
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var endOfLine = require('os').EOL;

var strs = `
{{include}}
const components = [
  {{list}}
];
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
export default {
  install,
  {{list}}
};
`;


// 引入 `components.json`
var Components = require('../../components.json')
// 定义相关变量
var ComponentNames = Object.keys(Components);
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
var includeComponentTemplate = [];
var listTemplate = [];

// 循环收集动态数据
ComponentNames.forEach(name => {
    var componentName = uppercamelcase(name); // ['Button', 'Divider']
    includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
        name: componentName,
        package: name
    }));
    listTemplate.push(`  ${componentName}`); // ['  Button', '  Divider']
})


var template = render(strs, {
    include: includeComponentTemplate.join(endOfLine), // 替换换行符
    list: listTemplate.join(',' + endOfLine),
});

// 写入文件
var path = require('path');
var fs = require('fs');
var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
fs.writeFileSync(OUTPUT_PATH, template);
