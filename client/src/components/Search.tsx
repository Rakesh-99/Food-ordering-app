import { Link, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { IoSearchOutline } from "react-icons/io5";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

import FilterFood from './FilterFood';
import FoodCardMenu from './FoodCardMenu';
import useRestaurantStore from '../store/restaurantStore';
import { BsEmojiFrown } from 'react-icons/bs';
import { Badge } from 'lucide-react';
import { TbWorld } from 'react-icons/tb';
import { CiLocationOn } from 'react-icons/ci';
import { BadgeType } from '../constants/dataTypes';




const Search = () => {

    const params = useParams<string>();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { filteredFoodItems, searchRestaurant, searchRestaurantResult } = useRestaurantStore();


    console.log(searchRestaurantResult);


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



    const inputChnageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
    }

    // Submit handler : 
    const submitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }




    useEffect(() => {
        searchRestaurant(params.id!, searchQuery, filteredFoodItems);
    }, [params.id!, searchQuery, filteredFoodItems]);



    return (
        <>
            <div className="flex md:flex-row lg:flex-row flex-col">

                <div className="md:block lg:block hidden sm:hidden">
                    <FilterFood />
                </div>

                <div className="w-full mt-5">
                    {/* form  */}
                    <form action="" className='flex mt-5 md:mt-0 lg:mt-0 sm:mt-5  md:w-full lg:w-full sm:w-11/12 w-11/12 m-auto  gap-1 relative' onSubmit={submitHandle}>
                        <input
                            type="text"
                            placeholder='Search restaurant and cuisines'
                            className='w-11/12 border rounded-sm pl-10 outline-none'
                            name='search'
                            onChange={inputChnageHandle}
                            required
                            autoComplete='off'
                        />
                        <IoSearchOutline className='absolute top-2 left-2' size={23} color='gray' />
                        <Button className='bg-blue-500' type='submit'>Search</Button>
                    </form>

                    {/* predefinde Filter irem categories : */}
                    <div className="md:hidden lg:hidden block sm:block">
                        <FilterFood />
                    </div>


                    <div className="mt-5">
                        <div className="flex flex-col items-start sm:items-start gap-1">
                            <span className='flex gap-1 items-center mr-5'>
                                <h1 className='font-extrabold ml-2 md:ml-0 lg:ml-0'>({searchRestaurantResult && searchRestaurantResult?.length || 0})</h1>
                                <p className='text-sm md:text-base lg:text-base font-[500]'>Result found</p>
                            </span>
                            <div className="grid grid-cols-3 md:grid-cols-10 lg:grid-cols-10 gap-2">
                                {
                                    ["Briyani", "Momos", "Jalebi", "Burger", "Pizza"].map((val: string, idx: number) => {
                                        return (
                                            <div className="border-2 border-zinc-100 py-1  shadow-sm bg-zinc-50 rounded-sm px-2" key={idx}>
                                                <span className='flex items-center justify-center gap-2'>
                                                    <p className='text-sm'>{val}</p>
                                                    <RxCross2 size={16} className='cursor-pointer hover:text-red-500' />
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Card menu  */}
                        <div className="grid gap-5 md:grid-cols-2 sm:grid-cols-2 mt-5 lg:grid-cols-3">

                            <div className="border shadow-sm py-2 rounded-sm hover:scale-[99%] transition-all duration-200 flex-col gap-2 px-2  flex relative justify-center">

                                {
                                    // Check if the searchRestaurantResult is available or not : 
                                    searchRestaurantResult && searchRestaurantResult?.length! > 0 ?
                                        <>
                                            {
                                                searchRestaurantResult.map((val) => {

                                                    const { _id, imageURL, description, restaurantName, cuisines, city, country, deliveryTime } = val;

                                                    return (
                                                        <div className="" key={val._id}>

                                                            <img src={imageURL} alt="" className='h-48  w-full rounded-md object-cover ' />
                                                            <p className='bg-zinc-50 opacity-75 left-1 rounded-sm px-2 top-1  absolute'>Featured</p>

                                                            <h1 className='text-xl my-1 font-bold'>
                                                                {restaurantName}
                                                            </h1>

                                                            <div className="flex items-center gap-2">
                                                                <CiLocationOn size={20} />
                                                                <p>City : <span className='font-semibold'>{city}</span> </p>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <TbWorld size={20} />
                                                                <p>Country : <span className='font-semibold'>{country}</span> </p>
                                                            </div>

                                                            {/* Options  */}
                                                            <div className="grid grid-cols-3 gap-3">
                                                                <Badge data={badgeData} />
                                                            </div>

                                                            {/* view more  */}
                                                            {/* <span className='border mt-1'></span> */}

                                                            <div className="mt-3 py-2 bg-blue-100 rounded-sm text-end w-full border">
                                                                <Link
                                                                    to={`/view-restaurant-details/${_id}`}
                                                                    className='font-medium mr-2 ' >
                                                                    View more..
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <>
                                            <div className="flex gap-3 items-center  justify-center">
                                                <BsEmojiFrown size={21} />
                                                <h1 className='font-semibold text-center'>No restaurant found</h1>
                                            </div>
                                        </>
                                }

                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default Search