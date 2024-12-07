import { ChangeEvent } from "react";
import useRestaurantStore from "../store/restaurantStore";







type FoodCategory = {
    label: string,
    id: string
}


const FilterFood = () => {

    const { setFilterRestaurant, filteredFoodItems } = useRestaurantStore();

    // Predefined food categories : 
    const foodCategory: FoodCategory[] =
        [
            {
                id: "Pizza",
                label: "Pizza"
            },
            {
                id: "Burger",
                label: "Burger"
            },
            {
                id: "Dosa",
                label: "Dosa"
            },
            {
                id: "Idli",
                label: "Idli"
            },
            {
                id: "Paneer",
                label: "Paneer"
            },
            {
                id: 'French fries',
                label: "French fries"
            },

        ];

    const checkboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFilterRestaurant(value);
    }



    return (
        <>

            <div className="w-80 flex mt-5 flex-col md:items-center lg:items-center ml-3 md:ml-0 lg:ml-0">

                <div className="flex flex-col items-start">
                    <h1 className="font-bold mb-3">Filter by category</h1>

                    {
                        foodCategory.map((val: FoodCategory, idx: number) => {
                            return (
                                <div className="flex items-center justify-center gap-2 my-1" key={idx}>
                                    <input
                                        type="checkbox"
                                        name={val.label}
                                        value={val.label}
                                        onChange={checkboxChange}
                                        checked={filteredFoodItems?.includes(val.label) || false} // Bind the state
                                    />
                                    <p>{val.label}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default FilterFood;