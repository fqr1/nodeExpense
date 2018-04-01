const User = require('../model/User')
const ErrorHelper = require('../helpers/ErrorHelper')

exports.getUser = id => {
    return User.then(u => {
        u.findOne({id}).then(debug => {
            console.log('debug Get user', debug)
            return debug
        })
    })
};

exports.createUser = (id, identifier) => {
    return User.then(u => {
        u.findOne({id}).then(existsUser => {
            console.log('existsUser?',existsUser);
            if(existsUser){
                //TODO Should throw exception?
                console.warn('User already exists');
                return null;
            }
            return u.insertOne({id, identifier});
        })
    })
};

exports.getUserOrCreate = (id, identifier) => {
    return User.then(u => {
        return u.findOne({id}).then(existsUser => {
            console.log('[getUserOrCreate] existsUser? ', existsUser);
            return existsUser
                ? validateUser(id, identifier, existsUser)
                : u.insertOne({id, identifier}).then(() => this.getUser(id));
        })
    })
};

function validateUser(id, identifier, user){
    console.log('[validateUser] user.id:', user.id)
    console.log('[validateUser] user.identifier:', user.identifier)
    console.log('[validateUser] identifier:', identifier)
    if(user.id !== id || user.identifier !== identifier){
        throw ErrorHelper.format('Usuario no coincide', 403);
    }

    return user;
}