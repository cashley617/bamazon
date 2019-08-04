var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    PORT: 3333,
    user: "root",
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    showProductOptions(); 
});

// function to show user the product options
let showProductOptions = function () {
    let query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        let showTable = new Table({
            head: ["Item ID", "Product", "Category", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (let i = 0; i < res.length; i++) {
            showTable.push([
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ]);
        }
        console.log(showTable.toString());
        userPrompt();
    });
};

// function to confirm or deny order request 
function purchaseOrder(ID, amtNeeded) {
    connection.query('Select * FROM products WHERE item_id = ' + ID, function (err, res) {
        if (err) { console.log(err) };
        if (amtNeeded <= res[0].stock_quantity) {
            let totalCost = res[0].price * amtNeeded;
            console.log("We can fill your order!");
            console.log("The total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost + ", thanks!");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
        } else {
            console.log("Unfortunately, we do not have enough " + res[0].product_name + "to fill your order.");
        };
        showProductOptions();
    });
};

// function to ask the user what they want to purchase
function userPrompt() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "What is the item # you want?",
        filter: Number
      },
      {
        name: "Quantity",
        type: "input",
        message: "How many would you like to buy?",
        filter: Number
      }
    ])
    .then(function(answers) {
      let numberRequested = answers.Quantity;
      let IDrequested = answers.ID;
        purchaseOrder(IDrequested, numberRequested);
    });
};
