var inquirer = require("inquirer");
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

var confirmAnswerValidator = async input => {
  if (input === "" || input > 10) {
    return "ID not found";
  }
  return true;
};

con.connect(function(err) {
  if (err) throw err;
});
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "list",
      name: "Welcome",
      message: "Welcome to Amazon-CLI! What would you like to do?",
      choices: ["Show All Items"],
      default: "Show All Items"
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    if (answers.Welcome === "Show All Items") {
      con.query(
        "SELECT id, product_name, department_name, price, stock_quantity FROM products",
        function(err, result, fields) {
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
          //   console.log(JSON.parse(JSON.stringify(result)));
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "input",
                name: "productID",
                message: "What is the ID of the product you would like to get?",
                validate: confirmAnswerValidator
              },
              {
                type: "input",
                name: "order",
                message: "How many of that product would you like to order?"
              }
            ])
            .then(answers => {
              con.query(
                "SELECT * FROM products WHERE id=" + answers.productID,
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
                  if (err) throw err;
                  con.query(
                    "SELECT stock_quantity-" +
                      answers.order +
                      " FROM products WHERE id=" +
                      answers.productID,
                    function(err, result, fields) {
                      var result = Object.values(result[0]);
                      console.log(
                        "New Stock: " +
                          result +
                          "\n\nThank you for your purchase!"
                      );
                      if (err) throw err;
                    }
                  );
                }
              );
            });
        }
      );
    }
  });
