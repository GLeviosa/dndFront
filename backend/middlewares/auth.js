const jwt = require("jsonwebtoken");
const author = require("../config/author.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        res.status(401).send({ error: "No token provided" });
        res.end();
        return;
    };

    const parts = authHeader.split(" ");

    if (!parts.lenght === 2){
        res.status(401).send({ error: "Token error" });
        res.end();
        return;
    };

    const [ scheme, token ] = parts;
    console.log(scheme)
    if (!/^Bearer$/i.test(scheme)) {
        res.status(401).send({ error: "Token malformatted" });
        res.end();
        return;
    };

    jwt.verify(token, author.secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "Invalid token" });
            res.end();
            return;
        };
        req.userId = decoded.id;
        next();
        return; 
    });

}