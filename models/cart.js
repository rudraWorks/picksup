

module.exports = (sequelize,DataTypes)=>{
    const Cart = sequelize.define("cart",{
        username:DataTypes.STRING,
        product_id:DataTypes.INTEGER
    },{
        timestamps:false
    }) 

    return Cart
}


