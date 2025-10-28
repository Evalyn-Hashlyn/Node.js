// // Synchronous example
// console.log(" I ");

// console.log(" eat ");

// console.log(" Ice Cream ");

// Asynchronous example
// console.log("I");

// // This will be shown after 2 seconds

// setTimeout(()=>{
//   console.log("eat");
// },2000)

// console.log("Ice Cream")

//array inside an object
let stocks = {
    Fruits : ["strawberry", "grapes", "banana", "apple"],
    liquid : ["water", "ice"],
    holder : ["cone", "cup", "stick"],
    toppings : ["chocolate", "peanuts"],
 }

 let order = (fruit_name, call_production) =>{
    setTimeout(function(){

    console.log(`${stocks.Fruits[fruit_name]} was selected`)

// Order placed. Call production to start
   call_production();
  },2000)
};

let production = () =>{
    console.log("Production has started")
};
order(0, production);