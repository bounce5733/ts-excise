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