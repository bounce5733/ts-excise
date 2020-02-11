function identity<T> (arg: T): T {
  return arg
}

const myIdentity: <T> (arg: T) => T = identity

const myIdentityObj: {<T> (arg: T): T} = identity //  对象形式

const result = myIdentityObj<string>('my string')
console.log('result=' + result)

function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg;
}

interface GenericIdentityFn {
  <T>(arg: T): T
}

interface GenericIdentityFn2<T> { // 所有成员可见
  (arg: T): T
}

const myGenericIdentityFn: GenericIdentityFn = identity
const myGenericIdentityFn2: GenericIdentityFn2<number> = identity;
console.log(myGenericIdentityFn('My genericIdentityFn test'))
console.log(myGenericIdentityFn2(20))

// ---- Generic Class ----
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

const myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {return x + y}
console.log('myGenericNumber.add is:' + myGenericNumber.add(1, 2))

const myGenericString = new GenericNumber<string>()
myGenericString.zeroValue = ''
myGenericString.add = function(x, y) {return x + y}
console.log('myGenericString.add is:' + myGenericString.add('hello', 'typescript'))

// ---- Generic Constraints ----
interface Lengthwise {
  length: number
}

function loggingIdentityLengthWise<T extends Lengthwise>(arg: T): T {
  console.log('arg.length:' + arg.length)
  return arg
}

// console.log(loggingIdentityLengthWise(3)) // error
console.log('loggingIdentityLengthWise:' + loggingIdentityLengthWise({length: 2, value: 3}).value)

// Using Types Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const x = {a: 1, b: 2, c: 3}
console.log('getProperty:' + getProperty(x, 'a'))
// console.log(getProperty(x, 'd')) // error，找不到d属性

// ---- Using Class Types in Generics(没太搞懂) ----
/* 
When creating factories in TypeScript using generics, 
it is necessary to refer to class types by their constructor functions. For example,
*/
function create<T>(c: {new(): T}): T {
  return new c()
}

class BeeKeeper {
  hasMask: boolean = true
}

class ZooKeeper {
  nameTag: string = 'zookeeper'
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: BeeKeeper
}

class Lion extends Animal {
  keeper: ZooKeeper
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Bee).keeper.hasMask // typechecks
createInstance(Lion).keeper.nameTag // typechecks