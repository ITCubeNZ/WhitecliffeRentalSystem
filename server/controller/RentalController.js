const con = require("../dbConfig");

module.exports.items_get = (req, res) => {
    // Used to get all items from the Database and return their information.
    con.query("SELECT * FROM item", function (err, result, fields) {
        if (err) {
            console.log(`Query Error Code: ${err.code}`)
            console.log(`Query Error Message: ${err.sqlMessage}`);
            res.status(406).json({ response: 'rejected' })
        } else {
            console.log(result)
            res.status(200).json({ response: 'accepted' })
        }
    })
}   