import express from 'express';
import { verifyUserByJwt } from '../middleware/verifyJwtToken';
const orderRouter = express.Router();
import { checkoutSession, getOrders } from '../controller/order.controller';






orderRouter.post('/checkout-session', verifyUserByJwt, checkoutSession)
    .get('/get-orders', verifyUserByJwt, getOrders)


export default orderRouter;