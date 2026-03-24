let arr1 = ["rohit", "vijay", "amar"];
let arr2 = arr1;

arr1[1] = "gaurav";

// console.log(arr1)
// console.log(arr2)

let user = {
    name : "rohit",
    age : 25,
    city : "indore"
}

let {...temp} = user;
user.city = "bhopal";

console.log(user)
console.log(temp)