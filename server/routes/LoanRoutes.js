const { Router } = require('express')
const loanController = require('../controller/LoanController')
const router = Router()

router.get('/api/items', loanController.items_get)
router.get('/api/item/:id', loanController.item_get)
router.get('/api/rentals', loanController.loans_get)
router.get('/api/rentals/:id', loanController.loan_get)
router.get('/api/rentals/item/:id', loanController.loan_item_get)

module.exports = router