import Start from 'start';
import reporter from 'start-pretty-reporter';
import env from 'start-env';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import read from 'start-read';
import less from 'start-less';
import rename from 'start-rename';
import write from 'start-write';

const start = Start(reporter());

export function build() {
    return start(
        env('production'),
        files('build/'),
        clean(),
        files('src/**/*.less'),
        read(),
        less(),
        rename(file => file.replace(/\.less$/, '.css')),
        write('build/')
    );
}

export function dev() {
    return start(
        env('development'),
        files('build/'),
        clean(),
        files('src/**/*.less'),
        watch(file => start(
            files(file),
            read(),
            less(),
            rename(file => file.replace(/\.less$/, '.css')),
            write('build/')
        ))
    );
}
