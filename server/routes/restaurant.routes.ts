import express from 'express';
const restaturantRouters = express.Router();
import { createRestaurant, deleteRestaurant, getRestaurant, getRestaurantDetails, getRestaurantOrder, searchRestaurant, updateOrderStaus, updateRestaurant } from '../controller/restaurant.controller';
import uploadFile from '../middleware/multer.config';
import { verifyUserByJwt } from '../middleware/verifyJwtToken';




restaturantRouters
    .post('/create-restaurant', verifyUserByJwt, uploadFile.single("imageURL"), createRestaurant)
    .get('/get-restaurant', verifyUserByJwt, getRestaurantDetails)
    .delete('/delete-restaurant', verifyUserByJwt, deleteRestaurant)
    .put('/update-restaurant', verifyUserByJwt, uploadFile.single("imageURL"), updateRestaurant)
    .get('/restaurant-order', verifyUserByJwt, getRestaurantOrder)
    .put('/order-status/:orderId', verifyUserByJwt, updateOrderStaus)
    .get('/search/:searchParamsText', verifyUserByJwt, searchRestaurant)
    .get('/view-restaurant/:id, verifyUserByJwt, getRestaurant')




export default restaturantRouters;