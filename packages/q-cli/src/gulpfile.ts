import * as  chalk from 'chalk';
import * as gulp from 'gulp';
import { safeRequire } from './utils';

gulp.registry({
    get: (taskName: string) => {
        try {
            const task = safeRequire(`./tasks/${taskName}`);
            console.log('currentTask：', task)
            if (task) {
                return task.default;
            }
            console.error(`cannot find cmd:${taskName}`);
        } catch (e) {
            console.log(e);
            process.exit(255)
        }
    },
    init: () => undefined,
    set: () => undefined,
    tasks: () => undefined
} as any)

gulp.on('error', (error) => {
    console.log(chalk.bgRed(`!!!${error.error.message}`));

    process.exit(255)
})