const Config = require('markdown-it-chain');
const containers = require('./container');
const overWriteFenceRule = require('./fence'); // 引入新文件

const config = new Config(); // 实例化
config
    .options.html(true).end() // 可以解析 HTML 标签
    .plugin('containers').use(containers).end(); // 创建自定义 markdown 容器

const md = config.toMd();

overWriteFenceRule(md); // 覆盖默认的 md 转 html 的渲染策略
module.exports = md;
