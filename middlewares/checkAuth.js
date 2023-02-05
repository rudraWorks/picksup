const jwt = require('jsonwebtoken')

module.exports.checkAuth =  (req,res,next) =>{

    let token = req.cookies.kicksup 
    if(token){
        jwt.verify(token,'srudra754',(err,decodedToken)=>{

            if(err){
                res.locals.user = null
                res.locals.isAuthenticated = false
                console.log('no')

                next()
            }
            else{
                res.locals.user = decodedToken.id
                res.locals.isAuthenticated = true  
                next()
            }

        })
    }
    else{
        res.locals.user = null
        res.locals.isAuthenticated = false
        next()
    }
}