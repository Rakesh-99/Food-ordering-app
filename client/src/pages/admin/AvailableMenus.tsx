import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button"
import { BsMenuButtonWide } from "react-icons/bs";
import PopupModalMenu from "./PopupModalMenu";
import EditMenuCard from "./EditMenuCard";
import useMenuStore from "../../store/menu-store/menuStore";


const AvailableMenus = () => {

    const [menuId, setMenuId] = useState<string>("");

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [editOpenMenu, setEditOpenMenu] = useState<boolean>(false);

    const { menus, getMenu } = useMenuStore();



    const handleEditClick = (id: string) => {
        setMenuId(id);
        getMenu(id)
        setEditOpenMenu(true);
    };


    console.log(menus);



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
                        menus && menus.map((val: any) => {

                            return (
                                <div className="md:flex-row flex-col md:items-center lg:items-center  items-start  flex  justify-around" key={val._id} >

                                    <div className="flex my-4 gap-3">

                                        {/* Image  */}
                                        <img
                                            src={val.image}
                                            alt="menu image"
                                            className="w-28 border object-cover shadow-sm rounded-md px-2"
                                        />


                                        {/* Description  */}
                                        <div className="flex flex-col">
                                            <h1 className="text-xl font-bold">{val.name}</h1>
                                            <p>{val.description}</p>

                                            {/* Price  */}
                                            <span className="flex items-center gap-1">
                                                <h3 className="text-lg font-bold">Price :</h3>
                                                <h3 className="text-blue-500 text-lg font-semibold">{val.price}</h3>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="">
                                        <Button type="button"
                                            className="bg-blue-500 hover:bg-blue-600 w-28"
                                            onClick={() => handleEditClick(val._id)}
                                        >Edit Menu
                                        </Button>
                                    </div>

                                    <EditMenuCard
                                        menuId={menuId}
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