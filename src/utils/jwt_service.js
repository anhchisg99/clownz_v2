import jwt from 'jsonwebtoken'
import {JWT} from '../config/config.js'

const signAccessToken = async(userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            userId
        }
        const secret = JWT.jwt
        const options = {
            expiresIn: JWT.jwtExp
        }
        jwt.sign(payload,secret,options,(err,token)=>{
            resolve(token)
        })
    })
}
const verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
      return next(createError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, JWT.jwt, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return next(createError.Unauthorized());
        }
        return next(createError.Unauthorized(err.message));
      }
      req.payload = payload;
      next();
    });
  };
export {
    signAccessToken,
    verifyAccessToken
}