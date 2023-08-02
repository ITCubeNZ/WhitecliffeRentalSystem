const express = require('express');
const rentalRoutes = require('./routes/RentalRoutes')

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(rentalRoutes)