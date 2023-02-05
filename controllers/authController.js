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
    let fetchUser = await Users.findOne({username})
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

    // let Test = itemsDb.items
    // let it = await Test.findAll({})
    // return res.json(it)
    // await Test.create({username:'testing'})
    // let Users = db.users

    // // let data = await Users.build({username,password,email,fullname})
    // // await data.save()

    // let data = await Users.create({username:'me',email:'sdaaf@dafad.com',fullname:'dfa dfa dafa',password:'dfadfa4'})
    // console.log(data.dataValues)

    // let data = await Users.update({fullname:'final'},{
    //     where:{
    //         username:'testingUser'
    //     }
    // })

    // await Users.destroy({
    //     where:{
    //         username:'me'
    //     }
    // })

    // await Users.destroy({
    //     truncate:true
    // })

    // let data = await Users.findAll({
    //     attributes:[
    //         'id',
    //         'username',
    //         'email',
    //         ['fullname','Full name of the user']
    //     ],
    //     where:{
    //         // id:[1,2,3]
    //         id:{
    //             [Op.gt]:2
    //         }
    //     }
    // }) // findOne({})

    // return res.json({data})
    // console.log(data)

    let Users = usersDb.users
    let fetchUser = await Users.findOne({username:res.locals.user})
    // console.log(fetchUser)
    return res.render('auth/myprofile',fetchUser.dataValues)
}

module.exports.logout = (req,res) =>{
    if(!res.locals.isAuthenticated)
        return res.render('generalViews/404')
    res.cookie('kicksup',createToken(''),{httpOnly:true,maxAge:2})
    return res.redirect('/')
}