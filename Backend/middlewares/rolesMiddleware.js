
const { roles } = require('../config/roles')


const grantAccess = (action, resource)=>{
    return(req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource)
            if (!permission){
                return res.status(401).json({
                    errorMsg: 'You do not have permission'
                })
            }
            next()
        }catch(err) {
            res.json({ error: err})
            next(err)
        }
    }
}


module.exports = {
    grantAccess,
}