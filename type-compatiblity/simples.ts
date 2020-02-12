interface Named {
  name: string
}

class Person {
  name: string
}
let p: Named
p = new Person()

let x: Named
let y = { name: 'jack', age: 18 }
x = y // allowed,because y have name property

function greet(n: Named) {
  console.log('name:' + n.name)
}

// Only members of the target type (Named in this case) are considered when checking for compatibility.
// This comparison process proceeds recursively, exploring the type of each member and sub-member.
greet(y) // ok

// ---- Comparing two functions ----
let x1 = (a: number) => 0
let y1 = (b: number, c: string) => 0
// x1 = y1 // error
y1 = x1 // 允许丢弃参数，因为历史javascript都是这么干的，例如下面

let items = [1, 2, 3]
items.forEach((item, index, array) => {console.log(item)})
items.forEach(item => {console.log(item)})

// ---- Classes ----
/*
Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type. 
When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.
*/
class Animal {
  feet: number
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number
  constructor(numFeet: number) {}
}

let a: Animal
let s: Size
a = s // ok
s = a // ok

// ---- Generics ----
interface Empty<T> {}
let x2: Empty<number>
let y2: Empty<string>
x2 = y2 // OK, x and y are compatible because their structures do not use the type argument in a differentiating way. 

interface NotEmpty<T> {data: T}

let x3: NotEmpty<number>
let y3: NotEmpty<string>
// x3 = y3 // Error, In this way, a generic type that has its type arguments specified acts just like a non-generic type.

// 范型编译器用any处理
let identity = function<T>(x: T): T { return x }
let reverse = function<U>(y: U): U { return y }
identity = reverse // ok,because (x: any) => any matches (y: any) => any
