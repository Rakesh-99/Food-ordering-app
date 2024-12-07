import { Label } from "@radix-ui/react-dropdown-menu"
import RestaurantImg from '../../assets/restaurant image/restaurantImg.png';
import { Button } from "../../components/ui/button";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { restaurantSchema, RestaurantDataTypes } from '../../zod/schema-restaurant/restaurant';
import useRestaurantStore from "../../store/restaurantStore";
import { Loader } from "lucide-react";




const Restaurant = () => {


    const [formError, setFormError] = useState<Partial<RestaurantDataTypes>>()

    const { createRestaurant, loading, restaurant, getRestaurant, updateRestaurant } = useRestaurantStore();

    const [restaurantInfo, setRestaurantInfo] = useState<RestaurantDataTypes>({
        restaurantName: '',
        city: '',
        country: '',
        deliveryTime: 0,
        cuisines: [],
        description: '',
        imageURL: undefined
    });


    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setRestaurantInfo({
            ...restaurantInfo,
            [name]: type === 'number' ? Number(value) : value
        })
    };

    // file change handle : 
    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setRestaurantInfo({
                ...restaurantInfo,
                imageURL: file
            })
        }
    }


    // Form Submit handle : 
    const formSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Zod form validation : 
        const response = restaurantSchema.safeParse(restaurantInfo);
        if (response.error) {
            const catchError = response.error.formErrors.fieldErrors;
            setFormError(catchError as Partial<RestaurantDataTypes>);
            return false;
        }


        // Form data setup : 
        const formData = new FormData();
        formData.append("restaurantName", restaurantInfo.restaurantName);
        formData.append("city", restaurantInfo.city);
        formData.append("country", restaurantInfo.country);
        formData.append("deliveryTime", restaurantInfo.deliveryTime.toString());
        formData.append("cuisines", JSON.stringify(restaurantInfo.cuisines));
        formData.append("description", restaurantInfo.description);
        // edge case for restaurant image: 
        if (restaurantInfo.imageURL) {
            formData.append("imageURL", restaurantInfo.imageURL);
        }


        //Restauran api implementation : 
        try {
            // check restaurant.if already available then update the restaurant : 
            if (restaurant) {
                await updateRestaurant(formData);
            } else {
                // Create a restaurant, if the restaurant is not assigned: 
                await createRestaurant(formData);
            }
        } catch (error: any) {
            console.log("Restaurant error -> ", error);
        }
    };

    useEffect(() => {
        const infos = async () => {
            await getRestaurant();
            if (restaurant) {
                setRestaurantInfo({
                    restaurantName: restaurant?.restaurantName || "",
                    city: restaurant?.city || "",
                    country: restaurant?.country || "",
                    description: restaurant?.description || "",
                    deliveryTime: restaurant?.deliveryTime || 0,
                    cuisines: restaurant?.cuisines ? restaurant.cuisines.map((cuisine) => cuisine) : [],
                    imageURL: restaurant?.imageURL || undefined
                })
            }
        }
        infos();
    }, []);



    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center">

            {/* Left content  */}
            <div className=" flex items-center  justify-center w-full">
                <img src={RestaurantImg} alt="restaurant image" className="md:w-[70%] xl:w-[65%] lg:w-[70%]" />
            </div>

            {/* Right content  */}
            <form onSubmit={formSubmitHandle} className="mt-5 md:mr-10 flex flex-col gap-2  lg:mr-10 px-5 py-3">

                {
                    restaurant ?
                        <h1 className="text-2xl font-extrabold text-center ">Update Restaurant</h1>
                        :
                        <h1 className="text-2xl font-extrabold text-center ">Add Restaurant</h1>
                }

                {/* Restaurant name  */}
                <div className="w-full">
                    <Label className="">Restaurant name </Label>
                    <input
                        type="text"

                        name="restaurantName"
                        placeholder="Enter restaurant name"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.restaurantName}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.restaurantName}</p>
                    }
                </div>

                {/* Restaurant city  */}
                <div className="">
                    <Label>Restaurant city </Label>
                    <input type="text"

                        name="city"
                        placeholder="Enter restaurant city"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.city}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.city}</p>
                    }
                </div>

                {/* Restaurant country  */}
                <div className="">
                    <Label>Restaurant country </Label>
                    <input type="text"

                        name="country"
                        placeholder="Enter restaurant country"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.country}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.country}</p>
                    }
                </div>

                {/* Delivery time  */}
                <div className="">
                    <Label>Delivery time </Label>
                    <input type="number"

                        name="deliveryTime"
                        placeholder="Enter delivery time"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.deliveryTime}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.deliveryTime}</p>
                    }
                </div>

                {/* Cuisines  */}
                <div className="">
                    <Label>Cuisines </Label>
                    <input type="text"

                        name="cuisines"
                        placeholder="Enter cuisine name"
                        className="py-1 px-2 w-full focus:border-blue-300 outline-none border-b-2"
                        value={restaurantInfo.cuisines}
                        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, cuisines: e.target.value.split(",") })}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.cuisines}</p>
                    }
                </div>

                {/* Description  */}
                <div className="">
                    <Label>Description </Label>
                    <input type="text"

                        name="description"
                        placeholder="Enter a short description about your restaurant"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.description}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.description}</p>
                    }
                </div>

                {/* upload image  */}

                <div className="">
                    <Label>Upload image</Label>
                    <input
                        type="file"

                        className=""
                        name="imageURL"
                        onChange={fileChangeHandle}
                        accept="image/*"
                    />
                    {
                        formError &&
                        <p>{formError.imageURL?.name}</p>
                    }
                </div>

                {
                    restaurant ?

                        <div className="">
                            {
                                loading ?
                                    <Button disabled type="submit" className="bg-blue-500 flex items-center gap-1 justify-center hover:bg-blue-600 w-full mt-5">
                                        <Loader className="animate-spin" />
                                        <p>Updating..</p>
                                    </Button>
                                    :
                                    <Button type="submit" className="bg-blue-500 active:scale-[98%] transition-all hover:bg-blue-600 w-full mt-5">Update Restaurant</Button>
                            }
                        </div>
                        :
                        <div className="">
                            {
                                loading ?
                                    <Button disabled type="submit" className="bg-blue-500 flex items-center gap-1 justify-center hover:bg-blue-600 w-full mt-5">
                                        <Loader className="animate-spin" />
                                        <p>Loading..</p>
                                    </Button>
                                    :
                                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full mt-5">Add Restaurant</Button>
                            }
                        </div>
                }


            </form >
        </div >
    )
}

export default Restaurant;