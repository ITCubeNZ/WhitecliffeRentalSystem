const { Router } = require('express')
const loanController = require('../controller/LoanController')
const router = Router()

router.get('/api/items', loanController.items_get)
router.get('/api/item/:id', loanController.item_get)
router.get('/api/loans', loanController.loans_get)
router.get('/api/loans/:id', loanController.loan_get)
router.get('/api/loans/item/:id', loanController.loan_item_get)
router.get('/api/get_requests', loanController.get_requests)
router.post('/api/loans/request', loanController.loan_request)
router.patch('/api/loans/approve', loanController.loan_approve)
router.patch('/api/loans/decline', loanController.loan_decline)
router.post('/api/loans/status', loanController.status_date)

module.exports = router