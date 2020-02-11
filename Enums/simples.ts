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