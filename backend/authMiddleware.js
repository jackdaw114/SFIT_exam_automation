require('dotenv').config()
const jwt = require('jsonwebtoken')

function authAdmin(req, res, next) {

    const jwtToken = req.cookies.jwtToken;
    if (jwtToken == null) return res.sendStatus(401);

    jwt.verify(jwtToken, process.env.TEACHER_SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = decoded;
        console.log(decoded);
        next(); // Proceed to the next middleware or route handler
    });

}

function authTeacher(req, res, next) {

    const jwtToken = req.cookies.jwtToken;
    if (jwtToken == null) return res.sendStatus(401);

    jwt.verify(jwtToken, process.env.ADMIN_SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = decoded;
        console.log(decoded);
        next(); // Proceed to the next middleware or route handler
    });

}
module.exports = { authAdmin, authTeacher };