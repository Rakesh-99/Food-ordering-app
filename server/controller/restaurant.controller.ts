import { NextFunction, query, Request, Response } from 'express';
import restaurantModel from "../models/restaurant.model";
import asyncErrorHandler from 'express-async-handler';
import userModel from '../models/user.model';
import { ErrorHandler } from '../utils/ErrorHandler';
import { uploadOnCloudinary } from '../utils/cloudinary-setup/cloudinary';
import { unlink } from 'fs/promises';
import orderModel from '../models/order.model';



interface RestaurantTypes {
    restaurantName: string,
    city: string,
    description: string
    deliveryTime: number,
    menus: string[],
    cuisines: string[],
    country: string
}



// Add restaurant : 
export const createRestaurant = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    // Before creating restaurant check if the user is verified or not : 
    const user = await userModel.findById({ _id: req.userId });

    if (!user?.isVerified) {
        return next(new ErrorHandler(401, "You are not verified, Please verify your email!"));
    }

    const { restaurantName, city, deliveryTime, menus, cuisines, country, description }: RestaurantTypes = req.body;

    const parsedCuisines = cuisines && typeof cuisines === 'string' ? JSON.parse(cuisines) : cuisines;

    const restaurantImage = req.file;

    // Check if the restaurant has this user or not : 
    const restaurantUser = await restaurantModel.findOne({ user: req.userId });

    if (restaurantUser) {
        return next(new ErrorHandler(400, "Restaurant is already available. A user can not create more than 1 restaurant!"));
    }

    // Check if file available or not : 
    if (!restaurantImage) {
        return next(new ErrorHandler(400, "File is required!"));
    }

    // uploadFile and get the file url : 
    const cloudinaryResponse = await uploadOnCloudinary(restaurantImage.path);


    // Create a new Restaurant : 
    const createNewRestaurant = new restaurantModel({
        user: req.userId,
        restaurantName,
        country,
        city,
        deliveryTime,
        description,
        menus,
        cuisines: parsedCuisines,
        imageURL: cloudinaryResponse
    });
    await createNewRestaurant?.save();

    // Delete images from folder after being uploaded on cloudinary : 
    if (createNewRestaurant && restaurantImage) {
        unlink(restaurantImage.path);
    }

    return res.status(200).json({ success: true, message: "Restaurant has been added", restaurant: createNewRestaurant })
});



// Get the restaurant details : 
export const getRestaurantDetails = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const restaurant = await restaurantModel.find({ user: req.userId })

    if (!restaurant || restaurant.length === 0) {
        return next(new ErrorHandler(400, "No restaurant found!"));
    }
    return res.status(200).json({ success: true, message: "Restaurant details hasve been fetched!", restaurant });
});


// Update restaurant : 
export const updateRestaurant = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { restaurantName, city, cuisines, menus, deliveryTime, description, country }: Partial<RestaurantTypes> = req.body;
    const file = req.file;

    // check if the cuisines are string , if string parse it : 

    const parsedCuisines = typeof cuisines === 'string' ? JSON.parse(cuisines) : cuisines;

    const restaurant = await restaurantModel.findOne({ user: req.userId });

    if (!restaurant) {
        return next(new ErrorHandler(400, "Restaurant not found!"));
    }
    // Check if the file  is availbale or not :

    let cloudinryImgURL;

    if (file) {
        cloudinryImgURL = await uploadOnCloudinary(file.path);
    }

    // Update the restaurant : 
    const updatedRestaurant = await restaurantModel.findOneAndUpdate({ user: req.userId },
        {
            $set: {
                restaurantName: restaurantName ?? restaurant.restaurantName,
                country: country ?? restaurant.country,
                city: city ?? restaurant.city,
                deliveryTime: deliveryTime ?? restaurant.deliveryTime,
                cuisines: parsedCuisines ?? restaurant.cuisines,
                menus: menus ?? restaurant.menus,
                description: description ?? restaurant.description,
                imageURL: cloudinryImgURL ?? restaurant.imageURL
            }
        },
        { new: true }
    );
    // Delete the file from public folder after being pushed to the server : 
    if (file && updatedRestaurant) {
        unlink(file.path)
    };
    return res.status(200).json({ success: true, message: "Restaurant has been updated", updatedRestaurant });
});



// Delete restaurant : 
export const deleteRestaurant = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const restaurant = await restaurantModel.findOne({ user: req.userId });

    if (!restaurant) {
        return next(new ErrorHandler(400, "No restaurant available!"))
    }

    await restaurantModel.findOneAndDelete({ user: req.userId })

    return res.status(200).json({ success: true, message: "Restaurant has been deleted" });
});



// Get restaurant orders : 
export const getRestaurantOrder = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {


    const restaurant = await restaurantModel.findOne({ user: req.userId });
    if (!restaurant) {
        return next(new ErrorHandler(404, "Restaurant not found!"));
    }

    // Restaurant available , now fetch restaurant's orders : 

    const order = await orderModel.findOne({ restaurant: restaurant._id }).populate("restaurant").populate("user");
    if (!order) {
        return next(new ErrorHandler(404, "NO orders found"));
    }
    return res.status(200).json({ success: true, message: "Orders have been fetched", orders: order });

});


// Update order status : 
export const updateOrderStaus = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // find the order : 
    const order = await orderModel.findOne({ _id: orderId });
    if (!order) {
        return next(new ErrorHandler(404, "Order not found!"));
    }

    // Update the order status : 

    const updateOrderStausInfo = await orderModel.findByIdAndUpdate({ _id: orderId }, {
        $set: {
            status: orderStatus
        }
    }, { new: true }
    );

    // Save the changes : 
    await updateOrderStausInfo?.save();

    return res.status(200).json({ success: true, message: "Order status has been updated", orderStatusData: updateOrderStausInfo })

})


// Searh restaurant api :
export const searchRestaurant = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const searchParamsText = req.params.searchParamsText;
    const searchQuery = req.query.searchQuery;
    const getCuisines = (req.query.getCuisines! as string || "").split(",").map((cuisines) => cuisines.trim());


    const fetchData = [];

    // Search through params : 
    if (searchParamsText) {
        fetchData.push(
            { restaurantName: { $regex: searchParamsText, $options: "i" } },
            { city: { $regex: searchParamsText, $options: "i" } },
            { country: { $regex: searchParamsText, $options: "i" } }
        )
    }

    // Search through query: 
    if (searchQuery) {
        fetchData.push(
            { restaurantName: { $regex: searchQuery, $options: "i" } },
            { cuisines: { $regex: searchQuery, $options: "i" } }
        )
    }
    // search in cuisines : 
    if (getCuisines.length > 0) {
        fetchData.push(
            { cuisines: { $in: getCuisines } }
        )
    }

    const restaurants = await restaurantModel.find({ $or: fetchData })

    if (restaurants.length === 0) {
        return next(new ErrorHandler(404, "No restaurant found"));
    }

    return res.status(200).json({
        success: true,
        message: `${restaurants.length} restaurants found`,
        restaurants: restaurants
    })
});




// Get single restaurant : 
export const getRestaurant = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const restaurant = await restaurantModel.findOne({ user: req.userId }).populate("menus")

    if (!restaurant) {
        return next(new ErrorHandler(404, "Restaurant not found!"));
    }

    return res.status(200).json({ success: true, message: "Restaurant has been fetched", restaurant });
})


