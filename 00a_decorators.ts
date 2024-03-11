function sealed(target) {
  console.log("do something with 'target' ! ");
}

// 1. 什么是装饰器  可以修饰类、属性、方法、参数和类元数据的 ‘符号’。
//  @express ,  作用在 被修饰的 对象身上
// DF : 返回运行时 被装饰器所执行的 函数

function color(value: String) {
  return function (target) {
    console.log(`do something with ${target} use the value ${value} ! `);
  };
}

// 2. Decorator嵌套规则 验证：
// Envaluate过程顺序，decorator反向执行
// There is a well defined order to how decorators applied to various declarations inside of a class are applied:
// Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
// Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
// Parameter Decorators are applied for the constructor.
// Class Decorators are applied for the class.

function first() {
  console.log("first(): factory evaluated !");

  return function (
    target: any,
    properKey: String,
    descriptor: PropertyDescriptor
  ) {
    console.log(`first(): ${target} called !`);
  };
}

function second() {
  console.log("second(): factory envaluated !");

  return function (
    target: any,
    properKey: String,
    descriptor: PropertyDescriptor
  ) {
    console.log(`second(): ${target} called !`);
  };
}

class ExampleClass {
  // 是不就是java中的 注解处理器吗
  @first()
  @second()
  method() {}
}

new ExampleClass().method();

// 4. 类装饰器

// function sealedV2(constructor:Function) {
//     Object.seal(constructor)
//     Object.seal(constructor.prototype)
// }

// @sealedV2
// class BugReport {
//     type = "report";
//     title:string;

//     constructor(t:string) {
//         this.title = t;
//     }
// }

// new BugReport("1").title = "123"

// 4.2 重修构造函数的案例
function reportableClassDecorator<T extends new (...args: any[]) => {}>(
  constructor: T
) {
  return class extends constructor {
    // type = "https://www.baidu.com";
    // title = "https://www.baidu.com";
    reportingURL = "https://www.baidu.com"; //由于运行时调用，故没有报错
  };
}

@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"

// bug.reportingURL;

// 5. 方法装饰器
// observe, modify, or replace a method definition    PropertyDescriptor

// 三个参数
// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// 实例对象的 类原型对象 ； 静态成员 类构造函数
// The name of the member.
// The Property Descriptor for the member.

console.log("-------------------------------------------");
function enumerable(value: boolean) {
  return function (
    target: any,
    properKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

class Greeteer {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  // @enumerable(false)
  greet() {
    return "Hello , " + this.greeting;
  }
}

for (var properName in Greeteer.prototype) {
  console.log(properName + ": " + Greeteer[properName]);
}

Greeteer.prototype.greet = function () {
  return "Hello World , Modifier!";
};

const greeteer = new Greeteer("BeancurdV");
console.log(greeteer.greet());

// 6. accessor 方法器

function configurable(value: boolean) {
  return function (
    target: any,
    properKey: string,
    descriptor: PropertyDescriptor
  ) {
    this.descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }


  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;

  }
}


// 7. property 装饰器

import "reflect-metadata"

function goat(value:string) {
  return function(obj:any , primaryKey:string , descriptor: PropertyDescriptor) {
    this.descriptor.value = value
  }
}

class Dirk {

  @goat("")
  peer:string 

  constructor(peer:string) {
    this.peer = peer;
  }
}




