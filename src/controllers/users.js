require('dotenv').config()
const modelUsers = require('../models/users')
isFormValid = (data)=>{
    const Joi = require('@hapi/joi');
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        level : Joi.string()
    })
    const result = Joi.validate(data,schema)
    if(result.error == null) return true
    else return false
}
hash = (string)=>{
    const crypto = require('crypto-js')
    return crypto.SHA256(string)
                 .toString(crypto.enc.Hex)
};
module.exports = {
    registerUser : (req, res)=>{

        const userData = {
            username : req.body.username,
            password : req.body.password,
            email    : req.body.email,
            level    : 'regular'
        }

        if(!isFormValid(userData)){
            return res.json({message: "user data not valid"}) 
        }
        
        userData.password = hash(userData.password)
        
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
    registerAdmin : (req, res)=>{

        const userData = {
            username : req.body.username,
            password : req.body.password,
            email    : req.body.email,
            level    : 'admin'
        }

        if(!isFormValid(userData)){
            return res.json({message: "user data not valid"}) 
        }
        
        userData.password = hash(userData.password)
        
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
        const hashedPassword = hash(req.body.password)
        const email = req.body.email
        modelUsers.login(email, hashedPassword)
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
    getAllUsers : (req, res)=>{
        const keyword = req.query.search;
        const sort = req.query.sortby;
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const start = (Number(page) - 1) * limit 
        
        modelUsers.getAllUsers(keyword, sort, start, limit)
            .then(result => {
                if(result.length != 0 ) return res.json(result)
                else return res.json({message:"User not found"})
            })
            .catch(err => {
                console.error(err)
                return res.sendStatus(500)
            })
        
    },
    getOneUser : (req, res)=>{
        const id = req.params.id;
        
        modelUsers.getOneUser(id)
            .then(result => {
                if(result.length != 0 ) return res.json(result)
                else return res.json({message:"User not found"})
            })
            .catch(err => {
                console.error(err)
                return res.sendStatus(500)
            })
        
    },
}