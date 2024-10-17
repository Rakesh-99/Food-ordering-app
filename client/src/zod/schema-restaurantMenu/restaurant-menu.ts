import { z } from 'zod';


export const restaurantMenuSchema = z.object({

    menu_price: z.number().min(0, 'Price can not be less than 0!').max(5000, 'Price can not exceed 5000 rupees!'),
    menu_name: z.string().min(3, 'Menu name field can not be less than 3 char!').max(30, 'Menu name can not exceed 30 char!'),

    menu_description: z.string().min(10, 'Menu description cannot be less than 10 characters!').max(150, 'Menu description cannot exceed 150 characters!'),


    menu_imageFile: z.union([z.instanceof(File), z.string()]), // Allow both File and base64 string
});

export type RestaurantMenuTypes = z.infer<typeof restaurantMenuSchema>