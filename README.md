# Amazon-CLI
Amazon Command Line Interface Application

## Description

This CLI-Application uses inquirer and mysql to pair up creating a database/interface for users to shop on the command line.

## Gif of the App In Action
![Alt Text](https://media.giphy.com/media/U5Ileus4uXtAv8pBYp/giphy.gif)
### Technologies Used

- Javascript
  - Node.js
    - Inquirer package
    - MySQL package
- MySQL

### How The App Was Created

Create a database through terminal or through MySQL Workbench. Once created, populate the database with 10 items that users would like to buy. Include price, stock quantity, price, and ID. After that's been created. Create the logic needed for the app. Which includes learning about the various package documentations and how to install using npm, which can be found [here](https://www.npmjs.com/package/inquirer)(inquirer). Also, which can be found [here](https://www.npmjs.com/package/mysql)(mysql).

Create the logic for the file 'bamazon.js'. Using Query Connections, I was able to define how I wanted the app to run pairing the mysql and node.js together. The syntax for the query connections can be a little tricky however, studying the documentation will get you past that.

### Future Enhancements

In the future I would love to work with a bigger database and make it more user friendly by returning the command line to HTML and work from there by using express.js to create the server and send it to the front end.
