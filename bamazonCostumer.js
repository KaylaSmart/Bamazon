var mysql = require("mysql");
var inquirer = require("inquirer");
var Table= require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_DB"
  });
  
  // run a function called  start after the connection has been made

  //connects to the mysql server and the sql database
connection.connect(function(err){
  if(err)throw err;
  //if no error start
  console.log("connected");
  start();
});

  //function that displays the store items 
function start() {
  //displays the items that are for sale
  // the id, name price
  var query = "SELECT * FROM products" ;
  console.log("=========================================================================================")
  console.log("=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_WELLCOME TO BAMAZON PRIME=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_")
  console.log("=========================================================================================")

  connection.query(query, function(err, res){
  for ( var i = 0; i < res.length; i++ ) {
    console.log(
      "ID:     " + 
        res[i].item_id + 
        "  |" + "NAME:   " +
         res[i].product_name + 
         "   |   " + "Price: " + 
         res[i].price +
         "   |    " + "Stock: " + 
         res[i].stock_quantitiy

        );
  }
  displayTable();
  selectItem();
}); 
// run selection function
}
  


function displayTable() {
  //show all ids, names, and products from database.
  connection.query('SELECT * FROM Products', function(error, res ){
      if (error) { console.log(error) };
      //New instance of our constructor
      var productTable = new Table({
          //declare the value categories
          head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
          //set widths to scale
          colWidths: [10, 30, 18, 10, 14]
      });
      //for each row of the loop
      for (i = 0; i < res.length; i++) {
          //push data to table
          productTable.push(
              [res[i].item_id, res[i].product_name, res[i].department_name, res[i].Price, res[i].stock_quantitiy]
          );
      }
    });
}




// function that prompts the used with two messages
//the first one ask the user for  the id
//the second ask how many units of the item 

function selectItem(){

  connection.query("SELECT * FROM products", function(err, res){
    for(var i = 0; i < res.length; i++){
      // console.log("")
    }

    if(err) throw err;

  inquirer
    .prompt([
      {
      name:"choice",
      type:"input",
      message:"What item would you like to purchase? Please specify the ID number.",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name:"quantity",
      type:"input",
      message:"How many would you like to purchase?",
    }  
  ])
    .then(function(answer) {
      var chosenItem = answer.choice;
      var chosenQuantity = answer.quantity;

      connection.query("SELECT * FROM products WHERE item_id = " + answer.choice, function(err, res) { 
        if(err) throw err;
      //  {
        //  if(res[0].item_id === answer.choice)
          //  chosenItem = answer.choice;
         
      //  }
        //determine the stock
      if(res[0].stock_quantitiy - chosenQuantity > 0)  {

        var total = res[0].price * chosenQuantity;


        console.log("Thank you for your order." );
        console.log("We have your item in stock!")
        console.log("Your total is :" + total + " Come Back Soon!");

        // var newStock = res[0].stock_quantitiy - answer.quantity;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantitiy: res[0].stock_quantitiy - chosenQuantity
              },
              {
                item_id: res[0].item_id
              }
            ],
          );    
          // console.log("Thank you for your order" + chosenItem.product_name);  
          // console.log("Thank you for your order, your total is" + (res[i].price * answer.quantity));
        }else{
          console.log("Insufficient quantity!");
        }
        start();
      }); 
   })  
  });
}



 //get the info of the chosenproduct
      // var chosenID = answer.choice;
      // var chosenProduct = res[chosenID];
     

      //   if( chosenID === res[i].item_id){
      //     console.log("you have selected:" + chosenProduct.product_name);
          
      //   }
