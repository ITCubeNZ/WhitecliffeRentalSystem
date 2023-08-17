const { Router } = require('express')
const rentalController = require('../controller/RentalController')
const router = Router()

router.get('/api/items', rentalController.items_get)
router.get('/api/item/:id', rentalController.item_get)
router.get('/api/rentals', rentalController.rentals_get)
router.get('/api/rentals/:id', rentalController.rental_get)
router.get('/api/rentals/item/:id', rentalController.rental_item_get)

module.exports = router