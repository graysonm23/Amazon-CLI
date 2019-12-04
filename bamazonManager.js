var inquirer = require("inquirer");
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

con.connect(function(err) {
  if (err) throw err;
});
function runThis() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "Welcome",
        message: "Welcome to Amazon-CLI! What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ],
        default: "View Products for Sale"
      }
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
      if (answers.Welcome === "View Products for Sale") {
        con.query("Select * from products", function(err, result, fields) {
          for (i = 0; i < result.length; i++) {
            var id = result[i].id;
            var product = result[i].product_name;
            var department = result[i].department_name;
            var price = result[i].price;
            var stock = result[i].stock_quantity;
            console.log(
              JSON.parse(
                JSON.stringify(
                  "\n" +
                    "ID: " +
                    id +
                    "\n" +
                    "Product: " +
                    product +
                    "\n" +
                    "Department: " +
                    department +
                    "\n" +
                    "Price: " +
                    price +
                    "\n" +
                    "Stock: " +
                    stock +
                    "\n"
                )
              )
            );
          }
          runThis();
        });
      }
      if (answers.Welcome === "View Low Inventory") {
        con.query("Select * from products where stock_quantity < 5", function(
          err,
          result,
          fields
        ) {
          for (i = 0; i < result.length; i++) {
            var id = result[i].id;
            var product = result[i].product_name;
            var department = result[i].department_name;
            var price = result[i].price;
            var stock = result[i].stock_quantity;
            console.log(
              JSON.parse(
                JSON.stringify(
                  "\n" +
                    "ID: " +
                    id +
                    "\n" +
                    "Product: " +
                    product +
                    "\n" +
                    "Department: " +
                    department +
                    "\n" +
                    "Price: " +
                    price +
                    "\n" +
                    "Stock: " +
                    stock +
                    "\n"
                )
              )
            );
          }
          if (result.length === 0) {
            console.log("None of your inventory is low! Good Job!");
            runThis();
          }
          if (err) throw err;
        });
      }
      if (answers.Welcome === "Add to Inventory") {
        inquirer
          .prompt([
            {
              name: "Add",
              type: "input",
              message: "What would you like to add more of?",
              validate: function(res) {
                if (res.length === 0) {
                  console.log("Please type in your item");
                  return false;
                } else {
                  return true;
                }
              }
            },
            {
              name: "Amount",
              type: "input",
              message: "How much would you like to add to your stock?",
              filter: Number
            }
          ])
          .then(answers => {
            con.query(
              "Select * FROM products WHERE product_name = '" +
                answers.Add +
                "'",
              function(err, result, fields) {
                var id = result[0].id;
                var product = result[0].product_name;
                var department = result[0].department_name;
                var price = result[0].price;
                var stock = result[0].stock_quantity;
                console.log(
                  JSON.parse(
                    JSON.stringify(
                      "\n" +
                        "ID: " +
                        id +
                        "\n" +
                        "Product: " +
                        product +
                        "\n" +
                        "Department: " +
                        department +
                        "\n" +
                        "Price: " +
                        price +
                        "\n" +
                        "Old Stock: " +
                        stock +
                        "\n"
                    )
                  )
                );
                if (result.length === 0) {
                  console.log("Product Not Found, Please Try Again");
                  runThis();
                }
                if (result.length > 0) {
                  con.query(
                    "UPDATE products SET stock_quantity = " +
                      (stock + answers.Amount) +
                      " WHERE product_name = " +
                      "'" +
                      answers.Add +
                      "'",
                    function(err, result, fields) {
                      console.log("New Stock: " + (stock + answers.Amount));
                      console.log("Product Updated!");
                      runThis();
                      if (err) throw err;
                    }
                  );
                }
                if (err) throw err;
              }
            );
          });
      }
    });
}
runThis();
