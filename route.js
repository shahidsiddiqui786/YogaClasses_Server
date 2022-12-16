import express from  'express'
import { userSignUp } from './controller/user_controller.js'
import { payment } from './controller/payment_controller.js'
const router = express.Router()


router.post('/signup', userSignUp)
router.post('/payment', payment)

// router.get('/products', getProducts)
// router.get('/product/:id', getProductById)

// router.get('/',(req,res) => console.log("hello"))

export default router