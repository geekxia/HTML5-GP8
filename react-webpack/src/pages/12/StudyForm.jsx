// 学习目标：熟练掌握的表单用法，受控表单、表单取值、表单事件的复用技巧。

// 1、常用的表单有哪些？
  // - 文本类  value + onChange 受控
  // - 下拉框  value + onChange 受控
  // - 单选按钮组 checked + onChange 受控
  // - 多选按钮组 checked + onChange 受控

// 2、受控表单 vs. 非受控表单
  // - 受控表单：表单的value或checked属性，由state声明式变量所控制的（直接控制、间接控制）。
  // - 非受控表单：表单的value或checked属性，与state无关。

// 3、表单使用原则
// - 原则：除了文件上传<input type='file'>以外，其它的表单都最好使用受控表单。

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      info: '',
      name: '',
      age: 0,
      mobile: '',
      level: '',
      gender: 1,
      fav: []
    }
  }

  submit1 () {
    const data = {
      name: document.getElementById('name').value,
      age: this.refs.age.value,
      info: this.state.info,
      mobile: window.mobile
    }
    console.log('提交表单', data)
  }

  submit2 () {
    console.log('提交表单', this.state)
  }

  change (ev) {
    const k = ev.target.name
    this.setState({[k]: ev.target.value})
  }

  changeFav (ev) {
    const { checked, value } = ev.target
    if (checked) {
      this.setState(state=>({fav:[...state.fav, Number(value)]}))
    } else {
      this.setState(state=>({fav: state.fav.filter(ele=>ele!=value)}))
    }
  }

  render () {
    const { info, name, age, mobile, level, gender, fav } = this.state
    return (
      <div>
        <h1>学习表单</h1>

        {/* 以下五种写法都是非受控表单 */}
        <div>
          <span>姓名：</span>
          <input type="text" id='name'/>
          <br/>
          <span>年龄：</span>
          <input type="number" ref='age'/>
          <br/>
          <span>介绍：</span>
          <textarea
            cols="30"
            rows="3"
            defaultValue={info}
            onInput={ev=>this.setState({info: ev.target.value})}
          />
          <br/>
          <span>手机：</span>
          <input type="number" onInput={ev=>window.mobile=ev.target.value}/>
          <br/>
          <span>头像：</span>
          <input type="file"/>
          <br/>
          <button onClick={()=>this.submit1()}>提交</button>
        </div>
        <hr/>

        {/* 以下五种写法都是受控表单 */}
        <div>
          <span>姓名：</span>
          <input type="text" id='name' name='name' value={name} onChange={(ev)=>this.change(ev)} />
          <br/>
          <span>年龄：</span>
          <input type="number" name='age' value={age} onChange={ev=>this.change(ev)}/>
          <br/>
          <span>介绍：</span>
          <textarea
            cols="30"
            rows="3"
            name='info'
            value={info}
            onChange={(ev)=>this.change(ev)}
          />
          <br/>
          <span>手机：</span>
          <input type="number" name='mobile' value={mobile} onChange={(ev)=>this.change(ev)}/>
          <br/>
          <span>学历：</span>
          <select value={level} name='level' onChange={ev=>this.change(ev)}>
          {
            [
              {id:1,label:'高中',value:1},
              {id:2,label:'大专',value:2},
              {id:3,label:'本科',value:3}
            ].map(ele=>(
              <option key={ele.id} value={ele.value}>{ ele.label }</option>
            ))
          }
          </select>
          <br/>
          <span>性别：</span>
          {
            [
              {id:1,label:'男',value:1},
              {id:2,label:'女',value:2},
              {id:3,label:'保密',value:3}
            ].map(ele=>(
              <span key={ele.id}>
                {/*
                  name 把多个radio变成一组，用于复用onChange的事件处理器
                  value 它不是用于受控的，用于事件对象target.value取值的
                  checked 这才是真正用于受控的
                  onChange 用于手动取值的，否则表单是read-only的
                */}
                <input
                  type="radio"
                  name='gender'
                  value={ele.value}
                  checked={gender==ele.value}
                  onChange={ev=>this.change(ev)}
                />
                <span>{ ele.label }</span>
              </span>
            ))
          }
          <br/>
          <span>爱好：</span>
          {
            [
              {id:1,label:'篮球',value:1},
              {id:2,label:'排球',value:2},
              {id:3,label:'游戏',value:3},
              {id:4,label:'编程',value:4},
              {id:5,label:'吃饭',value:5}
            ].map(ele=>(
              <span key={ele.id}>
                <input
                  type="checkbox"
                  name='fav'
                  value={ele.value}
                  checked={fav.includes(ele.value)}
                  onChange={ev=>this.changeFav(ev)}
                />
                <span>{ ele.label }</span>
              </span>
            ))
          }
          <br/>

          <button onClick={()=>this.submit2()}>提交</button>
        </div>
      </div>
    )
  }
}
