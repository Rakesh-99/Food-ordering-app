import mongoose, { ObjectId } from 'mongoose';





export interface IRestaurantSchemaTypes extends Document {

    user: mongoose.Schema.Types.ObjectId;
    restaurantName: string;
    city: string;
    deliveryTime: number;
    cuisines: string[];
    menus: mongoose.Schema.Types.ObjectId[];
    imageURL: string,
    country: string,
    description: string
}


const restaurantSchema = new mongoose.Schema<IRestaurantSchemaTypes>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },

    restaurantName: {
        type: String,
        required: [true, 'Restaurant name is required!']
    },
    country: {
        type: String,
        required: [true, "Country is required af"]
    },
    city: {
        type: String,
        required: [true, 'City is required!']
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    deliveryTime: {
        type: Number,
        required: [true, 'Delivery time is required!']
    },
    cuisines: [
        {
            type: String,
            required: true
        }
    ],
    menus: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuModel'
        }
    ],
    imageURL: {
        type: String,
        default: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg'
    }

}, { timestamps: true });


const restaurantModel = mongoose.model('Restaurant', restaurantSchema);
export default restaurantModel;