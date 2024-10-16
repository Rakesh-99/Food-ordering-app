import { useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { IoSearchOutline } from "react-icons/io5";
import { ChangeEvent, FormEvent, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

import FilterFood from './FilterFood';
import FoodCardMenu from './FoodCardMenu';



const Search = () => {

    const params = useParams<string>();

    const [searchData, setSearchData] = useState("");

    const inputChnageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchData(value);
    }

    const submitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchData);

        // Api implemention 

    }


    return (
        <>
            <div className="flex md:flex-row lg:flex-row flex-col">

                <div className="md:block lg:block hidden sm:hidden">
                    <FilterFood />
                </div>

                <div className="w-full mt-5">
                    {/* form  */}
                    <form action="" className='flex mt-5 md:mt-0 lg:mt-0 sm:mt-5 border md:w-full lg:w-full sm:w-11/12 w-11/12 m-auto  gap-1 relative' onSubmit={submitHandle}>
                        <input
                            type="text"
                            placeholder='Search restaurant and cuisines'
                            className='w-full border rounded-sm pl-10 outline-none'
                            name='search'
                            onChange={inputChnageHandle}
                            required
                            autoComplete='off'
                        />
                        <IoSearchOutline className='absolute top-2 left-2' size={23} color='gray' />
                        <Button className='bg-blue-500' type='submit'>Search</Button>
                    </form>

                    <div className="md:hidden lg:hidden block sm:block">
                        <FilterFood />
                    </div>

                    {/* Card */}
                    <div className=" mt-5">

                        <div className="flex flex-col items-start sm:items-start gap-1">
                            <span className='flex gap-1 mr-5'>
                                <h1 className='font-extrabold ml-2 md:ml-0 lg:ml-0'>({2})</h1>
                                <p className='text-sm md:text-base lg:text-base font-[500]'>Result</p>
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
                        <div className="grid gap-5 md:grid-cols-2 sm:grid-cols-2 mt-5 lg:grid-cols-4">
                            <FoodCardMenu />
                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default Search