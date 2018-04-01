var express = require('express');
var router = express.Router();
const ExpenseController = require('../controllers/Expense');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        site: 'gastos',
        api: 'v1'
    });
});

router.post('/save', ExpenseController.save);
router.get('/consult', ExpenseController.consult);

module.exports = router;