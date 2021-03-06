// Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
var mysql = require('mysql');
var inquirer = require('inquirer');


var logo =
    "      • ˚ •˛•˚ * 。 • ˚ ˚ ˛ ˚ ˛ •\n" +
    "      • ˚B AMAZON ★* 。 • ˚ ˚ ˛ ˚ ˛ •\n" +
    "      •。★SHOP FROM HOME!★ 。* • ˚。\n" +
    "      ° 。 ° ˛˚˛ *_Π_____*。*˚\n" +
    "      ˚ ˛ •˛•˚ */______/~＼。˚ ˚ ˛\n" +
    "      ˚ ˛ •˛• ˚｜ 田田｜門｜ ˚\n";
var ty =

    "░░░░░╔══╦╗░░░░╔╗░░░░░░╔╗╔╗░░░░░░░░\n" +
    "░░░░░╚╗╔╣╚╦═╦═╣║╔╗░░░░║║║╠═╦╦╗░░░░\n" +
    "░░░░░░║║║║╠╝║║║╠╝║░░░░║╚╝║║║║║░░░░\n" +
    "░░░░░░║║║║║║║║║╔╗╣░░░░╚╗╔╣║║║║░░░░\n" +
    "░░░░░░╚╝╚╩╩═╩╩╩╝╚╝░░░░░╚╝╚═╩═╝░░░░    FOR YOUR PURCHASE! \n";


var sorry =
    "▄███▄░░▄███▄░░████▄░████▄░██▄░░▄██ \n" +
    "▀█▄▀▀░██▀░▀██░██░██░██░██░░▀████▀░ \n" +
    "▄▄▀█▄░██▄░▄██░████▀░████▀░░░░██░░░ \n" +
    "▀███▀░░▀███▀░░██░██░██░██░░░░██░░░  \n";



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "uma1234", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();

})

console.log(logo);

function displayItems() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | "+ res[i].StockQuantity + " | ");
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

    }, {
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
        //DEBUGGING: console.log(answer);
        connection.query(query, { ProductName: answer.searchProduct }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(
                    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ஜ ۩ ۞ ۩ ஜ  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
                    "PRODUCT:  " + res[i].ProductName + "\n" +
                    "DEPARTMENT:  " + res[i].DepartmentName + "\n" +
                    "PRICE:  " + "$" + res[i].Price + "\n" +
                    "QUANTITY IN STOCK/AVAILABLE:  " + res[i].StockQuantity + "\n" +
                    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ஜ ۩ ۞ ۩ ஜ  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n");

                // DEBUGGING
                //console.log (res[i].StockQuantity);

                var userQuantity = answer.howMany;
                //console.log("You want " + userQuantity + " " + answer.searchProduct);

                switch (true) {
                    case (userQuantity == res[i].StockQuantity):
                        res[i].StockQuantity -= userQuantity;
                        console.log(
                            "Updated Stock Quantity:" + res[i].StockQuantity + "\n" +
                            "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
                            ty + "\n");

                        break;

                    case (userQuantity > res[i].StockQuantity):
                        console.log(sorry);
                        console.log("You want " + userQuantity + " " + answer.searchProduct + "!" + "Insufficient quantity! (Order has not gone through)");
                        break;

                    default:
                        res[i].StockQuantity -= userQuantity;
                        console.log(
                            "TOTAL PRICE:  " + userQuantity * res[i].Price + "\n" +
                            "Updated Stock Quantity:" + res[i].StockQuantity + "\n" +
                            "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
                            ty + "\n");



                }
                var update = 'UPDATE Bamazon.Products SET ? WHERE ?';
                connection.query(update, [{ StockQuantity: res[i].StockQuantity }, { ProductName: res[i].ProductName }], function(err, res) {
                    if (err) throw err;
                    console.log("MYSQL StockQuantity updated");
                });
                productSearch();
            }
        });
    });
};
