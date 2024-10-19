import mongoose from "mongoose";







type CartItems = {
    name: string,
    image: string,
    quantity: number,
    price: number
}

type DeliveryDetails = {
    name: string,
    email: string,
    city: string,
    contact: number,
    address: string
}

export interface IOrderSchemaTypes extends Document {
    user: mongoose.Schema.Types.ObjectId,
    restaurant: mongoose.Schema.Types.ObjectId,
    cartItems: CartItems,
    totalAmount: number,
    status: "Pending" | "Confirmed" | "Prepairing" | "out for delivery" | "Delivered",
    deliveryDetails: DeliveryDetails
}





const orderSchema = new mongoose.Schema<IOrderSchemaTypes>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurantModel',
        required: true
    },

    cartItems: [
        {
            name: String,
            image: String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: {
        type: Number,
    },
    deliveryDetails: {
        name: {
            type: String,
            required: [true, 'Name is required for delivery !']
        },
        email: {
            type: String,
            required: [true, 'Email is required for delivery !']
        },
        city: {
            type: String,
            required: [true, 'City is required for delivery!']
        },
        address: {
            type: String,
            required: [true, 'Address is required for the delivery ']
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Prepairing", "out for delivery", "Delivered"]
    }
}, { timestamps: true });


const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;