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

module.exports.reservation = (req, res) => {
    // Used to reserve equipment.
    // Post/Patch Request

    const student_email = req.body.student_email
    const staff_email = req.body.staff_email
    const return_condition = req.body.return_condition
    const loan_date = req.body.loan_date
    const return_date = req.body.return_condition
    const loan_id = req.body.loan_id
    const item_id = req.body.item_id

    con.query(`select staff_id, f_name, l_name from staff where email = '${staff_email}'`, function (err, result) {
        if (err) {
            console.log(`Error Code: ${err.code}`)
            console.log(`Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            const staffData = result
        }
    })

    const date = new Date()   
    let lastUpdated = `'${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, "0")}-${date.getDate()}'`
    // Get student data
    con.query(`select student_id, f_name, l_name where email = '${student_email}}'`, function(err, result) {
        if (err) {
            console.log(`Error Code: ${err.code}`)
            console.log(`Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            // Stores student data in a result
            var studentData = result
            let conflict = false

            for (let index = 0; index < result.length; index++) {
                if (result[index].loan_date < loan_date) {
                    if (result[index].return_date >= loan_date) {
                        conflict = true
                    }
                }
            }

            if (conflict === true) {
                res.status(200).json({ response: 'Booking conflict.' })
            } else {
                if (loan_id === undefined) {
                    // Checks if the loan_id is supplied, if it is not we know that it will be a post request
                    con.query(`insert into  loan (student_id, item_id, loan_status, loan_date, return_date, last_updated) values (${studentData[0].student_id}, ${item_id}, 'Pending', '${loan_date}', '${return_date}', '${lastUpdated}')`, function (err, result) {
                        if (err) {
                            console.log(`Error Code: ${err.code}`)
                            console.log(`Error Message: ${err.sqlMessage}`)
                            res.status(406).json({ response: 'rejected' })
                        } else {
                            con.query(`select select loan_date, return_date from loan where item_id = ${item_id}`, function (err, result) {
                                if (err) {
                                    console.log(`Error Code: ${err.code}`)
                                    console.log(`Error Message: ${err.sqlMessage}`)
                                    res.status(406).json({ response: 'rejected' })
                                } else {
                                    const transport = nodemailer.createTransport({
                                        service: 'Gmail',
                                        auth: {
                                            user: emailUser,
                                            pass: emailPassword
                                        }
                                    })
                    
                                    const mailOption = {
                                        from: emailUser,
                                        to: student_email,
                                        subject: `Loan Request for ${studentData[0].f_name} ${studentData[0].l_name}`,
                                        text: `Hi ${studentData[0].f_name} ${studentData[0].l_name} your loan request has been submitted. `
                                    }
                    
                                    transport.sendMail(mailOption, (error, info) => {
                                        if (error) {
                                            console.log('There was an error with nodemailer.')
                                            console.log(error)
                                            res.status(406).json({ response: 'nodemailer error' })
                                        } else {
                                            res.status(201).json({ response: 'Loan Request Submitted. Confirmation email sent.'})
                                        }
                                    })
                                }
                            })
                            
                        }
                    })                
                } else if (loan_status === 'Approved') {
                    // If loan status is accepted we know its accepting it.
                    con.query(`update loan set staff_id=${staffData[0].staff_id}, loan_status='Approved', last_updated='${lastUpdated}', loan_date='${loan_date}', return_date='${return_date}', return_condition='${return_condition}' where loan_id = ${loan_id}`, function (err, result) {
                        if (err) {
                            console.log(`Error Code: ${err.code}`)
                            console.log(`Error Message: ${err.sqlMessage}`)
                            res.status(406).json({ response: 'rejected' })
                        } else {
                            const transport = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: emailUser,
                                    pass: emailPassword
                                }
                            })
            
                            const mailOption = {
                                from: emailUser,
                                to: student_email,
                                subject: `Loan Request for ${studentData[0].f_name} ${studentData[0].l_name}`,
                                text: `Hi ${studentData[0].f_name} ${studentData[0].l_name} your loan request has been approved. Please contact your lecturer for more information. `
                            }
            
                            transport.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    console.log('There was an error with nodemailer.')
                                    console.log(error)
                                    res.status(406).json({ response: 'nodemailer error' })
                                } else {
                                    res.status(201).json({ response: 'Loan Request Declined. Confirmation email sent.'})
                                }
                            })
                        }
                    }) 
                } else if (loan_status === 'Declined') {
                    con.query(`update loan set staff_id=${staffData[0].staff_id}, loan_status='Declined', last_updated='${lastUpdated}' where loan_id = ${loan_id}`, function (err, result) {
                        if (err) {
                            console.log(`Error Code: ${err.code}`)
                            console.log(`Error Message: ${err.sqlMessage}`)
                            res.status(406).json({ response: 'rejected' })
                        } else {
                            // We know its being declined.
                            const transport = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: emailUser,
                                    pass: emailPassword
                                }
                            })
            
                            const mailOption = {
                                from: emailUser,
                                to: student_email,
                                subject: `Loan Request for ${studentData[0].f_name} ${studentData[0].l_name}`,
                                text: `Hi ${studentData[0].f_name} ${studentData[0].l_name} your loan request has unfortuantely been declined. Please contact your lecturer for more information. `
                            }
            
                            transport.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    console.log('There was an error with nodemailer.')
                                    console.log(error)
                                    res.status(406).json({ response: 'nodemailer error' })
                                } else {
                                    res.status(201).json({ response: 'Loan Request Declined. Confirmation email sent.'})
                                }
                            })
                        }
                    })
                         
                }
            }
        }
    })

    

}

module.exports.get_requests = (req, res) => {
    con.query("select loan.loan_id, student.email, item.item_name, student.f_name, student.l_name, loan.loan_date, loan.return_date from ((loan inner join student on loan.student_id = student.student_id) inner join item on loan.item_id = item.item_id)", function (err, result) {
        if (err) {
            console.log(`Error Code: ${err.code}`)
            console.log(`Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            if (result.length === 0) {
                res.status(404).json({ response: 'No data found.'   })
            }
            res.status(200).json({result})
        }
    })
}