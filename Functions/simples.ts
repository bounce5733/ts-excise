// ---- Function Types ----
// ---- Typing the function
function add(x: number, y: number): number {
  return x + y
}

const myAdd = function(x: number, y: number): number {return x + y}

// ---- Function Type
const myAddFunType: (x: number, y: number) => number = function(x, y) {return x + y} // x,y的类型能自动推断出来，called 'contextual typing'

const myAddFunType2: (x: number, y: number) => number = myAdd
console.log(myAddFunType(1, 2))

function buildName(firstName: string, lastName?: string) { // ?: 任何可选参数必须更在必选参数后面
  if (lastName) {
    return firstName + lastName
  } else {
    return firstName
  }
}

const name1 = buildName('f1')
const name2 = buildName('f1', undefined)
const name3 = buildName('f1', 'f2')

function buildName2(firstName:string = 'f1', lastName?: string) {
  if (lastName) {
    return firstName + lastName
  } else {
    return firstName
  }
}

const name11 = buildName2();
const name12 = buildName2('f1');
const name13 = buildName2('f1', undefined)
const name14 = buildName2('f1', 'f2')
const name15 = buildName2(undefined, undefined);

// ---- Rest Parameters ----
function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(' ')
}
const buildNameFun: (firstName: string, ...rest: string[]) => string = buildName3
console.log(buildNameFun('jack', 'tom', 'bob', 'sam'))