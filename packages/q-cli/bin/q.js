


const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(__dirname)
const stat = fs.existsSync(path.join(__dirname, '../dist'));
console.log(stat)

if (!stat) {
    console.log(chalk.bgGreen('第一次，正在准备环境....'));

    // require.resolve类似path.join(__dirname,'xxxx')。用于拼接绝对路径。且会检查拼接好的路径是否存在
    // 如果有NODE_PATH环境变量，则会先搜索NODE_PATH目录(仍支持，但不太需要。Node.js生态系统已制定一套模块约定)
    // 还会搜索以下全局目录：$HOME/.node_modules  $Home/.node_libraries $PREFIX/lib/node
    // 如果传递的模块标识符不是一个核心模块（Node.js源码lib/下,require总是优先加载核心模块）。
    // 也没有以'/'、'./'、'../'开头。则会从当前模块的父目录开始，从/node_modules目录加载模块
    // 比如在_q目录下require.resolve('q')，最后会拼接为/workspaces/node/_q/node_modules/q/dist/index.js。然后因为没有配置main报错
    const binPath = `node "${require.resolve('typescript/bin/tsc')}"`;

    console.log(binPath)

    // 在三个目录下执行tsc
    // child_process.execSync(binPath, {
    //     cwd: path.join(__dirname, '../../q-common')
    // })

    // child_process.execSync(binPath, {
    //     cwd: path.join(__dirname, '../../q-scripts')
    // })

    child_process.execSync(binPath, {
        cwd: path.join(__dirname, '../'),
        shell: '/bin/bash'
    })
}