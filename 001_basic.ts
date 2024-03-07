
// 最简单的打印
let obj = {name:'zfc'}
console.log(obj.name)


// structal inherient 
interface Living {
    name:string , 
    age: number
}

function introduce(some: Living) {
    console.log("name : %s , age : %s" , some.name , some.age)
}

const person = {
    name : 'beancurdv' , 
    age : 33
}

introduce(person)
