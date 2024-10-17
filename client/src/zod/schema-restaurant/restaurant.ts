import { z } from 'zod';


// Restaurant schema  

export const restaurantSchema = z.object({


    restaurant_name: z.string().max(20, "Restaurant name can not exceed 20 char!").min(4, "Restaurant name can not be less than 4 char!"),

    restaurant_city: z.string().min(2, 'City must be at least 2 char! ').max(10, 'City name can not exceed 10 char!'),

    delivery_time: z.number().max(60, "Delivery time cannot exceed 60 minutes!").min(1, "Delivery time must be at least 1 minute!"),

    // cuisines: z.string().min(3, 'Cuisine can not be less than 3 char').max(20, 'Cuisines can not exceed 20 char!'),

    cuisines: z.array(z.string()),

    description: z.string().min(10, 'Description can not be less than 10 char!').max(25, 'Description can not exceed 25 char!'),

    restaurant_country: z.string().min(2, 'Country name can not be less than 3 char!').max(10, 'Country name can not exceed 10 char!'),
    
    restaurant_image: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Image is required!" })
});

export type RestaurantDataTypes = z.infer<typeof restaurantSchema>