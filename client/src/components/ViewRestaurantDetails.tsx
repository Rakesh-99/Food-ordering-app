import Badge from './Badge';
import detailsImage from '../assets/food menu card images/burger.jpg';
import { GoStopwatch } from "react-icons/go";
import AvilableMenus from './AvilableMenus';
import { BadgeType } from '../constants/dataTypes';


const ViewRestaurantDetails = () => {


    const badgeData: BadgeType[] = [
        {
            foodName: "Paneer Teeka",
        },
        {
            foodName: "Chicken Kawab"
        },
        {
            foodName: "Chicken Tandoori"
        }
    ]





    
    return (
        <>
            <div className="w-[95%] m-auto">
                <div className="mt-5">
                    <img src={detailsImage} alt="food image" className='rounded-md lg:h-[450px] md:h-[450px] object-cover w-full' />
                </div>

                {/* food Title */}
                <div className="">
                    <h1 className='font-bold mt-5 text-2xl'>Paneer Teeka</h1>
                </div>

                {/* badge  */}
                <Badge data={badgeData} />

                {/* delivery time  */}
                <div className="flex items-center gap-2 mt-4">
                    <GoStopwatch size={25} />
                    <h2 className='font-medium'>Delivery Time : <span className='text-green-500'>35 minuites</span></h2>
                </div>

                {/* Abilable menus  */}
                <h1 className='font-extrabold text-xl my-5 '>Avilable menus </h1>
                <div className="grid gap-5 md:grid-cols-2 sm:grid-cols-2 mt-5 lg:grid-cols-4">
                    <AvilableMenus />
                </div>
            </div>
        </>
    )
}

export default ViewRestaurantDetails