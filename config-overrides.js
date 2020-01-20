const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    // 针对antd按需打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,// 自动打包对应的样式
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);