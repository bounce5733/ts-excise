// ---- boolean ----
let isDone: boolean = false

// ---- number ----
let num: number = 6
let hex: number = 10
let color: string = 'red'
color = 'green'
let firstName: string = 'jiang'
let lastName: string = 'hua'
let fullName: string = `${firstName} yong ${lastName}`
console.log('fullName:' + fullName)

// ---- array ----
//两种形式
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// ---- tuple ----
let tuple1: [string, number] // declare a tuple
tuple1 = ["hello", 10] // initialize it
// tuple1 = [10, "hello"] // error
console.log(tuple1[0].substring(1)) // ok
// console.log(tuple1[1].substring(1)) // error

// ---- enum ----
enum Color {Red, Green, Blue} // index is 0, 1, 2
enum Color2 {Red = 1, Green = 3, Blue = 5} // index is 1, 3, 5
let c: Color = Color.Red
let colorName: string = Color2[3]
console.log(colorName)


// ---- any ----
let notSure: any = "hello"
notSure = 14
notSure.ifItExists() // okay, ifItExists function might exist at runtime
notSure.toFixed()

let prettySure: Object = 4
// prettySure.toFixed() // Error, prettySure 'toFixed' function doesn't exist on type 'Object'

let list3: any = [1, "hello"]
list3[0] = 100
list3[1] = 200

// ---- void ----
let unusable: void = undefined
unusable = null // ok if '--strictNullChecks' is not given

// ---- null and undefined ----
// In TypeScript, both undefined and null actually have their own types named undefined and null respectively. 
// Much like void, they’re not extremely useful on their own:
let u: undefined = undefined
let n: null = null

// ---- never ----
/*
The never type represents the type of values that never occur. 
For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns; 
Variables also acquire the type never when narrowed by any type guards that can never be true.

The never type is a subtype of, and assignable to, every type; however, no type is a subtype of, or assignable to, never (except never itself). 
Even any isn’t assignable to never.
*/
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while(true) {
    
  }
}