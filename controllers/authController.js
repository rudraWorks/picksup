// this file is responsible for handling all user authentication related tasks like login, signup, logout, myProfile

const jwt = require('jsonwebtoken')
const {usersDb,itemsDb} = require('../models/seq_config')
const {Sequelize,Op} = require('sequelize')

module.exports.register = async (req,res) =>{
    if(res.locals.isAuthenticated)
        return res.redirect('/')
    return res.render('auth/register')
}

module.exports.login = async (req,res) =>{
    if(res.locals.isAuthenticated)
        return res.redirect('/')
    return res.render('auth/login')
}

let maxAge = 1000*60*60*24*5 // 5 days 
let createToken = (id) =>{
    return jwt.sign({id},'srudra754',{expiresIn:maxAge})
}


module.exports.registerPost = async (req,res) =>{
    if(res.locals.isAuthenticated)
        return res.json({success:false,message:"already registered"})
    let {username,email,fullname,password} = req.body

    username=username.trim()
    email=email.trim()
    fullname=fullname.trim()
    password=password.trim()

    if(username=="")return res.json({success:false,message:"username can't be empty",errorCode:"username"})
    if(fullname=="")return res.json({success:false,message:"fullname can't be empty",errorCode:"fullname"})
    if(email=="")return res.json({success:false,message:"email can't be empty",errorCode:"email"})
    if(password=="")return res.json({success:false,message:"password can't be empty",errorCode:"password"})

    if(username.length<=5)return res.json({success:false,message:"username length too short! must be more than 5 characters.",errorCode:"username"})
    if(fullname.length<=3)return res.json({success:false,message:"fullname length too short!",errorCode:"fullname"})
    if(email.length<=3)return res.json({success:false,message:"email length too short!",errorCode:"email"})
    if(password.length<=4)return res.json({success:false,message:"password length too short! must be more than 4 characters.",errorCode:"password"})


    let Users = usersDb.users
    let fetchUser = (await Users.findOne({where:{
        username:username
    }}))
    if(fetchUser)
        return res.json({success:false,message:"this username is already registered!",errorCode:"username"})

    let createUser = await Users.create({username,fullname,password,email})
    res.cookie('kicksup',createToken(createUser.username),{httpOnly:true,maxAge:maxAge})

    return res.json({success:true})
}  


module.exports.loginPost = async (req,res) =>{
    if(res.locals.isAuthenticated)
        return res.json({success:false,message:"already registered"})
    let {username,password} = req.body

    username=username.trim()
    password=password.trim()

    if(username=="")return res.json({success:false,message:"username can't be empty",errorCode:"username"})
    if(password=="")return res.json({success:false,message:"password can't be empty",errorCode:"password"})

    let Users = usersDb.users
    let fetchUser = await Users.findOne({
        where:{
            username:username
        }
    })
    if(!fetchUser)
        return res.json({success:false,message:"username not found!",errorCode:"username"})
    else{
        if(fetchUser.password!=password)
            return res.json({success:false,message:"incorrect password!",errorCode:"password"})
    }
    res.cookie('kicksup',createToken(fetchUser.username),{httpOnly:true,maxAge:maxAge})

    return res.json({success:true})
}  

module.exports.myprofile = async (req,res) =>{

    if(!res.locals.isAuthenticated)
        return res.render('generalViews/404')

    let Users = usersDb.users
    let fetchUser = await Users.findOne({where:{
        username:res.locals.user
    }})
    return res.render('auth/myprofile',fetchUser.dataValues)
}

module.exports.logout = (req,res) =>{
    if(!res.locals.isAuthenticated)
        return res.render('generalViews/404')
    res.cookie('kicksup',createToken(''),{httpOnly:true,maxAge:2})
    return res.redirect('/')
}