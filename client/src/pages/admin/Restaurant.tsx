import { Label } from "@radix-ui/react-dropdown-menu"
import RestaurantImg from '../../assets/restaurant image/restaurantImg.png';
import { Button } from "../../components/ui/button";
import { useState, ChangeEvent, FormEvent } from 'react';
import { restaurantSchema, RestaurantDataTypes } from "../../zod/schema-restaurant/restaurant";



const Restaurant = () => {


    const [formError, setFormError] = useState<Partial<RestaurantDataTypes>>()

    const [restaurantInfo, setRestaurantInfo] = useState({
        restaurant_name: '',
        restaurant_city: '',
        restaurant_country: '',
        delivery_time: 0,
        cuisines: [],
        description: '',
        restaurant_image: ''
    });


    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRestaurantInfo({
            ...restaurantInfo,
            [name]: value
        })
    }

    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const rawFile = e.target.files?.[0];


        if (rawFile) {
            const fileReader = new FileReader();

            fileReader.onloadend = (event) => {
                const result = event.target?.result as string;

                setRestaurantInfo({
                    ...restaurantInfo,
                    restaurant_image: result
                })
            }
            fileReader.readAsDataURL(rawFile)
        }
    }

    const formSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(restaurantInfo);

        const response = restaurantSchema.safeParse(restaurantInfo);

        if (response.error) {
            const catchError = response.error.formErrors.fieldErrors;
            setFormError(catchError as Partial<RestaurantDataTypes>);

            return false;
        } else {
            console.log('Hello');
        }
    }


    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center">

            {/* Left content  */}
            <div className=" flex items-center  justify-center w-full">
                <img src={RestaurantImg} alt="restaurant image" className="md:w-[70%] xl:w-[65%] lg:w-[70%]" />
            </div>

            {/* Right content  */}
            <form onSubmit={formSubmitHandle} className="mt-5 md:mr-10 flex flex-col gap-2  lg:mr-10 px-5 py-3">

                <h1 className="text-2xl font-extrabold text-center ">Add Restaurant</h1>

                {/* Restaurant name  */}
                <div className="w-full">
                    <Label className="">Restaurant name </Label>
                    <input
                        type="text"

                        name="restaurant_name"
                        placeholder="Enter restaurant name"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.restaurant_name}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.restaurant_name}</p>
                    }
                </div>

                {/* Restaurant city  */}
                <div className="">
                    <Label>Restaurant city </Label>
                    <input type="text"

                        name="restaurant_city"
                        placeholder="Enter restaurant city"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.restaurant_city}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.restaurant_city}</p>
                    }
                </div>

                {/* Restaurant country  */}
                <div className="">
                    <Label>Restaurant country </Label>
                    <input type="text"

                        name="restaurant_country"
                        placeholder="Enter restaurant country"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.restaurant_country}
                        onChange={inputChangeHandle}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.restaurant_country}</p>
                    }
                </div>

                {/* Delivery time  */}
                <div className="">
                    <Label>Delivery time </Label>
                    <input type="number"

                        name="delivery_time"
                        placeholder="Enter delivery time"
                        className="py-1 px-2 w-full outline-none border-b-2"
                        value={restaurantInfo.delivery_time}
                        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, delivery_time: Number(e.target.value) })}
                    />
                    {
                        formError &&
                        <p className="text-red-500 text-sm">{formError.delivery_time}</p>
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
                        name="restaurant_image"
                        onChange={fileChangeHandle}
                        accept="image/*"
                    />
                    {
                        formError && typeof formError.restaurant_image === 'string' && ( // Check if it's a string
                            <p className="text-red-500 text-sm">{formError.restaurant_image}</p>
                        )
                    }
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full mt-5">Add Restaurant</Button>
            </form >
        </div >
    )
}

export default Restaurant;