const {Router} = require('express')
const generalController = require('../controllers/generalController')

const router = Router()

router.get('/home',generalController.root)
router.get('/',generalController.root)
router.get('/team',generalController.team)
router.get('/contact',generalController.contact)
router.get('/journey',generalController.journey)
router.get('/store',generalController.store)
router.post('/removeItemFromCart',generalController.removeItemFromCart)
router.post('/addItemToCart',generalController.addItemToCart)
router.post('/filterItems',generalController.filterItems)

module.exports=router

