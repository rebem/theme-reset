var path = require('path');

module.exports = {
    default: {
        path: path.resolve(__dirname, 'build/'),
        files: {
            styles: 'styles.css'
        }
    },
    src: {
        path: path.resolve(__dirname, 'src/'),
        files: {
            styles: 'styles.less'
        }
    }
};
