import * as fs from 'fs';
import * as path from 'path';
// import child_process = require('child_process');

let _packageJson: any;
export const getPackageJson = (): any => {
    if (!_packageJson) {
        const f = path.join(__dirname, '../package.json');
        _packageJson = getSpacePackageJson(f);
    }
    return _packageJson;
}

/**
 * 通过给定的jsonPath读取package.json的内容
 * @param jsonPath package.json所在的位置
 * @returns json对象，当文件不存在的时候，返回{}
 */
export const getSpacePackageJson = (jsonPath: string): any => {
    if (fs.existsSync(jsonPath)) {
        const _packageJsonStr = fs.readFileSync(jsonPath).toString();
        return JSON.parse(_packageJsonStr);
    }
    return {};
}

export const safeRequire = (p: string): any => {
    try {
        return require(p);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND' && !err.message.indexOf(p)) {
            return undefined;
        }
        throw err;
    }
}