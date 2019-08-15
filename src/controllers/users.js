require('dotenv').config()
const modelUsers = require('../models/users')

module.exports = {
    registerUser : (req, res)=>{
        const crypto = require('crypto-js')

        const Joi = require('@hapi/joi');
        const userData = {
            username : req.body.username,
            password : req.body.password,
            email    : req.body.email,
            level    : 'regular'
        }
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(8).required(),
            email: Joi.string().email({ minDomainSegments: 2 }),
            level : Joi.string()
        })
        const result = Joi.validate(userData,schema)
        if(result.error != null){
            res.json({message: "user data not valid"})
            return
        }
            
        const hashedPassword = crypto.SHA256(userData.password)
        userData.password = hashedPassword.toString(crypto.enc.Hex)
        
        modelUsers.getAllUsersWithEmailOrUsername(userData.email, userData.username)
            .then(result => {
                if(result.length == 0)
                    return modelUsers.registerUser(userData)
                else
                    return res.json({message : "Username or email already registered"})
            })
            .catch(err => console.error(err))
            .then(result => res.json(result))
    },
    login : (req, res)=>{
        const crypto = require('crypto-js')
        const hashedPassword = crypto.SHA256(req.body.password)
        const hashedPasswordString = hashedPassword.toString(crypto.enc.Hex)
        const email = req.body.email
        modelUsers.login(email, hashedPasswordString)
            .then(result => {
                if(result.length != 0){
                    const jwt = require('jsonwebtoken');
                    const payload = {
                        id : result[0].id,
                        email: result[0].email,
                        level : result[0].level
                    }
                    jwt.sign(payload, process.env.JWT_SECRET, (err, token)=>{
                        if(err){
                            console.error(err)
                        }
                        res.json(token)
                    })
                }
                else
                    return res.json({message:"email or password is wrong"})
            })
            .catch(err => console.error(err))
    },
    verifyTokenMiddleware:(req, res, next)=>{
        const bearerHeader = req.headers['authorization']
        if(bearerHeader !== undefined){
            const jwt = require('jsonwebtoken')
            const bearer = bearerHeader.split(' ')
            const token = bearer[1]
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if(decoded){
                    req.user_id = decoded.id
                    req.user_email = decoded.email
                    req.level = decoded.level
                    next()
                }else
                    throw new Error(decoded)
            }catch(err){
                console.error(err)
                res.sendStatus(403)
            }
        }else
            res.sendStatus(403)
    },
    verifyAdminPrevilege : (req, res, next) => {
        if(req.level == 'admin')
            next()
        else
            res.sendStatus(403)
    }
}