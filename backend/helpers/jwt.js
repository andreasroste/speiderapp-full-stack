const jwt = require('jsonwebtoken')
const serversecret = process.env.JWT_SECRET || 'j6XNd8jcZk4Dhoc15f774FkDXLoZHs1l'

function signToken(data) {
    return jwt.sign(data, serversecret)
}

function middleware(req, res, next) {
    const bearerHeader = req.header('Authorization') || req.params.jwt;
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, serversecret, (err, data) => {
            if(err) res.status(403).json({err});
            req.user = data;
            next();
        })
    }else{
        res.status(403).json({err: 'No Bearertoken specified'});
    }
}

module.exports = {
    signToken,
    middleware
}