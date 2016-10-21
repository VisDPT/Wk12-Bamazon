// Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
var mysql = require('mysql');
var inquirer = require('inquirer');


var logo = 
        "      • ˚ •˛•˚ * 。 • ˚ ˚ ˛ ˚ ˛ •\n"+
        "      • ˚B AMAZON ★* 。 • ˚ ˚ ˛ ˚ ˛ •\n"+
        "      •。★Shop from Home!★ 。* • ˚。\n"+
        "      ° 。 ° ˛˚˛ *_Π_____*。*˚\n"+
        "      ˚ ˛ •˛•˚ */______/~＼。˚ ˚ ˛\n"+
        "      ˚ ˛ •˛• ˚｜ 田田｜門｜ ˚\n";




var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "newuser", //Your username
    password: "password", //Your password
    database: "Bamazon"
})


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
    
})


console.log(logo);

function displayItems(){
connection.query('SELECT * FROM Products', function(err, res){
	for (var i =0; i<res.length; i++){
        
		console.log(res[i].ItemID + " | " + res [i].ProductName + " | " + "$" +res[i].Price + " | ");
	}
	console.log("============================");
	productSearch();
})
}

var productSearch = function() {
    inquirer.prompt([{
        name: "searchProduct",
        type: "input",
        message: "What product are you looking for? ",
     
      },
      {
     name: "howMany",
     type: "input",
     message: "How many would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
 }]).then(function(answer) {
        var query = 'SELECT ProductName,DepartmentName,Price,StockQuantity FROM Products WHERE ?';
        connection.query(query, {ProductName: answer.searchProduct}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res [i].ProductName + "  |  " + res[i].DepartmentName + "  |  " + "$" +res[i].Price + " | " + res[i].StockQuantity + "  |  " );
                    
                if (answer.StockQuantity < res[i].StockQuantity) {
                    console.log("Great! We have that amount!");
                } 
                else{
                    console.log("SORRY! Insufficient quantity! (Order has not gone through)");
                }  
                // switch(true){
                //     case (answer.StockQuantity<res[i].StockQuantity): 
                //         console.log("Great! We have that amount!");
                //         break;

                //     case (answer.StockQuantity>res[i].StockQuantity):
                //         console.log("SORRY! WE ARE SOLD OUT!");
                //         break;

                // }
                
//                 However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
            }


        });
        
    });
    
};
