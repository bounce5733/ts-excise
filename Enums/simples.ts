// ---- Numeric enums ----
// down value = 2,left value = 3, right value = 4
enum Direction {
  Up = 1, // default have the value 0
  Down,
  Left,
  Right
}

function printDirect(d: Direction): void {
  console.log(d.toString())
}

printDirect(Direction.Up)

// ---- String enums ----
enum DirectionString {
  Up = '向上',
  Down = '向下',
  Left = '向左',
  Right = '向右'
}

// ---- Heterogeneous enums ----
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "yes"
}

// ---- Computed and constant members ----
enum E {X, Y, Z} // E.X|E.Y|E.Z is a constant

enum FileAccess {
  // constant member
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length
}

console.log(FileAccess.Read)
console.log(FileAccess.Write)
console.log(FileAccess.ReadWrite)
console.log(FileAccess.G)

// ---- enum member types ----
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle,
  radius: number
}

interface Square {
  kind: ShapeKind.Square,
  sideLength: number
}

const c: Circle = {
  //kind: ShapeKind.Square, // error
  kind: ShapeKind.Circle,
  radius: 10
}

// ---- Enums at runtime ----
enum E1 {X, Y, Z}
function f(obj: {X: number}) {return obj.X}
console.log(f(E1)) // Works, since 'E1' has a property named 'X' which is a number.

// ---- Enums at compile time
enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}

/*
This is equivalent to:
type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
*/
type logLevelStrings = keyof typeof LogLevel

function printImportant(key: logLevelStrings, message: string) {
  const num = LogLevel[key]
  if (num <= LogLevel.WARN) {
    console.log('Log level key is: ', key)
    console.log('Log level value is: ', num)
    console.log('Log level message is: ', message)
  }
}

printImportant('ERROR', 'error message!')

// ---- Reverse enums ----
/*
Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. Const enum members are inlined at use sites. 
This is possible since const enums cannot have computed members.
*/
enum E2 { A }
const a = E2.A
const nameOfA = E2[a] // 'A'

// ---- Const enums ----
const enum Directions {
  UP, DOWN, LEFT, RIGHT
}

const directions = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT] // 编译后为[1,2,3,4]

// ---- Ambient enums（没搞懂） ----
/*
Ambient enums are used to describe the shape of already existing enum types.
One important difference between ambient and non-ambient enums is that, 
in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant. 
In contrast, an ambient (and non-const) enum member that does not have initializer is always considered computed.
*/
declare enum E3 {
  A = 1,
  B,
  C = 2
}