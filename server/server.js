const express = require('express');
const rentalRoutes = require('./routes/RentalRoutes');
const dbConfig = require('./dbConfig')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(rentalRoutes)