const { Router } = require('express')
const loanController = require('../controller/LoanController')
const router = Router()

router.get('/api/items', loanController.items_get)
router.get('/api/item/:id', loanController.item_get)
router.get('/api/loans', loanController.loans_get)
router.get('/api/loans/:id', loanController.loan_get)
router.get('/api/loans/item/:id', loanController.loan_item_get)
router.post('/api/loans/request', loanController.loan_request)
router.get('/api/loans/pending', loanController.pending_requests_get)
router.post('/api/items/search/item_code', loanController.item_search_code)

module.exports = router