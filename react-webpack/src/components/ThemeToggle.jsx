const ThemeToggle = props => {
  const { theme, onTheme } = props

  const change = ev => {
    const { name, value } = ev.target
    const newTheme = {
      color: theme.color,
      background: theme.background,
      [name]: value
    }
    onTheme(newTheme)
  }

  return (
    <div>
      <span>前景色：</span>
      <input type="color" name='color' value={theme.color} onChange={change}/>
      <span>背景色：</span>
      <input type="color" name='background' value={theme.background} onChange={change}/>
    </div>
  )
}

export default ThemeToggle
