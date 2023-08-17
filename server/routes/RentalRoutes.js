const { Router } = require('express')
const rentalController = require('../controller/RentalController')
const router = Router()

router.get('/api/items', rentalController.items_get)
module.exports = router