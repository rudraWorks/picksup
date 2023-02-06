// this file is necessary for configuration of MySQL connection using Sequelize ORM

const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize('picksup','root','mysqlpassword',{
    host:'localhost',
    dialect:'mysql',
    pool:{max:5,min:0,idle:5000}
})  

sequelize.authenticate()
.then(()=>{
    console.log('connected') 
})
.catch(e=>{
    console.log(e)
})

const usersDb = {}  
usersDb.Sequelize = Sequelize
usersDb.sequelize = sequelize
usersDb.users = require('./users')(sequelize,DataTypes)

usersDb.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re-sync")
})

const itemsDb = {}
itemsDb.Sequelize = Sequelize 
itemsDb.sequelize = sequelize 
itemsDb.items = require('./items')(sequelize,DataTypes)
itemsDb.sequelize.sync({force:false})
.then(()=>{
    console.log('ok tests table')
})


const cartDb = {}
cartDb.Sequelize = Sequelize 
cartDb.sequelize = sequelize 
cartDb.cart = require('./cart')(sequelize,DataTypes)
cartDb.sequelize.sync({force:false})
.then(()=>{
    console.log('ok tests table')
})

  
module.exports = {usersDb,itemsDb,cartDb}