import { ChangeEvent } from "react";







type FoodCategory = {
    label: string,
    id: string
}


const FilterFood = () => {


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
                id: "Paneer",
                label: "Paneer"
            }
        ];

    const checkboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
    }



    return (
        <>

            <div className="w-80 flex mt-5 flex-col md:items-center lg:items-center ml-3 md:ml-0 lg:ml-0">

                <div className="flex flex-col items-start">
                    <h1 className="font-medium">Filter by category</h1>

                    {
                        foodCategory.map((val: FoodCategory, idx: number) => {
                            return (
                                <div className="flex items-center justify-center gap-2" key={idx}>
                                    <input type="checkbox" name={val.label} value={val.label} onChange={checkboxChange} />
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

export default FilterFood