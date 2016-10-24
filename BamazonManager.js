// Create a new Node application called BamazonManager.js. Running this application will:
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
    managerDisplayItems();

})

function displayAllItems() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("");
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | " + res[i].StockQuantity + " | ");
        }
        
    })
}

// Created a series of questions 
function managerDisplayItems() {
    inquirer.prompt([{
        type: "list",
        name: "options",
        message: "Hello Manager, what would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answer) {

        switch (answer.options) {
            case ("View Products for Sale"):
                viewProducts();
                break;
            case ("View Low Inventory"):
                viewLowInventory();
                break;
            case ("Add to Inventory"):
                displayAllItems();        
                addToInventory();
                break;
            case ("Add New Product"):
                addNewProduct();
                break;
            default:
        }
        //managerDisplayItems(); 
    });
}




// View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("===============================================================\n");
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + "$" + res[i].Price + " | " + res[i].StockQuantity + " | ");
        }
    })
}

// View Low Inventory, then it should list all items with a inventory count lower than five.
function viewLowInventory() {
    var query = 'SELECT * FROM Products WHERE StockQuantity < 5';
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            switch (true) {
                case (res[i].StockQuantity < 5):
                    console.log("===============================================================\n");
                    console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + " | " + "$" + res[i].Price + " | " + res[i].StockQuantity + " | \n");
                    //console.log("===============================================================\n");
                    break;
                default:
                    console.log("\n==============================================\n");
                    console.log("NO PRODUCTS HAVE LOW INVENTORY!\n");
                    console.log("==============================================\n");
            }
        }
    })
}
// Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What product are you looking to update? ",

    }, {
        name: "update",
        type: "input",
        message: "How many are you adding?",
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
        connection.query(query, { ProductName: answer.product }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(
                    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ஜ ۩ ۞ ۩ ஜ  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
                    "PRODUCT:  " + res[i].ProductName + "\n" +
                    "DEPARTMENT:  " + res[i].DepartmentName + "\n" +
                    "PRICE:  " + "$" + res[i].Price + "\n" +
                    "QUANTITY IN STOCK/AVAILABLE:  " + res[i].StockQuantity + "\n" +
                    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ஜ ۩ ۞ ۩ ஜ  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n");
                var quantityAdding = parseInt(answer.update);
                var StockQuantity = parseInt(res[i].StockQuantity);
                StockQuantity += quantityAdding;
                console.log( "YOU ADDDED:" + quantityAdding + "\n"+
                    "UPDATED QUANTITY:  " + StockQuantity + "\n");

                //console.log(res[i].StockQuantity);
                //console.log("You want " + userQuantity + " " + answer.searchProduct);
                var update = 'UPDATE Bamazon.Products SET ? WHERE ?';
                connection.query(update, [{ StockQuantity: StockQuantity }, { ProductName: res[i].ProductName }], function(err, res) {
                 if (err) throw err;
                 console.log("MYSQL StockQuantity updated");
                 });
            }

        });
    })
}



// Add New Product, it should allow the manager to add a completely new product to the store.



function addNewProduct() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What product do you want to add? ",

    }, {
        name: "dept",
        type: "input",
        message: "What department is it in? ",

    }, 
    {
        name: "price",
        type: "input",
        message: "How much is it for 1 item? (Use decimal point & do not put dollar sign in front) ",
                validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }

    }, 
    {
        name: "stock",
        type: "input",
        message: "How many are you adding?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {
var post  = {ProductName: answer.product, DepartmentName: answer.dept, Price: answer.price, StockQuantity: answer.stock};
 // var query = "INSERT INTO Bamazon.Products ? VALUES ?";
    connection.query("INSERT INTO Bamazon.Products SET ?",post,  function(err, res) {
        if (err) throw err;
            console.log(
                    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ஜ ۩ ۞ ۩ ஜ  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
                    "NEW ITEM ADDED!\n" +
                    "PRODUCT:  " + answer.product + "\n" +
                    "DEPARTMENT:  " + answer.dept + "\n" +
                    "PRICE:  " + "$" + answer.price + "\n" +
                    "QUANTITY IN STOCK/AVAILABLE:  " + answer.stock + "\n" +
                    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  ஜ ۩ ۞ ۩ ஜ  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n" +
                    "MYSQL StockQuantity updated");
   
    });
   }) 

}
