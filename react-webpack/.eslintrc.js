// 这是ESlint最高级的配置文件，还有另外四种方式可选择

// 解决ESlint问题的常用方法
// 1、对那些“过分”的规则，使用rules配置，降低报错级别。
// 2、使用eslint注释，忽略ESLint检测。忽略单行检测、忽略多行检测。
// 3、使用.eslintigore，忽略你希望忽略的目录或文件
// 4、老老实实把ESLint改成符合规则的，提升你的代码水平（建议这样做）

module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
      "airbnb",
      "airbnb/hooks",
      // "eslint:recommended",
      // "plugin:import/recommended",
      // "plugin:react/recommended",
      // "plugin:react-hooks/recommended",
      // "plugin:jsx-a11y/recommended"
    ],
    // plugins: [
    //   "import", "react",
    //   "react-hooks", "jsx-a11y",
    // ],
    // 在ESlint官方规则的基础上，定制代码检测规则
    // 左 - 规则名
    // 右 - 指定规则的报错级别  2-"error"  1-"warn"  0-"off"
    rules: {
        "semi": 0,
        "no-undef": 0,
        "no-unused-vars": 1,
        "comma-dangle": 0,
        "linebreak-style": 0
    }
}
