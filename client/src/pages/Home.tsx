import PizzaImage from '../assets/pizza.png';
import { IoSearchOutline } from "react-icons/io5";
import { Button } from '../components/ui/button';




const Home = () => {
  return (
    <>
      <div className="flex w-[90%] m-auto mt-10 md:mt-0 lg:mt-0 justify-around items-center flex-col md:flex-row lg:flex-row flex-wrap  ">
        {/* Left content */}
        <div className="md:w-1/3 lg:w-1/3 w-full  ">
          <h1 className='text-3xl font-extrabold font-sans'>Order food anytime & <br /> anywhere</h1>
          <p>Hey, our delicious food is waiting for you, we are always ner to you</p>

          <div className="mt-5">
            <div className="">
              <h1 className='text-2xl font-extrabold'>What's on your mind?</h1>
              <h1 className='text-xl font-[500] '>Discover the best food & drinks</h1>
            </div>

            <div className="flex relative mt-5">
              <input type="text" placeholder='Search food' className='pl-10 mr-2 w-full  outline-none border py-2 ' />
              <IoSearchOutline size={23} color='gray' className='absolute left-0 top-2 ml-2' />
              <Button>Search</Button>
            </div>

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
