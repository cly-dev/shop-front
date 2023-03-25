/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2022-08-10 14:59:56
 * @Description: 格式化配置
 */
module.exports = {
    tabWidth: 4, // 缩进字节数
    useTabs: true,// 缩进使用tab，不使用空格
    printWidth: 140, // 超过最大值换行
    bracketSpacing: false,// 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
    semi: false, //行位是否使用分号，默认为true
    trailingComma: 'all', //是否使用尾逗号，有三个可选值"<none|es5|all>"
    arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    jsxBracketSameLine: true,// 在jsx中把'>' 是否单独放一行
    requirePragma: false, //顶部注释
    eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
    htmlWhitespaceSensitivity: 'ignore',
}
