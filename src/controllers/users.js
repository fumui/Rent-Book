require('dotenv').config()
const modelUsers = require('../models/users')

module.exports = {
    registerUser : (req, res)=>{
        const crypto = require('crypto-js')
        const hashedPassword = crypto.SHA256(req.body.password)
        const hashedPasswordString = hashedPassword.toString(crypto.enc.Hex)
        const data = {
            username : req.body.username,
            password : hashedPasswordString,
            email    : req.body.email
        }
        modelUsers.getAllUsersWithEmailOrUsername(data.email, data.username)
            .then(result => {
                if(result.length == 0){
                    return modelUsers.registerUser(data)
                }
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
                        email: result[0].email
                    }
                    jwt.sign(payload, process.env.JWT_SECRET, (err, token)=>{
                        req.headers.authorization = token
                        if(err){
                            console.error(err)
                        }
                        res.json(token)
                    })
                }
                else
                    return res.json({message:"username or password is wrong"})
            })
            .catch(err => console.error(err))
    },
    verifyTokenMiddleware:(req, res, next)=>{
        const bearerHeader = req.headers['authorization']
        if(bearerHeader !== undefined){
            const bearer = bearerHeader.split(' ')
            req.token = bearer[1]
            next()
        }else{
            res.sendStatus(403)
        }
    },
    verifyToken:(req)=>{
        const jwt = require('jsonwebtoken')
        return jwt.verify(req.token, process.env.JWT_SECRET)
    }
}