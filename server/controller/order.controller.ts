import { NextFunction, Request, Response } from 'express';
import asyncErrorHandler from 'express-async-handler';
import restaurantModel from '../models/restaurant.model';
import { ErrorHandler } from '../utils/ErrorHandler';
import mongoose from 'mongoose';
import orderModel from '../models/order.model';
import stripe, { Stripe } from 'stripe';
const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionInfo = {

    // Cart items : 
    cartItems: {
        menuId: string,
        name: string,
        image: string,
        price: number,
        quantity: number
    }[];

    // DeliveryDetailsType :
    DeliveryDetails: {
        name: string,
        email: string,
        address: string,
        city: string
    },

    // Restaurant Id Type : 
    restaurantId: string
}





// get all orders :  

export const getOrders = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    // orders :  
    const orders = await orderModel.find({ user: req.userId }).populate('user').populate('restaurant');

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler(404, "No order found!"));
    }

    return res.status(200).json({ success: true, message: "orders have beeen fetched", orders });
});


export const checkoutSession = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { checkoutDetails }: { checkoutDetails: CheckoutSessionInfo } = req.body;

    const restaurantId = checkoutDetails.restaurantId;

    // If the ID is invalid : 
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return next(new ErrorHandler(404, "Restaurant not found !"));
    }

    // If restaurant not found : 
    const restaurant = await restaurantModel.findById({ _id: restaurantId });
    if (!restaurant) {
        return next(new ErrorHandler(404, "Restaurant not found!"));
    }

    // If restaurant found , create an order : 
    const order = new orderModel({
        user: req.userId,
        restaurant: restaurant._id,
        cartItems: checkoutDetails.cartItems,
        deliveryDetails: checkoutDetails.DeliveryDetails,
        status: "Pending"
    });

    const menus = restaurant.menus;

    // Create line item : 
    const lineItem = createLineItem(checkoutDetails, menus);


    //Create stripe Session : 
    const session = await STRIPE.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["GB", "IN", "CA", "US"]
        },
        line_items: lineItem,
        success_url: `${process.env.FRONTEND_URL}/order/status`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
        metadata: {
            orderId: order._id.toString(),
            images: JSON.stringify(restaurant.menus.map((item: any) => item.image))
        }
    });

    if (!session.url) {
        return next(new ErrorHandler(400, "An error occurred while creating session!"));
    }

    // save the order: 
    await order.save();

    return res.status(200).json({ success: true, message: session });
});



const createLineItem = (checkoutDetails: CheckoutSessionInfo, menus: any) => {
    const lineItems = checkoutDetails.cartItems.map((cartItem) => {
        const menuItem = menus.find((menuItem: any) => menuItem._id.toString() === cartItem.menuId);

        if (!menuItem) {
            throw new Error("Menu not found!");
        }

        return {
            price_data: {
                currency: "inr",
                product_data: {  // <-- corrected to use product_data
                    name: menuItem.name,
                    images: [menuItem.image],  // <-- corrected to use images
                },
                unit_amount: menuItem.price * 100,
            },
            quantity: cartItem.quantity
        };
    });

    return lineItems;
};
