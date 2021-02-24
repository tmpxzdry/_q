

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const stat = fs.existsSync(path.join(__dirname, '../dist'));
console.log(stat)

if (!stat) {
    console.log(chalk.bgGreen('第一次，正在准备环境....'));
    const binPath = `node "${require.resolve('typescript/bin/tsc')}"`;

    child_process.execSync(binPath, {
        cwd: path.join(__dirname, '../..q-common')
    })
}