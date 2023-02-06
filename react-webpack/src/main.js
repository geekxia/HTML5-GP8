// V18写法
import { createRoot } from 'react-dom/client'
import App from './App'
const app = createRoot(document.getElementById('root'))
app.render(<App />)

// V17写法
// import ReactDOM from 'react-dom'
// import App from './App'
// ReactDOM.render(<App/>, document.getElementById('root'))
