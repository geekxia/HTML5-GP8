// 创建上下文

const ThemeContext = React.createContext()

const { Provider, Consumer } = ThemeContext

// 基于theme封装的一个自定义的Provider
const ThemeProvider = props => {
  const { theme, children } = props
  return (
    <Provider value={theme}>
      { children }
    </Provider>
  )
}

const ThemeConsumer = props => {
  const { children } = props
  if (typeof children !== 'function') {
    throw new Error('语法错误')
  }
  return (
    <Consumer>
      { children }
    </Consumer>
  )
}


export default ThemeContext
export { ThemeProvider, ThemeConsumer }
