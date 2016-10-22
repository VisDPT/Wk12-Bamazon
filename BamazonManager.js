// Create a new Node application called BamazonManager.js. Running this application will:
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: " ", //Your username
    password: " ", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    managerDisplayItems();
})





// View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

// View Low Inventory, then it should list all items with a inventory count lower than five.

// Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// Add New Product, it should allow the manager to add a completely new product to the store.


// Created a series of questions 
function managerDisplayItems(){
inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "Hello Manager, what would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function(answer) {
                    switch (answer.options) {
                    case ("View Products for Sale"):   
                        break;

                    case ("View Low Inventory"):
                        break;
                    case ("Add to Inventory"):
                        break;
                    case ("Add New Product"):
                        break;
                    default:

                }






function viewProducts() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | ");
        }
        console.log("============================");
        productSearch();
    })
}

function viewLowInventory() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | ");
        }
        console.log("============================");
        productSearch();
    })
}

function addToInventory() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | ");
        }
        console.log("============================");
        productSearch();
    })
}

function addNewProduct() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | ");
        }
        console.log("============================");
        productSearch();
    })
}

    // // If the user guesses the password...
    // if (user.myPassword == "myHouse"){

    //     console.log("==============================================");
    //     console.log("");
    //     console.log("Well a deal's a deal " + user.name);
    //     console.log("You can stay as long as you like.");
    //     console.log("Just put down the " + user.carryingWhat.join(" and ") + ". It's kind of freaking me out.");
    //     console.log("");
    //     console.log("==============================================");
    // }


    // // If the user doesn't guess the password...
    // else {

    //     console.log("==============================================");
    //     console.log("");
    //     console.log("Sorry " + user.name);
    //     console.log("I'm calling the cops!");
    //     console.log("");
    //     console.log("==============================================");

   // }
})
}