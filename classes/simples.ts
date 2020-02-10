// ---- Inheritance ----
/*
派生类的构造函数必须调用super()
What’s more, before we ever access a property on this in a constructor body, we have to call super(). 
This is an important rule that TypeScript will enforce
*/

class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}`)
  }
}

class Snake extends Animal {
  constructor(name: string) {super(name)}
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {super(name)}
  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }
}

const sam = new Snake('Sammy the Python')
const tom: Animal = new Horse('Tommy the Palomino')
sam.move()
tom.move(60)

// ---- Public, private, and protected modifiers ----
/*
Public by default
*/

class Animal2 {
  private name: string
  constructor(theName: string) {this.name = theName}
}

const animal = new Animal2('Cat')
// animal.name // error name is private property

class Person {
  protected name: string
  constructor(name: string) {this.name = name}
}

class Employee extends Person {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

const howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch())
//console.log(howard.name) // error, we can’t use name from outside of Person

// ---- Readonly modifier ----
class Octopus {
  readonly name: string
  readonly numberOfLegs: number = 8
  constructor(theName: string) {
    this.name = theName
  }
}

const dad = new Octopus('Man with the 8 legs')
// dad.name = 'Man with the 3-piect suit' // error,name is readonly

// --- Parameter properties  ----
// public, protected, readonly 或private修饰的参数可直接作为属性
class Octopus2 {
  readonly numberOfLegs: number = 8
  constructor(readonly name: string) {}
}

const dad2 = new Octopus2("man with the 8 legs")
console.log(dad2.name)

// ---- Accessors ----
const fullNameLength:number = 5
class Employee2 {
  private _fullName: string
  get fullName(): string {
    return this._fullName
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameLength) {
      throw new Error('fullName has a max length of' + fullNameLength)
    }
    this._fullName = newName
  }
}

const emp = new Employee2()
emp.fullName = "jack"
console.log(emp.fullName)

// ---- Static Properties ----
class Grid {
  static origin = {x: 0, y: 0}
  constructor(public scale: number) {}
  calculateDistanceFromOrigin(point: {x: number, y: number}) {
    const xDist = (point.x - Grid.origin.x)
    const yDist = (point.y - Grid.origin.y)
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }
}

const grid1 = new Grid(1.0)
const grid2 = new Grid(5.0)

console.log('grid1.distance:' + grid1.calculateDistanceFromOrigin({x: 1, y: 2}))
console.log('grid2.distance:' + grid2.calculateDistanceFromOrigin({x: 10, y: 20}))

// ---- Abstract Class ----

abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log('Department name is:' + this.name)
  }
  abstract printMeeting(): void
}

class AccountDepartment extends Department {
  constructor() {super('Accounting and Audit')}

  printMeeting() {
    console.log('The Account Department meets each Monday at 10am')
  }

  generateReports() {
    console.log(`${this.name} generate reporting...`)
  }
}

let accountDepartment: Department
accountDepartment = new AccountDepartment()
accountDepartment.printName()
accountDepartment.printMeeting()
// accountDepartment.generateReports() // error Department 不存在generateReports()