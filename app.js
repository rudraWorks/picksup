const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const generalRoutes = require('./routes/generalRoutes')
const authRoutes = require('./routes/authRoutes')
const {checkAuth} = require('./middlewares/checkAuth')
const seq = require('./models/seq_config')

const DB = "mongodb://127.0.0.1:27017/cashback"
mongoose.connect(DB,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{console.log("connected to db")}).catch(()=>{"error connecting"})

const app = express()

app.set('view engine','ejs')
app.use(express.json())
app.use(cookieParser()) 
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))

app.use(checkAuth)
app.use(generalRoutes)
app.use(authRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('listening to port '+PORT)
})