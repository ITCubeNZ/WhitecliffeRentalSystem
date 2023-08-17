let nodemailer = require('nodemailer')
const { emailPassword } = require('../securityDetails')


module.exports.search_get = (req, res) => {
    res.status(200).json({ response: "Search successful." })
}

module.exports.item_get = (req, res) => {
    res.status(200).json({ response: "Got Item" })
}

module.exports.item_add = (req, res) => {
    res.status(201).json({ response: "Added Item" })
}

module.exports.item_update = (req, res) => {
    res.status(201).json({ response: "Modified Item" })
}

module.exports.item_delete = (req, res) => {
    res.status(200).json({ response: "Deleted Item" })
}

module.exports.item_bookings = (req, res) => {
    res.status(200).json({ response: "Bookings for ID." })
}

module.exports.booking_approve = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'whitecliffea@gmail.com',
            pass: emailPassword
        }
    })

    let mailOptions = {
        from: 'whitecliffea@gmail.com',
        to: 'benjamincharlesolds@yahoo.com',
        subject: 'Booking has been approved',
        text: 'Your equipment has been booked!'
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    res.status(201).json({ response: 'Booking confirmed' })
}