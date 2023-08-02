const { Router } = require('express')
const rentalController = require('../controller/RentalController')
const router = Router()

router.get('/search/:searchTerm', rentalController.search_get)
router.get('/item/:id', rentalController.item_get)
router.post('/add', rentalController.item_add)

module.exports = router