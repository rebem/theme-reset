export { cleanBuild } from './clean';
export { lessBuild } from './build';

export const build = [
    exports.cleanBuild,
    exports.lessBuild
];
