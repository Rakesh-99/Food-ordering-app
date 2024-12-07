import { z } from 'zod';


// Restaurant schema  

export const restaurantSchema = z.object({


    restaurantName: z.string().max(20, "Restaurant name can not exceed 20 char!").min(4, "Restaurant name can not be less than 4 char!"),

    city: z.string().min(2, 'City must be at least 2 char! ').max(10, 'City name can not exceed 10 char!'),

    deliveryTime: z.number().max(60, "Delivery time cannot exceed 60 minutes!").min(1, "Delivery time must be at least 1 minute!").min(0, "Delivery time can not be set to negetive time"),

    // cuisines: z.string().min(3, 'Cuisine can not be less than 3 char').max(20, 'Cuisines can not exceed 20 char!'),

    cuisines: z.array(z.string()),

    description: z.string().min(20, 'Description can not be less than 10 char!').max(50, 'Description can not exceed 50 char!'),

    country: z.string().min(2, 'Country name can not be less than 3 char!').max(10, 'Country name can not exceed 10 char!'),

    imageURL: z
        .instanceof(File)
        .or(z.string()) // Handle cases where it might be a URL or string
        .optional(),
});

export type RestaurantDataTypes = z.infer<typeof restaurantSchema>