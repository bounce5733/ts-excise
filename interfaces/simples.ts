interface labelVal {
  label: string
}

function printLabel(labelObj: labelVal) {
  console.log(labelObj.label)
}
let labelObj = {name: 'labelObj', label: 'size of 10'}
printLabel(labelObj)

// ----optional properties----
interface SquareConfig {
  color?: string
  width: number
  [propName: string]: any // 在可选的数据对象用允许其他字符属性加入
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  const newSquare = {color: 'red', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

const square = createSquare({excess:'', width: 5}) // 有[propName: string]: any允许excess属性，否则报错
const mySqare = createSquare({width: 100, opacity: 0.5} as SquareConfig) // 用type assertion可以避免上述异常

console.log(JSON.stringify(square))

//---- readonly property ----
//Variables use const whereas properties use readonly
interface Point {
  readonly x: number
  readonly y: number
}

const p: Point = {x: 10, y: 20}
// p.x = 15 // error

let a:number[] = [1, 2, 3, 4]
let ao: ReadonlyArray<number> = a
// ao[0] = 10 // error
// ao.length = 100 // error
// a = ao // error
a = ao as number[]

//---- function types ----
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(src, sub) { // 不检查调用参数名称，指检查类型，编译器也能推断出类型
  let result = src.search(sub)
  return result > -1
}

//---- Indexable Types ----
interface StringArray {
  [index: number]: string // index can number or string
}

let myArray: StringArray
myArray = ['bob', 'sam']
let myName: string = myArray[0]

class Animal {
  name: string
}

class Dog extends Animal {
  breed: string
}

interface NotOkay { // number index 必须是 string index 的子类，编译器会转换number index 到 string index，换下就报错了
  [x: number]: Dog
  [x: string]: Animal
}
// 字典模式
interface NumberDictionary {
  [index: string]: number
  length: number
  // name: string // error, the typeof 'name' is not subtype of the indexer
}

interface NumberDictionary2 {
  [index: string]: number | string
  length: number
  name: string
}

// readonly pattern
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray2: ReadonlyStringArray = ['bob', 'sam']
// myArray2[1] = 'jack' // error, readonly

//---- Class Types ----
// interface 表示类public 部分，并且只检查instance部分，不包含static部分，
interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
  // new (hour: number, minute: number) 构造函数输入static部分，编译器不会检查，会报错误的实现，解决方法见下面例子
}

class MyClock implements ClockInterface {
  currentTime: Date = new Date()
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}

// 解决接口构造函数方法一
// for the constructor
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface1
}

// for the instance methods
interface ClockInterface1 {
  tick(): void
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface1 {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface1 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface1 {
  contructor(h:number, m: number) {}
  tick() {
    console.log('di da,di da')
  }
}

const digitalClock: DigitalClock = createClock(DigitalClock, 10, 10)
const analogClock: DigitalClock = createClock(AnalogClock, 13, 13)
digitalClock.tick()
analogClock.tick()

// 解决接口构造函数方法二（还没弄懂）
// use class expressions
interface ClockConstructor2 {
  new (hour: number, minute: number)
}

interface ClockInterface2 {
  tick(): void
}

const Clock: ClockConstructor2 = class Clock implements ClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep, beep')
  }
}

// ---- Extending Interfaces ----
interface Shape {
  color: string
}

interface Name {
  name: string
}

interface Square extends Shape, Name {
  sideLength: number
}

const mySquare2 = {} as Square
mySquare2.color = 'red'
mySquare2.sideLength = 10
mySquare2.name = 'square'

// ---- Hybird Types ----
interface Counter {
  (start: number): string // 没搞懂
  interval: number
  reset(): void
}

function getCounter(): Counter {
  const counter = (function (start: number) {}) as Counter
  counter.interval = 10
  counter.reset = function() {}
  return counter
}

const c = getCounter()
c(10)
c.reset()
c.interval = 5.0

// ---- Interfaces Extending Classes ----
// 集成类的接口只能被该类的子类集成
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl { // have state property
  select() {}
}

class TextBox extends Control { // have state property
  select() {}
}

// Error: Property 'state' is missing in type 'Image'.
// class MyImage implements SelectableControl {
//  select() {}
// }

