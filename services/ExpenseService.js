const UserService = require('./UserService');
const Expense = require('../model/Expense');

exports.save = (id, identifier, date, description, paymentMethod, amount, category) => {
    return UserService.getUserOrCreate(id, identifier).then(userValidated => {
        console.log('[save] User is validated', userValidated);
        return Expense.then(e => {
            console.log('[save] Will create expense');
            return e.insertOne({id, date, description, paymentMethod, amount, category});
        })
    });
};

exports.consult = (id, identifier) => {
    return UserService.getUserOrCreate(id, identifier).then(userValidated => {
        console.log('[consult] User is validated', userValidated);
        return Expense.then(e => {
            console.log('[consult] Will get expenses');
            return e.find({id}).toArray();
        })
    });
};