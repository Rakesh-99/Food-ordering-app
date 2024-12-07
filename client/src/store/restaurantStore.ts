import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { axiosRestaurantInstance } from '../axiosInstances/axiosApis';
import { toast } from 'sonner';





type MenuType = {
    _id: string
    name: string,
    description: string,
    price: number,
    image: string
}


type RestaurantTypes = {
    _id: string,
    name: string,
    description: string,
    image: string,
    price: number,
    menu: MenuType[] | null,
    cuisines: string[],
    city: string,
    country: string,
    deliveryTime: number,
};


type RestaurantState = {
    restaurant: RestaurantTypes | null,
    loading: boolean,
    createRestaurant: (addNewRestaurant: FormData) => Promise<void>,
    getRestaurant: () => Promise<void>,
    updateRestaurant: (restaurantInfo: FormData) => Promise<void>,
    searchRestaurant: (searchParamsText: string, searchQuery: string, getCuisines: any) => Promise<void>,
    searchRestaurantResult: RestaurantTypes[] | null,
    setFilterRestaurant: (val: string) => void,
    filteredFoodItems: string[],
}



const useRestaurantStore = create<RestaurantState>()(devtools((persist((set) => ({

    restaurant: null,
    loading: false,
    searchRestaurantResult: null,
    filteredFoodItems: [],


    // Create restaurant : 
    createRestaurant: async (addNewRestaurant: FormData) => {
        try {
            set({ loading: true });
            const addRestaurant = await axiosRestaurantInstance.post('/create-restaurant', addNewRestaurant);
            const data = await addRestaurant.data;

            if (data.success) {
                set({ loading: false });
                const message = data?.message
                toast.success(message);
            }
        } catch (err: any) {
            set({ loading: false });
            const errMessage = err?.response?.data?.message;
            toast.error(errMessage || "Unexpected error occurred while adding restaurant!");
        }
    },

    // Get restaurant : 
    getRestaurant: async () => {
        try {
            set({ loading: true });
            const getRestaurantData = await axiosRestaurantInstance.get('/get-restaurant');
            const data = await getRestaurantData.data;

            if (data.success) {
                set({ loading: false, restaurant: data.restaurant[0] });
                const message = data?.message
                toast.success(message)
            }
        } catch (err: any) {
            set({ loading: false });
            const errMessage = err?.response?.data?.message;
            toast.error(errMessage || "Unexpected error occurred while fetching restaurant details!");
        } finally {
            set({ loading: false })
        }
    },

    // Update restaurant : 
    updateRestaurant: async (restaurantInfo: FormData) => {
        try {
            set({ loading: true });
            const updateRestaurantInfo = await axiosRestaurantInstance.put('/update-restaurant', restaurantInfo);

            const data = await updateRestaurantInfo.data;

            if (data.success) {
                set({ loading: false, restaurant: data?.restaurant });
                const message = data?.message
                toast.success(message);
            }
        } catch (err: any) {
            set({ loading: false });
            const errMesage = err?.response?.data?.message;
            toast.error(errMesage || "Could not update the restaurant!");
        }
    },

    // Search restaurant : 
    searchRestaurant: async (searchParamsText: string, searchQuery: string, getCuisines: string[]) => {
        console.log("Params-", searchParamsText, "Query-", searchQuery, "Cuisines -", getCuisines);

        try {
            const searchResponse = await axiosRestaurantInstance.get(`/search/${searchParamsText}?searchQuery=${searchQuery}&getCuisines=${getCuisines.join(",")}`);

            const data = await searchResponse.data;

            if (data.success) {
                set({ searchRestaurantResult: data?.restaurants });
            }
        } catch (err: any) {
            set({ searchRestaurantResult: null })
            const errMessage = err?.response?.data?.message;
            toast.error(errMessage)
        }
    },


    // Filter food by categories : 
    setFilterRestaurant: (val: string) => {

        set((state) => {
            const isFoodExist = state.filteredFoodItems?.includes(val);
            const updateFood = isFoodExist ? state.filteredFoodItems?.filter((food) => food !== val) : [...state.filteredFoodItems, val];

            return { filteredFoodItems: updateFood }
        })
    },



}),
    {
        name: "restaurant-details",
        storage: createJSONStorage(() => localStorage)
    }
))))



export default useRestaurantStore;