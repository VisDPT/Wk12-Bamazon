// Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    database: "Bamazon"
})


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
    
})

function displayItems(){
connection.query('SELECT * FROM Products', function(err, res){
	for (var i =0; i<res.length; i++){
		console.log(res[i].ItemID + " | " + res [i].ProductName + "|" + "$" +res[i].Price + "|");
	}
	console.log("============================");
	productSearch();
})
}

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

var productSearch = function() {
    inquirer.prompt([{
        name: "searchProduct",
        type: "input",
        message: "What product are you looking for? ",
     
    }]).then(function(answer) {
        var query = 'SELECT ProductName,DepartmentName,Price,StockQuantity FROM Products WHERE ?';
        connection.query(query, {ProductName: answer.searchProduct}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res [i].ProductName + "  |  " + res[i].DepartmentName + "  |  " + "$" +res[i].Price + " | " + res[i].StockQuantity + "  |  " );
            }
        });
    });
    productQuantity();
};

var productQuantity = function(){
	inquirer.prompt([{
		name: "howMany",
		type: "input",
		search: "How many would you like to purchase?",
	}]).then(function(answer){
		var query = 'SELECT ProductName, Price, StockQuantity FROM Products WHERE ?';
		connection.query(query, {StockQuantity: answer.howMany}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res [i].ProductName + "  |  " + "$" +res[i].Price + " | " + res[i].StockQuantity + "  |  " );
            }
        });

	});
};






// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
