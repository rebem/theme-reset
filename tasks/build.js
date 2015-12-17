const inFileName = 'styles.less';
const outFileName = 'styles.css';
const lessOptions = {
    compress: false,
    relativeUrls: true
};

export function lessBuild() {
    const fs = require('fs');
    const path = require('path');
    const recursiveReadDir = require('node-dir');
    const mkdirp = require('mkdirp');
    const less = require('less');

    const inRootDir = path.resolve('src/');
    const outRootDir = path.resolve('build/');

    return new Promise((rootResolve, rootReject) => {
        recursiveReadDir.paths(inRootDir, (readDirErr, readDirResult) => {
            if (readDirErr) {
                return rootReject(readDirErr);
            }

            return Promise.all(
                readDirResult.files
                    .filter(inFile => path.extname(inFile) === path.extname(inFileName))
                    .map(inFile => {
                        const inDir = path.dirname(inFile);
                        const relativeInDir = path.relative(inRootDir, inDir);
                        const outDir = path.resolve(outRootDir, relativeInDir);
                        const outFile = path.resolve(outDir, outFileName);

                        return new Promise((resolve, reject) => {
                            mkdirp(outDir, (mkdirpErr) => {
                                if (mkdirpErr) {
                                    return reject(mkdirpErr);
                                }

                                fs.readFile(inFile, 'utf-8', (readFileErr, readFileResult) => {
                                    if (readFileErr) {
                                        return reject(readFileErr);
                                    }

                                    less.render(readFileResult, lessOptions, (lessErr, lessResult) => {
                                        if (lessErr) {
                                            return reject(lessErr);
                                        }

                                        fs.writeFile(outFile, lessResult.css, 'utf-8', (writeFileErr) => {
                                            if (writeFileErr) {
                                                return reject(writeFileErr);
                                            }

                                            resolve();
                                        });
                                    });
                                });
                            });
                        });
                    })
            ).then(rootResolve);
        });
    });
}
