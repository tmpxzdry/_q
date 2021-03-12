type a = number | string | boolean;

// function doStuff(value: a) {
//     if (Math.random() < 0.5) {
//         return undefined;
//     }
//     return value;
// }

// let a: [number, number] = [1, 2];
// let b: [string, number, boolean] = ['hello', 42, true];

// let c: [string, string?] = ['hello'];
// c = ['hello', 'world'];
// let d: [first: string, second?: string] = ['hello'];
// d = ['hello', 'world']
// let e: [string, string, ...boolean[]];
// e = ['hello', 'world', true, false, true]

// let foo: [...string[], number];
// foo = [123];
// foo = ['hello', 123];
// foo = ['hello', 'hello', 123];

// declare function doStuff(...args: [...names: string[], shouldCapitalize: boolean]): void
// doStuff(false);
// doStuff('fee', 'fi', 'fo', true)

abstract class Shape {
    abstract getArea(): number
}

// class Square extends Shape {
//     #sideLength: number;
//     constructor(sideLength: number) {
//         super();
//         this.#sideLength = sideLength
//     }
//     getArea() {
//         return this.#sideLength ** 2;
//     }
// }

// new Square(42)

interface HasArea {
    getArea(): number
}

// 声明类
let Ctor1: { new(): void } = class { };
let Ctor: new () => void = class { };

function makeSubclassWithArea(Ctor: new () => HasArea) {
    return class extends Ctor {
        getArea() {
            return 1
        }
    }
}

// type MyInstance = InstanceType<typeof Shape>