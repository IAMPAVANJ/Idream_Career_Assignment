
const jwt=require('jsonwebtoken')
const userMiddleware = (req, resp, next) => {
    const token = req.headers.authorization
    try {
        if (token) {
            const decodedToken = jwt.decode(token);
            const userId = decodedToken.id;
            req.user = userId
            next()
            
        }
        else {
            resp.json({ success: false, msg: 'token expired, access denied' })
        }
    }
    catch (err) {
        resp.status(401).json({ success: false, msg: err.msg })
    }
}
module.exports=userMiddleware