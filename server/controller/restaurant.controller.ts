import { NextFunction, Request, Response } from 'express';
import restaurantModel from "../models/restaurant.model";
import asyncErrorHandler from 'express-async-handler';
import userModel from '../models/user.model';
import { ErrorHandler } from '../utils/ErrorHandler';
import { uploadOnCloudinary } from '../utils/cloudinary-setup/cloudinary';
import { unlink } from 'fs/promises';



interface RestaurantTypes {
    restaurantName: string,
    city: string,
    deliveryTime: number,
    menus: string[],
    cuisines: string[]
}



// Add restaurant : 
export const createRestaurant = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    // Before creating restaurant check if the user is verified or not : 
    const user = await userModel.findById({ _id: req.userId });

    if (!user?.isVerified) {
        return next(new ErrorHandler(401, "You are not verified, Please verify your email!"));
    }

    const { restaurantName, city, deliveryTime, menus, cuisines }: RestaurantTypes = req.body;
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
        city,
        deliveryTime,
        menus,
        cuisines,
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

    const { restaurantName, city, cuisines, menus, deliveryTime }: Partial<RestaurantTypes> = req.body;
    const file = req.file;


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
                restaurantName: restaurantName || restaurant.restaurantName,
                city: city || restaurant.city,
                deliveryTime: deliveryTime || restaurant.deliveryTime,
                cuisines: cuisines || restaurant.cuisines,
                menus: menus || restaurant.menus,
                imageURL: cloudinryImgURL || restaurant.imageURL
            }
        },
        { new: true }
    );
    await updatedRestaurant?.save();


    // Delete the file from public folder after being pushed to the server : 
    if (updatedRestaurant && file) {
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




