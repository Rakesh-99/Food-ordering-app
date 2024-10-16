import PizzaImage from '../assets/pizza.png';
import { IoSearchOutline } from "react-icons/io5";
import { Button } from '../components/ui/button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {


  const [searchData, setSearchData] = useState('');
  const naviagte = useNavigate();



  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    naviagte(`/search/${searchData}`);
  }

  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchData(value)
  }






  return (
    <>
      <div className="flex w-[90%]  m-auto mt-10 md:mt-0 lg:mt-0 justify-around items-center flex-col md:flex-row lg:flex-row flex-wrap  ">
        {/* Left content */}
        <div className="md:w-1/3 lg:w-1/3 w-full relative ">



          <span className='bg-zinc-50 absolute -z-10 -top-32 rounded-full h-[200px] w-[200px]'></span>
          <span className='bg-zinc-50 absolute -z-10  -right-20 rounded-full h-[400px] w-[400px]'></span>



          <h1 className='text-3xl font-extrabold font-sans'>Order food anytime & <br /> anywhere</h1>
          <p>Hey, our delicious food is waiting for you, we are always ner to you</p>

          <div className="mt-5">
            <div className="">
              <h1 className='text-2xl font-extrabold'>What's on your mind?</h1>
              <h1 className='text-xl font-[500] '>Discover the best food & drinks</h1>
            </div>



            <form action="" className='flex relative mt-5' onSubmit={submitHandle} >
              <input
                type="text"
                required
                placeholder='Search Restaurant by Food, City & Country'
                className='pl-10 mr-2 w-full  outline-none border py-2 '
                onChange={inputChangeHandle}
                name='search'
              />

              <IoSearchOutline size={23} color='gray' className='absolute left-0 top-2 ml-2' />

              <Button className='bg-blue-500' type='submit'>Search</Button>
            </form>


          </div>
        </div>
        {/* Right content */}
        <div className="md:w-1/2  lg:w-1/2 w-full flex justify-center">
          <div className="md:w-[500px] lg:w-[600px]">
            <img
              src={PizzaImage}
              className=""
              alt="hero image"
            />
          </div>

        </div>


      </div>
    </>
  );
};

export default Home;
