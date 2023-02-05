const {Router} = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.get('/register',authController.register)
router.get('/login',authController.login)
router.post('/register',authController.registerPost)
router.get('/myprofile',authController.myprofile)
router.get('/logout',authController.logout)
router.post('/login',authController.loginPost)

module.exports=router

