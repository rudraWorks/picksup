const {itemsDb,cartDb} = require('../models/seq_config')

module.exports.root = (req,res) =>{
    return res.render('generalViews/root')
}
module.exports.team = (req,res) =>{
    return res.render('generalViews/team')
}
module.exports.contact = (req,res) =>{
    return res.render('generalViews/contact')
}

module.exports.journey = (req,res) =>{
    return res.render('generalViews/journey')
}

module.exports.store = async (req,res) =>{
    let Items = itemsDb.items 
    let allItems = await Items.findAll({})

    let Cart = cartDb.cart 
    let itemsInMyCartId = await Cart.findAll({
        attributes:['product_id'],
        where:{
            username:res.locals.user
        }
    })
    let tempArr=[]
    for(let i=0;i<itemsInMyCartId.length;++i){
        if(!tempArr.includes(itemsInMyCartId[i].dataValues.product_id))
        tempArr.push(itemsInMyCartId[i].dataValues.product_id)
    }
    itemsInMyCartId=tempArr
    let itemsInMyCart=[]
    for(let i=0;i<itemsInMyCartId.length;++i){
        let t=await Items.findAll({
            where:{
                id:itemsInMyCartId[i]
            }
        })
        itemsInMyCart.push(t.dataValues)
    }
    return res.render('generalViews/store',{allItems,itemsInMyCartId,itemsInMyCart})
}

module.exports.removeItemFromCart = async (req,res) =>{
    if(!res.locals.isAuthenticated)
        return res.json({success:false,message:'user auth failed'})
    let {id} = req.body 
    let Cart = cartDb.cart 
    await Cart.destroy({
        where:{
            username:res.locals.user,
            product_id:id
        }
    })
    return res.json({success:true})
}

module.exports.addItemToCart = async (req,res) =>{
    if(!res.locals.isAuthenticated)
    return res.json({success:false,message:'user auth failed'})
    let {id} = req.body 
    let Cart = cartDb.cart 
    await Cart.create({username:res.locals.user,product_id:id})
    return res.json({success:true})
}