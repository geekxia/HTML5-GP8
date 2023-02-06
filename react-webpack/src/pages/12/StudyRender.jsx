// 学习目标：灵活编写条件渲染、动态样式、列表渲染的语法。

// 1、单一元素的条件渲染  { bol && <jsx/>
  // - 相当于Vue中的v-if

// 2、两个元素的条件渲染  { bol ? <jsx1/> : <jsx2/> }
  // - 相当于Vue中的v-if/v-else

// 3、多个元素的条件渲染  建议封装“自定义渲染函数”
  // - 我的习惯是，当视图结构中的JSX渲染比较复杂时，自己封装 **render() 来抽离视图。

// 4、动态class和动态style
  // - 使用 display 可以实现和Vue中v-show一样的功能
  // - 语法：<div className={`box ${bol?cc:dd}`} />
  // - 语法：<div style={ {[key]:value} } />

// 5、列表渲染
  // - 语法：官方建议使用 map 方法做列表渲染。
  // - 虽然优秀建议使用 map，有时候也可以用其它循环方法。

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      bol: true,
      row: 0,
      list: [
        { id: 1, name: '张三', age: 10 },
        { id: 2, name: '李四', age: 20 },
        { id: 3, name: '王五', age: 30 },
        { id: 4, name: '赵六', age: 40 }
      ]
    }
  }

  rowRender () {
    const { row } = this.state
    let result = null
    // do something
    switch (row) {
      case 0:
        result = <h1>第一行文字</h1>
        break
      case 1:
        result = <h1>第二行文字</h1>
        break
      case 2:
        result = <h1>第三行文字</h1>
        break
      case 3:
        result = <h1>第四行文字</h1>
        break
      default:
    }
    return result
  }

  useListRender () {
    const { list } = this.state
    return list.map((ele,idx)=>{
      // do something
      return (
        <div key={ele.id}>
          <input type="checkbox"/>
          <span>{ ele.name } - { ele.age }</span>
        </div>
      )
    })
  }

  useListRender2 () {
    const { list } = this.state
    let result = []
    list.forEach(ele => {
      // 如果满足条件
      if (ele.age > 20) {
        result.push(
          <div key={ele.id} data-id={ele.id}>
            { ele.name } - { ele.age }
          </div>
        )
      }
    })
    return (
      <div onClick={ev=>console.log('--row', ev.target.dataset.id)}>
        { result }
      </div>
    )
  }

  gridRender (num=2) {
    const temp = Array(num).fill(1)
    // 两层循环
    return temp.map((_,i)=>{
      // do something
      return (
        <div key={i} style={{height:'60px'}}>
        {
          temp.map((_,j)=>{
            // do something
            return (
              <span key={j*20+i} style={styles.row} />
            )
          })
        }
        </div>
      )
    })
  }

  render () {
    const { bol, list } = this.state
    return (
      <div>
        <h1>学习各种渲染</h1>
        { bol && <h1>我是太阳</h1> }
        <button onClick={()=>this.setState(_=>({bol: !_.bol}))}>切换</button>
        <hr/>

        {
          bol
            ? <div>
                <h1>我是太阳</h1>
              </div>
            : <h1>我是月亮</h1>
        }
        <button onClick={()=>this.setState(_=>({bol: !_.bol}))}>切换</button>
        <hr/>

        { this.rowRender() }
        <button onClick={()=>this.setState(_=>({row: (_.row+1)%4}))}>切换</button>
        <hr/>

        {
          list.map((ele,idx)=>(
            <div key={ele.id}>{ ele.name } - { ele.age }</div>
          ))
        }
        <hr/>

        { this.useListRender() }
        <hr/>

        { this.useListRender2() }
        <hr/>

        { this.gridRender(6) }

      </div>
    )
  }
}

const styles = {
  row: {display:'inline-block',width:'60px',height:'60px',border:'1px solid red'}
}
