

module.exports = (sequelize,DataTypes)=>{
    const Items = sequelize.define("items",{
        product_name:DataTypes.STRING,
        price:DataTypes.INTEGER,
        color:DataTypes.STRING,
        type:DataTypes.STRING
    },{
        timestamps:false
    }) 

    return Items
}


