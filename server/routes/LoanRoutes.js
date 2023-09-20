const { Router } = require('express')
const loanController = require('../controller/LoanController')
const router = Router()

router.get('/api/items', loanController.items_get)
router.get('/api/item/:id', loanController.item_get)
router.get('/api/loans', loanController.loans_get)
router.get('/api/loans/:id', loanController.loan_get)
router.get('/api/loans/item/:id', loanController.loan_item_get)
router.get('/api/get_requests', loanController.get_requests)
router.post('/api/search/', loanController.item_search)
router.post('/api/search/code', loanController.item_search_code)
router.post('/api/search/location', loanController.item_search_location)
router.post('/api/reservations', loanController.reservation)
router.patch('/api/reservations', loanController.reservation)

module.exports = router