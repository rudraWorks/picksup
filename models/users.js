

module.exports = (sequelize,DataTypes)=>{
    const Users = sequelize.define("users",{
        username:DataTypes.STRING,
        email:DataTypes.STRING,
        fullname:DataTypes.STRING,
        password:DataTypes.STRING
    },{
        timestamps:false
        // updatedAt:false
    }) 

    return Users
}


