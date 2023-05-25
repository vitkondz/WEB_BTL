let _JWT = require('../common/_JWT');

// Kiem tra token hop le
let isAuth = async function(req, res, next) {
    let _token = req.headers.authorization;
    if (_token) {
        try {
            let authData = await _JWT.check(_token);

            req.auth = authData;
            next();
        } catch(err) {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    isAuth:isAuth
}