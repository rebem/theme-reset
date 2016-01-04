var path = require('path');

module.exports = {
    default: {
        path: path.resolve('build/'),
        files: {
            styles: 'styles.css'
        }
    },
    src: {
        path: path.resolve('src/'),
        files: {
            styles: 'styles.less'
        }
    }
};
