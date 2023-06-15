// 监听命令行退出
process.on('exit', () => {
    console.log('命令行退出了');
});
// 执行 npm run new xxx 必须填写组件名, 否则直接结束命令
if (!process.argv[2]) {
    console.error('[组件名]必填 - Please enter new component name');
    process.exit(1);
}

// 引入相关模块
const path = require('path');
const fileSave = require('file-save');

// 获取第一个参数
const componentname = process.argv[2];
// 绝对路径: 定位到你项目的packages目录下
const PackagePath = path.resolve(__dirname, '../../packages', componentname);

// 导入uppercamelcase
const uppercamelcase = require('uppercamelcase');
// 转换成驼峰形式 el-button  :  ElButton
const ComponentName = uppercamelcase(componentname);

// 获取 components.json 的内容
const componentsFile = require('../../components.json');
if (componentsFile[componentname]) {
    console.error(`${componentname} 已存在.`);
    process.exit(1); // 如果 components.json 文件中已经有新组件的定义, 直接就退出命令行, 组件目录也不用生成了
}


// 添加新组件定义
componentsFile[componentname] = `./packages/${componentname}/index.js`;
// 把最终结果写回 components.json 文件中
fileSave(path.join(__dirname, '../../components.json'))
    .write(JSON.stringify(componentsFile, null, '  '), 'utf8') // JSON.stringify第三个参数上面预备知识有提及
    .end('\n');

// index.scss
const fs = require('fs');
// 获取总样式文件 index.scss 路径
const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
// 读取文件原本的内容, 再添加写新组件样式的导入
const sassImportText = `${fs.readFileSync(sassPath)}@import "./${componentname}.scss";`;
// 写入最终结果
fileSave(sassPath)
    .write(sassImportText, 'utf8')
    .end('\n');


// 定义需要创建的文件
const Files = [
    {
        filename: 'index.js',
        content: `
         import ${ComponentName} from './src/main.vue';
         /* istanbul ignore next */
         ${ComponentName}.install = function(Vue) {
          Vue.component(${ComponentName}.name, ${ComponentName});
          };
          export default ${ComponentName};
          `,
    },
    {
        filename: 'src/main.vue',
        content:
            `
    <template>
      <div class="el-${componentname}">${componentname}</div>
    </template>

    <script>
      export default {
        name: 'El${ComponentName}'
      };
    </script>
    `,
    },
    {
        filename: path.join('../../packages/theme-chalk/src', `${componentname}.scss`),
        content:
            `
      @import "mixins/mixins";
      @import "common/var";

      @include b(${componentname}) {
        
      }
    `
    },
];

// 循环创建定义的文件
Files.forEach(file => {
    fileSave(path.join(PackagePath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
});
