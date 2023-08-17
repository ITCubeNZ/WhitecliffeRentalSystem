const mysql = require('mysql');
const { dbPassword } = require('./securityDetails');

var con = mysql.createConnection({
    host: "whitecliffe2.mysql.database.azure.com",
    user: "dbadmin",
    password: dbPassword,
    database: "whitecliffe",
    port: 3306,
    useSSL: true
})

con.connect(function(error)  {
    if (!!error) {
        console.log(error);
    } else {
        console.log("Database Connected");
        let staffSQL = "CREATE TABLE staff (staff_id INT AUTO_INCREMENT PRIMARY KEY, \
            f_name VARCHAR(100), \
            l_name VARCHAR(100), \
            department VARCHAR(50), \
            staff_code INT, \
            username VARCHAR(30), \
            password VARCHAR(50), \
            phone INT, \
            email VARCHAR(50), \
            last_updated DATE \
            );"
        con.query(staffSQL, function (err, result) {
            if (err) {
                if (!!err.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log(err.code)
                    console.log(err.sqlMessage)    
                }
            } else {
                console.log('Staff Table Created')
            }
        })
        let studentSQL = "CREATE TABLE student (student_id INT AUTO_INCREMENT PRIMARY KEY, \
            f_name VARCHAR(100), \
            l_name VARCHAR(100), \
            degree VARCHAR(75), \
            whitecliffe_id INT, \
            username VARCHAR(30), \
            password VARCHAR(50), \
            phone INT, \
            email VARCHAR(50), \
            last_updated DATE \
            );"
        con.query(studentSQL, function (err, result) {
            if (err) {
                if (!!err.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log(err.code)
                    console.log(err.sqlMessage)    
                }
            } else {
                console.log('Student Table Created')
            }
        })
        let itemSQL = "CREATE TABLE item (item_id INT AUTO_INCREMENT PRIMARY KEY, \
            item_name VARCHAR(50), \
            item_description VARcHAR(255), \
            item_code INT, \
            replacement_cost float, \
            purchase_year DATE, \
            item_status ENUM('Active', 'Inactive'), \
            item_location VARCHAR(100), \
            last_updated DATE \
            );"
        con.query(itemSQL, function (err, result) {
            if (err) {
                if (!!err.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log(err.code)
                    console.log(err.sqlMessage)    
                }
            } else {
                console.log('Item Table Created.')
            }
        })
        let rentalSQL = "CREATE TABLE rental (rental_id INT AUTO_INCREMENT PRIMARY KEY, \
            student_id INT, \
            staff_id INT, \
            item_id INT, \
            rental_status ENUM('Pending', 'Approved', 'Declined'), \
            rental_date DATE, \
            return_date DATE, \
            return_condition VARCHAR(255), \
            last_updated DATE, \
            FOREIGN KEY (student_id) REFERENCES student(student_id), \
            FOREIGN KEY (staff_id) REFERENCES staff(staff_id), \
            FOREIGN KEY (item_id) REFERENCES item(item_id)\
            );"
        con.query(rentalSQL, function (err, result) {
            if (err) {
                if (!!err.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log(err.code)
                    console.log(err.sqlMessage)    
                }
            } else {
                console.log('Rental Table Created.');
            }
        })
    }
})

module.exports = con




