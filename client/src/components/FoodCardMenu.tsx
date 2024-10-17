import pizzaImg from '../assets/food menu card images/pizzaCard.jpg';
import { TbWorld } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BadgeType } from '../constants/dataTypes';
import Badge from './Badge';






const FoodCardMenu = () => {


    const badgeData: BadgeType[] = [
        {
            foodName: 'Biriyani'
        },
        {
            foodName: "Jalebi"
        },
        {
            foodName: "Momos"
        }
    ]


    return (
        <>
            <div className=" ">
                {/* Card content  */}
                <div className="border shadow-sm py-2 rounded-sm hover:scale-[99%] transition-all duration-200 flex-col gap-2 px-2  flex relative justify-center">

                    <img src={pizzaImg} alt="" className='h-40  w-full rounded-md object-cover ' />
                    <p className='bg-zinc-50 opacity-75 left-1 rounded-sm px-2 top-1  absolute'>Featured</p>

                    <h1 className='text-xl font-bold'>
                        Paneer tikka pizza
                    </h1>

                    <div className="flex items-center gap-2">
                        <CiLocationOn size={20} />
                        <p>City : <span className='font-semibold'>Delhi</span> </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <TbWorld size={20} />
                        <p>Country : <span className='font-semibold'>India</span> </p>
                    </div>

                    {/* Options  */}
                    <div className="grid grid-cols-3 gap-3">
                        <Badge data={badgeData} />
                    </div>

                    {/* view more  */}
                    <span className='border mt-1'></span>
                    <Link className='text-end px-2 font-[500] bg-blue-100 py-2 rounded-sm' to={'/view-restaurant-details/:id'}>View More</Link>

                </div>
            </div>

        </>
    )
}

export default FoodCardMenu