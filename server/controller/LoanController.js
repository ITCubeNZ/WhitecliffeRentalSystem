const con = require("../dbConfig");

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
    con.query(`SELECT * FROM item WHERE item_name LIKE "%${req.params.searchTerm}%"`, function (err, result, fields) {
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
    con.query(`SELECT * FROM item WHERE item_code = ${req.params.searchTerm}`, function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(201).json({ response: result })
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
    con.query(`SELECT * FROM item WHERE item_description LIKE "%${req.params.searchTerm}%"`, function(err, result, feilds) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`)
            res.status(406).json({ response: 'rejected' })
        } else {
            res.status(201).json({ response: result })
        }
    })
}