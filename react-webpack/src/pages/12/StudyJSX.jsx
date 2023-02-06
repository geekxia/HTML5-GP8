// 学习目标：学习JSX语法细节（非常熟练）。

// 1、组件vs.元素
  // - 那些由class或函数定义的名字也是（首字母大写）变量就是组件，比如 Home、GoodList。
  // - 组件被实例化(<A>)后的东西叫元素，比如 <Home />、<GoodList />
  // - React元素，也被称之为“JSX元素”。

// 2、在JSX语法中没有指令，所有动态的变量在JSX中都要使用 {} 包起来。
  // - <div title={ myTitle } />
  // - <div>{ ele }</div>
  // - <div style={ {['color']:'red'} }></div>
  // - <div className={`aa ${b}`} />

// 3、在JSX中有三个属性和HTML5中是有差异的
  // - className(相当于H5中的class)
  // - htmlFor(相当于H5中的for)
  // - tabIndex(相当于H5中的tabindex)

// 4、在JSX中有三个新增属性
 // - key  只用于列表渲染（性能优化）
 // - ref  是一种快捷访问DOM方式，也是一种访问React组件实例作用的方式（ref转发）
 // - dangerouslySetInnerHTML  相当于Vue中的v-html

// 5、JSX是变量、也是对象、也是表达式。
  // - 当JSX变量被当作表达式使用时，一定要用 {} 包起来。
  // - JSX可以像HTML标签那样地嵌套使用。
  // - JSX是对象，更是“不可变对象”，也就是说你不能直接修改一个JSX变量；如果你一定修改一个JSX变量，要借助state实现。

// 6、{} 是JSX中的一种特殊语法，它中间能够包裹哪些东西？
  // - 基本数据类型 string，number：渲染成文本。
  // - 布尔类型、undefined、null：但不渲染。
  // - 对象 plain object：在动态样式、动态HTML
  // - JSX变量：直接当作视图进行渲染。
  // - 函数调用：渲染函数调用的返回值。
  // - 数组 array：直接循环渲染。

// 7、在JSX中，如果一个节点或组件其内部没有子元素，我们可以使用单闭合标签语法。
  // - <div />
  // - <Home />
  // - 约定：以后我们谈论组件和props时，默认指的是自定义封装组件，不包括那些HTML元素节点。

// 8、当JSX元素的属性是布尔类型且其值为true时，可以省略这个true
  // - <Home checked={false} disabled />

// 9、JSX元素，也叫做React元素，也叫一个Fiber单元。

// 10、当JSX元素嵌套比较多时，建议用()包起来，用缩进的方式把JSX节点对齐。

// 11、当 {} 渲染文本时，默认支持防注入攻击XSS。
  // - 后端返回的数据，放心地渲染。
  // - 这个与dangerouslySetInnerHTML无关，当你渲染HTML字符串仍然是有风险的。

// 12、JSX默认支持 . 语法
  // - <React.Fragment>{ Hello }<React.Fragment>
  // - <Qf.Button>点击</Qf.Button>

// 13、在阅读React代码时，注意变量首字母大小写问题：
  // - 如果首字母大写的变量都是React组件，用JSX语法使用它们 <Hello />
  // - 如果首字母小写的函数，一律使用函数调用语法  { hello() }

// 14、在JSX元素的属性列表，支持展开操作符语法。
  // - <Home {...props, name:'你好'} />

// 15、在JSX中写注释，也要用 {} 包起来。
  // - 在JSX中，注释也是节点，和JSX元素是平起平座的。
  // - {/* 你的注释 */}

const Button = () => (<button>点击</button>)

const Qf = {
  Button: Button
}

const qf = {
  btn: Button
}

const NumberTip = props => {
  if (props.num % 2 === 0) {
    return <h1>这个偶数</h1>
  } else {
    return <h1>这是奇数</h1>
  }
}

export default class extends React.Component {

  handler () {
    // document.getElementById('foo').style.color = 'red'
    this.refs.foo.style.color = 'blue'
  }

  render () {

    const a = 18
    const t = '学习JSX语法'
    const p = 'paddingBottom'
    const s = {color: 'red', fontSize: `${a}px`, [p]: '20px' }
    const c = 'dd'
    const content = `<div title='动态HTML'><a href="http://baidu.com">百度</a></div>`

    var ele = <div>再见</div>  // React.createElement(type,props,chilldren) => Fiber

    const bar = (arg) => {
      return <h1>{ arg }</h1>
    }

    const list = [
      <div key='1'>11</div>,
      <div key='2'>22</div>,
      <div key='3'>33</div>,
      null,
      undefined,
      true,
      false,
      '你好',
      [
        <div key='4'>55</div>,
        <div key='5'>66</div>
      ]
    ]

    const createGrid = () => {
      let result = []
      const s = {display:'inline-block',padding:'10px',border:'1px solid #ccc'}
      for (let i=1; i<4; i++) {
        let row = []
        for (let j=1; j<4; j++) {
          row.push(
            <span style={s} key={j*10+i}>0</span>
          )
        }
        result.push(
          <div key={i}>{ row }</div>
        )
      }
      return result
    }

    const user = {
      name: '张三',
      age: 30,
      addr: '广东深圳'
    }
    const renderUser = () => {
      const keys = Object.keys(user)
      let result = []
      for (let i=0; i<keys.length; i++) {
        const ele = <div key={i}>{ keys[i] } { ':' } { user[keys[i]] }</div>
        // const ele = <div key={i}>{ `${keys[i]} : ${user[keys[i]]}` }</div>
        result.push(ele)
      }
      return result
    }

    const ele2 = (
      <h1>
        <span>你好</span>
      </h1>
    )

    const QfBtn = qf.btn

    const pp = {
      href: 'https://mi.com',
      title: '小米',
      className: 'mi'
    }

    return (
      <div title={ a } id={ 'box' }>
        <h1 style={ s }>{ t }</h1>
        <h1 className={ `cc bb ${c}` }>1000</h1>
        <h1 id='foo' ref='foo'>你好</h1>
        <button onClick={this.handler.bind(this)}>操作</button>
        <div dangerouslySetInnerHTML={ {__html:content} }></div>
        { ele }
        <hr/>
        { bar(100) }
        <hr/>
        { list }
        <hr/>
        { createGrid() }
        <hr/>
        { renderUser() }
        <hr/>
        { ele2 }
        <div style={ {height:'40px',background:'#eee'} } />
        <hr/>
        <Qf.Button />
        <hr/>
        <QfBtn />
        <hr/>
        <NumberTip num={ 5 } />
        <NumberTip num={ 6 } />
        <NumberTip num={ 7 } />
        <hr/>
        <a {...pp}>盲盒</a>
        {/*
          多行注释
        */}
        {/* 单行注释 */}
      </div>
    )
  }
}
