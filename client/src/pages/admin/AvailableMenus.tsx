import { useState } from "react";
import { Button } from "../../components/ui/button"
import { BsMenuButtonWide } from "react-icons/bs";
import PopupModalMenu from "./PopupModalMenu";

const AvailableMenus = () => {


    const [openMenu, setOpenMenu] = useState<boolean>(false);







    return (
        <>
            <div className="w-[60%] m-auto mt-10 flex justify-evenly items-center">
                <h1 className="text-2xl font-extrabold">Available menu</h1>
                <Button onClick={() => setOpenMenu(true)} className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2">
                    <p>Add menu</p>
                    <BsMenuButtonWide size={18} />
                </Button>

                <PopupModalMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
            </div>
        </>
    )
}

export default AvailableMenus