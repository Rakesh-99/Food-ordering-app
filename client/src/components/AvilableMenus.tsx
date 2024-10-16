import { Link } from 'react-router-dom';
import pizzaImg from '../assets/food menu card images/dosa.jpg';
import { Button } from './ui/button';

const AvilableMenus = () => {









    
    return (
        <div className="border shadow-sm py-2 rounded-sm hover:scale-[99%] transition-all duration-200 flex-col gap-2 px-2  flex relative justify-center">

            {/*  Image */}
            <img src={pizzaImg} alt="" className='h-48  w-full rounded-md object-cover ' />
            <p className='bg-zinc-50 opacity-75 left-1 rounded-sm px-2 top-1  absolute'>Featured</p>

            {/*  Title  */}
            <h1 className='text-xl font-bold'>
                Paneer tikka pizza
            </h1>

            {/* Description  */}
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem eligendi adipisci iusto deleniti omnis.
            </p>
            {/* Price */}
            <div className="flex gap-2 items-center">
                <h1 className='text-lg font-[500]'>Price :</h1>
                <p className='text-blue-500 font-extrabold text-xl'>120 ₹</p>
            </div>

            {/* Add to cart button  */}

            <Button><Link to={'/cart'}>Add to Cart</Link></Button>
        </div>
    )
}

export default AvilableMenus