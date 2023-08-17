const { Router } = require('express')
const rentalController = require('../controller/RentalController')
const router = Router()

router.get('/search/:searchTerm', rentalController.search_get)
router.get('/inventory/get/:id', rentalController.item_get)
router.post('/inventory/add', rentalController.item_add)
router.patch('/inventory/update/:id', rentalController.item_update)
router.get('/inventory/:id/bookings', rentalController.item_bookings)
router.post('/inventory/:id/bookings/:booking/approve', rentalController.booking_approve)
router.post('/approve', rentalController.booking_approve)

module.exports = router