import { useState } from "react"

const a : string = 'hello'

const zs: Student = {
  name: '张三',
  age: 10
}

let a1: string = 'hello'
a1 = 'world'
a1 = 'qf'

let a2: number = 100
a2 = 200

const a3: boolean = true
const a4: boolean = false

const a5: string[] = ['a','b']
const a7: Array<string> = ['c', 'd']

const a6: number[] = [1,2,3]
const a8: Array<number> = [1,2,4]

const a9: any[] = [1,'a', true, [1, 2, 4], {a: 1}]
const a10: Array<any> = [true, 1]

let a11: any = 0
a11 = 'hello'
a11 = true
a11 = { a: 1 }

const a12: number[][] = [[1,1,1], [2,3,4]]
const a13: Array<Array<number>> = [[3,3,3], [4,4,4]]
const a14: Array<string[]> = [['a','b'], ['c', 'd']]

// 不要这么写
// const a15: Object[] = [{a:1}, {a:2}, {a:3}, {b:3}, {c:4}]
// const a15: Array<Object> = [{a:1}, {a:2}, {a:3}]

// 应该这么写
interface User {
  a: number
}
const a16: User[] = [{a:1}, {a:2}]
const a17: Array<User> = [{a:3}]

// 元组：本质上也是数组，但它的长度是固定的，并且数组中的每个元素的类型也是固定的。
// 在TS中，元组只是一种写法（一种特殊数组写法），没有新增什么关键字和API
const a18: [string, number, boolean] = ['hello', 100, false]

// 特殊类型
const a19: null = null
let a20: undefined = undefined

// 字面量类型
const a21: 'zhangsan' = 'zhangsan'

type gender = 'man' | 'woman' | null
const a22: gender = 'woman'

// type 类型别名，是TS内置的一个关键字
// 定义别名的语法：type AaaBbb
type Snbn = string | number | boolean | null
const a23: Snbn = true
const a24: Snbn = 100

interface A {
  a: number
}
interface B {
  b: string
}

type C = A | B   // 类型联合
const a25: C = { a: 100 }
const a26: C = { b: 'hello' }

type D = A & B   // 类型交叉
const a27: D = { a: 200, b: 'world' }

// interface 自定义类型（一般常用于对象类型）
interface People {
  name: string,   // 必填属性
  age: number,
  address?: string,  // 非必填属性
  readonly gender: 'man' | 'woman',  // 只读属性
  // [name: string]: any,  // 扩展属性
  [key: string]: any,  // 扩展属性
  children?: Array<any>,
  onRun?: (speed: number) => number,  // 函数类型
}
let a28: People = {
  name: 'lisi',
  age: 10,
  gender: 'woman',
  mobile: 120,
  checked: true,
  children: [1,2,3],
  onRun: (speed: number): number => speed
}

if (a28.onRun) {
  a28.onRun(100)
}

// 自定义数组类型
interface TwoArr {
  [index: number]: string[], // 数组索引
  length: number
}
const a29: TwoArr = [['a'], ['b', 'c'], ['d']]

// type和interface有什么区别？
// 1、type是定义别名，可以进行交叉、联合；interface自定义类型，不能进行交叉、联合。
// 2、type定义的类型（别名），一旦定义了不能改；interface自定义的类型可以修改。
// 3、type定义的类型（别名）不能参与TS面向对象编程；但interface可以参与TS面向对象。
// 4、type类型编译速度较慢，interface类型编译速度较快。

type Dog1 = {
  name: string,
  age: number
}
const a30: Dog1 = {
  name: '大黄',
  age: 2
}
const a32: {name: string, age: number} = { name: '小小', age: 4 }

interface Dog2 {
  name: string,
  age: number
}
const a31: Dog2 = {
  name: '小黄',
  age: 3
}

// 函数类型
function foo1 (name: string) : string {
  console.log('---name', name)
  return name
}
foo1('张三')
foo1('10')

function foo2 (a:number, b:string) : void {
  // do something
}

function foo3 (list: Array<People>) : Array<People> {
  // do something
  return list
}

function foo4 (): never {
  throw new Error('报错')
}
try {
  foo4()
} catch(err) {
  console.log(err)
}

// function foo5 (): never {
//   while(true) {
//     console.log('---')
//   }
// }

// 函数别名，只,用考虑入参类型和返回值类型
type MathFn = (list: number[]) => number
const foo6: MathFn = arg => {
  return 100
}
foo6([1,2,3])

// 枚举类型(用enum定义枚举)
// 什么是枚举类型？数量有限，且互不相同
enum Tab {
  ask = '问答',
  good = '精华',
  job = '招聘'
}
const askZh1 = Tab.ask
const t = 'ask'
const askZh2 = Tab[t]

// 泛型（定义时不给具体的类型，使用是再指定具体类型）
function bar<T> (a: T, b: T) : T {
  return a
}
bar<string>('hello', 'world')
bar<number[]>([1,2], [3,4])

function run<U,T> (a: T, b: U) : [U, T] {
  return [b, a]
}
run<string, boolean>(true, 'hello')   // U=string  T=boolen
run<number, number[]>([1,2,3], 4)

interface Cat<T, U> {
  name: T,
  age: U
}
const a33: Cat<string, number> = {
  name: '小小',
  age: 1
}

const name: string | number = 'zhangsan'
const len: number = (name as string).length