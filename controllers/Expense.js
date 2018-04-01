const ExpenseService = require('../services/ExpenseService');
const ErrorHelper = require('../helpers/ErrorHelper')

exports.save = (req, res) => {
    const id = req.body.id;
    const identifier = req.body.identifier;

    const date = req.body.date;
    const description = req.body.description;
    const paymentMethod = req.body.paymentMethod; // cash, credit card, debit card
    const amount = req.body.amount;
    const category = req.body.category;

    try{
        ErrorHelper.verifyRequiredAndThrowException({id, identifier, date, description, paymentMethod, amount, category});
        ExpenseService.save(id, identifier, date, description, paymentMethod, amount, category)
            .then(r => res.json(r))
            .catch(err => ErrorHelper.catchError(res, err));
    }catch(err){
        ErrorHelper.catchError(res, err);
    }

};

exports.consult = (req, res) => {
    const id = req.query.id;
    const identifier = req.query.identifier;

    try {
        ErrorHelper.verifyRequiredAndThrowException({id, identifier});
        ExpenseService.consult(id, identifier)
            .then(r => res.json(r))
            .catch(err => ErrorHelper.catchError(res, err));
    } catch (err) {
        ErrorHelper.catchError(res, err);
    }
};