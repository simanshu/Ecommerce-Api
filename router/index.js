const express=require("express")
const router=express.Router()
const usersrouters=require('./usersRouter')
const productRouters=require('./productRouter')
const cartRouters=require('./cartRouter')
const orderRouters=require('./orderRouter')


router.use("/user",usersrouters)
router.use('/product',productRouters)
router.use("/cart",cartRouters)
router.use("/order",orderRouters)

module.exports=router;