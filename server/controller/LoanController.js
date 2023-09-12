const con = require("../dbConfig");
const nodemailer = require('nodemailer');
const { emailPassword, emailUser } = require("../securityDetails");

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
                                    user: emailUser,
                                    pass: emailPassword
                                }
                            })
                            
                            const mailOption = {
                                from: emailUser,
                                to: studentData[0].email,
                                subject: `Loan Request for ${studentData[0].f_name} ${studentData[0].l_name}`,
                                text: `Thank you for submitting a request for ${result[0].item_name}. The item should be approved by staff soon and you'll receive a confirmation email when it is complete.`
                            }
        
                            transporter.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    console.log(error)
                                    res.status(406).json({ response: 'rejected' })
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
 
module.exports.loan_approve = (req, res) => {
    // Patch Request
    // Takes in two o

    const date = new Date()   
    let lastUpdated = `'${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, "0")}-${date.getDate()}'`

    // 1. Get loan information based on the ID parsed in
    // 2. Get student information based on the loan data. 
    // 3. Update loan data based on the teachers staff code which will be parsed into the request. (Will first need to retrieve this. )
    con.query(`select * from loan where loan_id = ${req.body.loan_id}`, function (err, result) {
        if (err) {
            console.log(`Error Code: ${err.code}`)
            console.log(`Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            var loanData = result[0]
            con.query(`select f_name, l_name, email from student where student_id = ${loanData.student_id}`, function (err, result) {
                if (err) {
                    console.log(`Error Code: ${err.code}`)
                    console.log(`Error Message: ${err.sqlMessage}`)
                    res.status(406).json({ response: 'rejected' })
                } else {
                    var studentData = result[0]
                    con.query(`select staff_id, f_name, l_name from staff where staff_code = ${req.body.staff_code}`, function (err, result) {
                        if (err) {
                            console.log(`Error Code: ${err.code}`)
                            console.log(`Error Message: ${err.sqlMessage}`)
                            res.status(406).json({ response: 'rejected' })
                        } else {
                            var staffData = result[0]
                            con.query(`update loan set staff_id=${staffData.staff_id}, loan_status='Approved', last_updated = '${lastUpdated}, loan_date = '${req.body.loan_date}', return_date = '${req.body.return_date}' where loan_id=${req.body.loan_id}`, function (err, result) {
                                if (err) {
                                    console.log(`Error Code: ${err.code}`)
                                    console.log(`Error Message: ${err.sqlMessage}`)
                                    res.status(406).json({ response: 'rejected' })
                                } else {
                                    con.query(`select item_name from item where item_id = ${loanData.item_id}`, function (err, result) {
                                        if (err) {
                                            console.log(`Error Code: ${err.code}`)
                                            console.log(`Error Message: ${err.sqlMessage}`)
                                            res.status(406).json({ response: 'rejected' })
                                        } else {
                                            var itemData = result[0]
                                            const transporter = nodemailer.createTransport({
                                                service: 'Gmail',
                                                auth: {
                                                    user: emailUser,
                                                    pass: emailPassword
                                                }
                                            })

                                            const mailOption = {
                                                from: emailUser,
                                                to: studentData.email,
                                                subject: `Loan Request for ${itemData.item_name} has been approved.`,
                                                text: `Hi, ${studentData.f_name} ${studentData.l_name} Your loan request for ${itemData.item_name} has been approved by ${staffData.f_name} ${staffData.l_name}.`
                                            }

                                            transporter.sendMail(mailOption, (error, info) => {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(406).json({ response: 'rejected' })
                                                } else {
                                                    res.status(201).json({ response: `Loan Request has been approved for ${studentData.f_name} ${studentData.l_name}`})
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports.loan_decline = (req, res) => {
     // Patch Request
    // Takes in two o
    console.log(1)
    const date = new Date()   
    let lastUpdated = `'${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, "0")}-${date.getDate()}'`

    // 1. Get loan information based on the ID parsed in
    // 2. Get student information based on the loan data. 
    // 3. Update loan data based on the teachers staff code which will be parsed into the request. (Will first need to retrieve this. )
    con.query(`select * from loan where loan_id = ${req.body.loan_id}`, function (err, result) {
        if (err) {
            console.log(`Error Code: ${err.code}`)
            console.log(`Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            var loanData = result[0]
            con.query(`select f_name, l_name, email from student where student_id = ${loanData.student_id}`, function (err, result) {
                if (err) {
                    console.log(`Error Code: ${err.code}`)
                    console.log(`Error Message: ${err.sqlMessage}`)
                    res.status(406).json({ response: 'rejected' })
                } else {
                    var studentData = result[0]
                    con.query(`select staff_id, f_name, l_name from staff where staff_code = ${req.body.staff_code}`, function (err, result) {
                        if (err) {
                            console.log(`Error Code: ${err.code}`)
                            console.log(`Error Message: ${err.sqlMessage}`)
                            res.status(406).json({ response: 'rejected' })
                        } else {
                            var staffData = result[0]
                            con.query(`update loan set staff_id=${staffData.staff_id}, loan_status='Declined', last_updated = '${lastUpdated}' where loan_id=${req.body.loan_id}`, function (err, result) {
                                if (err) {
                                    console.log(`Error Code: ${err.code}`)
                                    console.log(`Error Message: ${err.sqlMessage}`)
                                    res.status(406).json({ response: 'rejected' })
                                } else {
                                    con.query(`select item_name from item where item_id = ${loanData.item_id}`, function (err, result) {
                                        if (err) {
                                            console.log(`Error Code: ${err.code}`)
                                            console.log(`Error Message: ${err.sqlMessage}`)
                                            res.status(406).json({ response: 'rejected' })
                                        } else {
                                            var itemData = result[0]
                                            const transporter = nodemailer.createTransport({
                                                service: 'Gmail',
                                                auth: {
                                                    user: emailUser,
                                                    pass: emailPassword
                                                }
                                            })

                                            const mailOption = {
                                                from: emailUser,
                                                to: studentData.email,
                                                subject: `Loan Request for ${itemData.item_name} has been declined.`,
                                                text: `Hi, ${studentData.f_name} ${studentData.l_name} Your loan request for ${itemData.item_name} has been declined by ${staffData.f_name} ${staffData.l_name}. Please enquire with your lecturer as to why. `
                                            }

                                            transporter.sendMail(mailOption, (error, info) => {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(406).json({ response: 'rejected' })
                                                } else {
                                                    res.status(201).json({ response: `Loan Request has been declined for ${studentData.f_name} ${studentData.l_name}`})
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports.status_date = (req, res) => {
    // POST request used to find the items and there available statuses
    // For example whether an item is pending or not pending etc. 
    // Start and End Date should be parsed in

    // Step 1. Get all items. 
    // Step 2. Get loan status for all items. 
    var results = []
    con.query('select * from item', function (err, result) {
        if (err) {
            console.log(`Error Code: ${err.code}`)
            console.log(`Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            console.log(result)
            let item_data = result
            for (let index = 0; index < item_data.length; index++) {
                console.log('First for loop was hit');
                con.query(`select loan_status from loan where item_id = '${item_data[index].item_id}' and loan_date = '${req.body.loan_date}' and return_date = '${req.body.return_date}'`, function (err, result) {
                    if (err) {
                        console.log(`Error Code: ${err.code}`)
                        console.log(`Error Message: ${err.sqlMessage}`)
                        res.status(406).json({ response: 'rejected' })
                    } else {
                        console.log(result)
                        if (result.length === 0) {
                            results.push({
                                item_id: item_data[index].item_id,
                                item_name: item_data[index].item_name,
                                loan_status: 'Available'
                            })
                        } else {
                            results.push({
                                item_id: item_data[index].item_id,
                                item_name: item_data[index].item_name,
                                loan_status: result[0].loan_status
                            })
                        }
                        
                    }
                })
            }

            console.log(results)
            res.status(200).json({results})
        }
    })
}

module.exports.pending = (req, res) => {
    // GET response to get pending requests
    res.status(200).json({ response: 'accepted' })
}