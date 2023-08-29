const con = require("../dbConfig");
const nodemailer = require('nodemailer');
const { emailPassword } = require("../securityDetails");

module.exports.items_get = (req, res) => {
    // Used to get all items from the Database and return their information.
    con.query("SELECT * FROM item WHERE item_status = 'Active'", function (err, result, fields) {
        if (err) {
            // If there's an error within the database log with the error code and the sql error to the console and respond with a 406 error.  
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            if (result.length === 0) {
                // If there's no data responsd with a 404 error. 
                res.status(404).json({ repsonse: 'No data found.' })
            } else {
                // If data is found respond with tthe result. 
                res.status(200).json({ result })
            }

        }
    })
}

module.exports.item_get = (req, res) => {
    // Used to get a SPECIFIC item from the Database and return their information. The API should be called using the items primary key.
    con.query(`SELECT * FROM item WHERE item_id = ${req.params.id} AND item_status = 'Active'`, function (err, result, fields) {
        if (err) {
            // If there's an error within the database log with the error code and the sql error to the console and respond with a 406 error.  
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' } )
        } else {
            if (result.length === 0) {
                // If there's no data responsd with a 404 error. 
                res.status(404).json({ response: 'No data found.' })
            } else {
                // If data is found respond with tthe result. 
                res.status(200).json({ result })
            }
            
        }
    }) 
}

module.exports.loans_get = (req, res) => {
    // Used to get ALL rental requests.
    con.query(`SELECT * FROM loan`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.message}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            if (result.length === 0) {
                // If there's no data responsd with a 404 error. 
                res.status(404).json({ response: 'No data found.' })
            } else {
                // If data is found respond with tthe result. 
                res.status(200).json({ result })
            }
        }
    })
}

module.exports.loan_get = (req, res) => {
    // Used to get SPECIFIC rental requests from the database and return their information. The API should be called using the rentals priamry key.
    con.query(`SELECT * FROM loan WHERE loan_id = ${req.params.id}`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(200).json({ response: result })
        }
    })
}

module.exports.loan_item_get = (req, res) => {
    // Used to get all rental requests based on an ITEMS primary id. 
    // EXAMPLE: Get all rentals belonging to a specific monitor. 
    con.query(`SELECT * FROM loan WHERE item_id = ${req.params.id}`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(200).json({ response: result })
        }
    })
}

module.exports.item_search = (req, res) => {
    // Used to return results based on item name. 
    con.query(`SELECT * FROM item WHERE item_name LIKE "%${req.body.item_code}%"`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(201).json({ response: result })
        }
    })
}

module.exports.item_search_code = (req, res) => {
    // Searches based on Serial Number
    con.query(`SELECT * FROM item WHERE item_code = '${req.body.item_code}'`, function (err, result, fields) {
        if (err) {
            // Log errors and return a response back
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            // Check if result is empty and deliver and deliver a response based upon that.
            if (result.length === 0) {
                res.status(404).json({ response: 'No data was found' })
            } else {
                res.status(200).json({ result })
            } 
        }
    })
}

module.exports.item_search_location = (req, res) => {
    con.query(`SELECT * FROM item WHERE item_location LIKE "%${req.params.searchTerm}%"`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(201).json({ response: result })
        }
    })
}

module.exports.item_search_description = (req, res) => {
    // Searches based on item description
    con.query(`SELECT * FROM item WHERE item_description LIKE "%${req.params.searchTerm}%"`, function(err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(201).json({ response: result })
        }
    })
}

module.exports.loan_request = (req, res) => {
    // POST request for a student creating an original loan request. 
    // Gets the current date to utilise within last updated. 
    const date = new Date()   
    let lastUpdated = `'${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, "0")}-${date.getDate()}'`


    con.query(`SELECT student_id, f_name, l_name, email FROM student WHERE whitecliffe_id = ${req.body.whitecliffe_id}`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            // Store student data in result. 
            var studentData = result
            con.query(`INSERT INTO loan (student_id, item_id, loan_status, loan_date, return_date, last_updated) VALUES (${studentData[0].student_id}, ${req.body.item_id}, 'Pending', '${req.body.loan_date}', '${req.body.return_date}', ${lastUpdated})`, function (err, result, fields) {
                if  (err) {
                    console.log(`Query Error Code: ${err.code}`)
                    console.log(`Query Error Message: ${err.sqlMessage}`)
                    res.status(406).json({ response: 'rejected' })
                } else {
                    con.query(`SELECT * FROM item WHERE item_id = ${req.body.item_id}`, function (err, result, fields) {
                        if (err) {
                            console.log(`Query Error Code: ${err.code}`)
                            console.log(`Query Error Message: ${err.sqlMessage}`)
                            res.status(406).json({ response: 'rejected' })
                        } else {
                            const transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'whitecliffea@gmail.com',
                                    pass: emailPassword
                                }
                            })
                            
                            const mailOption = {
                                from: 'whitecliffea@gmail.com',
                                to: studentData[0].email,
                                subject: `Loan Request for ${studentData[0].f_name} ${studentData[0].l_name}`,
                                text: `Thank you for submitting a request for ${result[0].item_name}. The item should be approved by staff soon and you'll receive a confirmation email when it is complete.`
                            }
        
                            transporter.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    console.log(error)
                                    res.status(406).json({ response: 'Rejected' })
                                } else {
                                    // Sends a response back to the user that loan request has been submitted has been submitted.
                                    res.status(201).json({ response: `Loan Request Submitted for ${studentData[0].f_name} ${studentData[0].l_name}.`})      
                                }
                            })
                        }
                    })
                    
                }
            })
        }
    })
}

module.exports.pending_requests_get = (req, res) => {
    // Get all the pending requests
    con.query(`SELECT * FROM loan WHERE loan_status = 'Pending'`, function (err, result, fields) {
        if (err) {
            // Log the errors to the console and deliver a response back 
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            // Deliver result back
            res.status(200).json({ result })
        }
    })
}
