const jwt = require('jsonwebtoken');
const ENV = require('../config/env.Config');

//  Local Token 
const generateLocalToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        ENV.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

//  Master Admin
const generateMasterToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            email: user.email,
            status: user.status,
            CRUD: user.CRUD
        },
        ENV.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

module.exports = {
    generateLocalToken,
    generateMasterToken
};
