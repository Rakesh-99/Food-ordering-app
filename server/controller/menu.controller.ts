import asyncErrorHandler from 'express-async-handler';
import { ErrorHandler } from '../utils/ErrorHandler';
import restaurantModel from '../models/restaurant.model';
import menuModel from '../models/menu.model';
import { Request, Response, NextFunction } from 'express';
import { uploadOnCloudinary } from '../utils/cloudinary-setup/cloudinary';
import { unlink } from 'fs/promises';





// Create menu : 
export const createMenu = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { name, description, price }: { name: string, description: string, price: number } = req.body;
    const menuImage = req.file;


    if (!menuImage) {
        return next(new ErrorHandler(400, "Menu image is required!"));
    }

    // Upload the menu image on cloudinary : 
    const cloudinaryImageURL = await uploadOnCloudinary(menuImage.path);

    // Create the menu : 
    const createMenu = new menuModel({
        name,
        description,
        price,
        image: cloudinaryImageURL
    });
    await createMenu?.save();

    // now push the menu to  restaurant : 

    const restaurantMenu = await restaurantModel.findOneAndUpdate({ user: req.userId },
        {
            $push: {
                menus: createMenu._id
            }
        },
        { new: true }
    );
    if (!restaurantMenu) {
        return next(new ErrorHandler(404, "Restaurant not found!"));
    }

    // Remove the image file from public folder after is has been pushed to the server: 
    if (menuImage) {
        unlink(menuImage.path);
    }
    return res.status(200).json({ success: true, message: "Restaurant's menu has been created", menu: createMenu });
});


// Get all menus : 
export const getAllMenus = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    // Get restaurant first : 
    const restaurant = await restaurantModel.findOne({ user: req.userId });

    // Check if the restaurant is available : 
    if (!restaurant) {
        return next(new ErrorHandler(404, "Restaurant not found!"));
    }
    // Get menu ids : 
    const menus = await menuModel.find({ _id: restaurant.menus });
    if (!menus) {
        return next(new ErrorHandler(404, "Menu not found"));
    }
    return res.status(200).json({ success: true, message: "Menus have been fetched", menus });

});


// Get single menu : 
export const getSingleMenu = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { menuId } = req.params;

    // Check if the menu id available or not : 
    if (!menuId) {
        return next(new ErrorHandler(404, "Menu id is required!"));
    }

    const menu = await menuModel.findById({ _id: menuId });

    // Check if the menu is available or not : 
    if (!menu) {
        return next(new ErrorHandler(404, "Menu not found!"));
    }
    return res.status(200).json({ success: true, message: "Menu has been fetched!", menu });
});


// Update menu : 
export const updateMenu = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { id } = req.params;
    const { name, description, price }: { name: string, description: string, price: number } = req.body;
    const menuImage = req.file;


    // Upload the file on cloudinary : 
    const cloudinaryImgURL = await uploadOnCloudinary(menuImage?.path);


    // Find menu :
    const menu = await menuModel.findByIdAndUpdate({ _id: id },
        {
            $set: {
                name,
                description,
                price,
                image: cloudinaryImgURL
            }
        },
        { new: true }
    );

    if (!menu) {
        return next(new ErrorHandler(404, "Menu not found!"));
    };

    // remove the image file from the public folder after being uploaded on server : 

    if (menuImage) {
        unlink(menuImage.path);
    }

    return res.status(200).json({ success: true, message: "Menu has been updated", menu });
});

