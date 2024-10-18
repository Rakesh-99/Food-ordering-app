import { useState } from "react";
import { Button } from "../../components/ui/button"
import { BsMenuButtonWide } from "react-icons/bs";
import PopupModalMenu from "./PopupModalMenu";
import pizzaImg from '../../assets/pizza.png'
import EditMenuCard from "./EditMenuCard";
import { MenuDetailTypes } from "../../constants/dataTypes";

const AvailableMenus = () => {


    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [editOpenMenu, setEditOpenMenu] = useState<boolean>(false);


    const menuDetails: MenuDetailTypes[] = [
        {
            imageFile: pizzaImg,
            menu_name: 'Paneer Biriyani',
            menu_price: 300,
            menu_description: 'This is hydrabaadi speacial paneer biriyani you will ever have in your life.'
        },
        {
            imageFile: pizzaImg,
            menu_name: 'Paneer Biriyani',
            menu_price: 300,
            menu_description: 'This is hydrabaadi speacial paneer biriyani you will ever have in your life.'
        }
    ]







    return (
        <>
            <div className="lg:w-[90%] md:w-[95%] w-[98%] m-auto mt-10 ">

                {/* Show popup modal   */}
                <PopupModalMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />


                <div className="flex lg:justify-evenly md:justify-between sm:justify-between justify-between items-center">

                    <h1 className="text-2xl font-extrabold">Available menu</h1>
                    <Button onClick={() => setOpenMenu(true)} className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2">
                        <p>Add menu</p>
                        <BsMenuButtonWide size={18} />
                    </Button>
                </div>

                {/* Avilable menu card section   */}

                <div className="mt-16 g">

                    {/* Menu card */}

                    {
                        menuDetails.map((val: MenuDetailTypes, idx: number) => {


                            return (

                                <div className="md:flex-row flex-col md:items-center lg:items-center  items-start  flex  justify-around" key={idx} >


                                    <div className="flex my-4 gap-3">
                                        {/* Image  */}
                                        <img
                                            src={val.imageFile}
                                            alt="menu image"
                                            className="w-28 border object-cover shadow-sm rounded-md px-2"
                                        />

                                        {/* Description  */}
                                        <div className="flex flex-col">
                                            <h1 className="text-xl font-bold">{val.menu_name}</h1>
                                            <p>{val.menu_description}</p>

                                            {/* Price  */}
                                            <span className="flex items-center gap-1">
                                                <h3 className="text-lg font-bold">Price :</h3>
                                                <h3 className="text-blue-500 text-lg font-semibold">{val.menu_price}</h3>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="">
                                        <Button type="button" onClick={() => setEditOpenMenu(true)} className="bg-blue-500 hover:bg-blue-600 w-28">Edit Menu</Button>
                                    </div>

                                    <EditMenuCard
                                        menuDetails={val}
                                        editOpenMenu={editOpenMenu}
                                        setEditOpenMenu={setEditOpenMenu} />
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </>
    )
}
export default AvailableMenus