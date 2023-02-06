// this file is responsible for handling all general routes like home page, store page, contact page, team page etc

const {itemsDb,cartDb} = require('../models/seq_config')
const {Op} = require('sequelize')

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
        let t=await Items.findOne({
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

module.exports.filterItems = async (req,res) =>{
    if(!res.locals.isAuthenticated)
        return res.json({success:false,message:'user auth failed'})
    let {cost1,cost2,cost3,type1,type2,color1,color2,color3,color4} = req.body

    let Items = itemsDb.items 
    
    let filter = []

    let cost1Arr=[]
    if(cost1=='true'){
        cost1Arr = (await Items.findAll({
            where:{
                price:{
                    [Op.gte]:1500,
                    [Op.lte]:4000
                }
            }
        }))
    }
    let cost2Arr=[]
    if(cost2=='true')
    cost2Arr = (await Items.findAll({
        where:{
            price:{
                [Op.gte]:4001,
                [Op.lte]:7000
            }
        }
    }))

   

    let cost3Arr=[]
    if(cost3=='true')
    cost3Arr = (await Items.findAll({
        where:{
            price:{
                [Op.gte]:7001
            }
        }
    }))

    let cost1ArrTemp = []
    cost1Arr.map((item)=>{
        cost1ArrTemp.push(item.dataValues)
    })
    cost1Arr=cost1ArrTemp

    cost1Arr.map((item)=>{
        filter.push(item)
    })

    let cost2ArrTemp = []
    cost2Arr.map((item)=>{
        cost2ArrTemp.push(item.dataValues)
    })
    cost2Arr=cost2ArrTemp
    cost2Arr.map((item)=>{
        filter.push(item)
    })

    let cost3ArrTemp = []
    cost3Arr.map((item)=>{
        cost3ArrTemp.push(item.dataValues)
    })
    cost3Arr=cost3ArrTemp

    cost3Arr.map((item)=>{
        filter.push(item)
    })
    /// type //
    let type1Arr=[]
    if(type1=='true'){
        type1Arr = (await Items.findAll({
            where:{
               type:'sneaker'
            }
        }))
    }

    let type2Arr=[]
    if(type2=='true'){
        type2Arr = (await Items.findAll({
            where:{
               type:'loafer'
            }
        }))
    }

    let type1ArrTemp = []
    type1Arr.map((item)=>{
        type1ArrTemp.push(item.dataValues)
    })
    type1Arr=type1ArrTemp
    type1Arr.map((item)=>{
        filter.push(item)
    })

    let type2ArrTemp = []
    type2Arr.map((item)=>{
        type2ArrTemp.push(item.dataValues)
    })
    type2Arr=type2ArrTemp
    type2Arr.map((item)=>{
        filter.push(item)
    })
    // color 

    let color1Arr=[]
    if(color1=='true'){
        color1Arr = (await Items.findAll({
            where:{
               color:'red'
            }
        }))
    }

    let color2Arr=[]
    if(color2=='true'){
        color2Arr = (await Items.findAll({
            where:{
               color:'blue'
            }
        }))
    }


    let color3Arr=[]
    if(color3=='true'){
        color3Arr = (await Items.findAll({
            where:{
               color:'yellow'
            }
        }))
    }


    let color4Arr=[]
    if(color4=='true'){
        color4Arr = (await Items.findAll({
            where:{
               color:'green'
            }
        }))
    }

    let color1TempArr = []
    color1Arr.map((item)=>{
        color1TempArr.push(item.dataValues)
    })
    color1Arr=color1TempArr
    color1Arr.map((item)=>{
        filter.push(item)
    })
 
    let color2TempArr = []
    color2Arr.map((item)=>{
        color2TempArr.push(item.dataValues)
    })
    color2Arr=color2TempArr
    color2Arr.map((item)=>{
        filter.push(item)
    })

    let color3TempArr = []
    color3Arr.map((item)=>{
        color3TempArr.push(item.dataValues)
    })
    color3Arr=color3TempArr
    color3Arr.map((item)=>{
        filter.push(item)
    })

    let color4TempArr = []
    color4Arr.map((item)=>{
        color4TempArr.push(item.dataValues)
    })
    color4Arr=color4TempArr
    color4Arr.map((item)=>{
        filter.push(item)
    })
    ////


    let allItems = []
    filter.map((item)=>{
        if(item)allItems.push(item)
    })
    console.log(allItems)
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
        let t=await Items.findOne({
            where:{
                id:itemsInMyCartId[i]
            }
        })
        itemsInMyCart.push(t.dataValues)
    }
    return res.render('generalViews/store',{allItems,itemsInMyCartId,itemsInMyCart})
    return res.json({success:true})
}