import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu";
import { MenuDetailTypes } from "../../constants/dataTypes";
import { Loader } from "lucide-react";
// import { Label } from "@/components/ui/label"







const EditMenuCard = ({ editOpenMenu, setEditOpenMenu, menuDetails }: { editOpenMenu: boolean, setEditOpenMenu: Dispatch<SetStateAction<boolean>>, menuDetails: MenuDetailTypes }) => {


    const loading = false;


    const [editMenuInfo, setEditMenuInfo] = useState({
        menu_name: menuDetails.menu_name,
        menu_price: menuDetails.menu_price,
        menu_description: menuDetails.menu_description,
        menu_imageFile: menuDetails.imageFile
    })




    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setEditMenuInfo({
            ...editMenuInfo,
            [name]: type === 'number' ? Number(value) : value
        })
    }

    // Function will trigger when the filechange is made :

    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        // function to read the local file image 

        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = (event) => {
                const result = event.target?.result as string;
                setEditMenuInfo({ ...editMenuInfo, menu_imageFile: result })
            }

            fileReader.readAsDataURL(file);
        }
    };

    // Function will run when the form is being submitted : 

    const formSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

    }




    useEffect(() => {

    }, []);


    return (
        <>
            <Dialog open={editOpenMenu} onOpenChange={setEditOpenMenu}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Menu Details</DialogTitle>
                        <DialogDescription>
                            Make changes to your Menu card here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="grid gap-4 py-4" onSubmit={formSubmitHandle}>

                        {/* Edit  Name  */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Name
                            </Label>
                            <Input
                                name="menu_name"
                                type="text"
                                value={editMenuInfo.menu_name}
                                placeholder="Edit menu name"
                                className="col-span-3"
                                onChange={inputChangeHandle}
                            />
                        </div>

                        {/* Edit description   */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Description
                            </Label>
                            <Input
                                name="menu_description"
                                value={editMenuInfo.menu_description}
                                type="text"
                                placeholder="Edit menu description"
                                className="col-span-3"
                                onChange={inputChangeHandle}
                            />
                        </div>

                        {/* Edit price   */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Price
                            </Label>
                            <Input
                                value={editMenuInfo.menu_price}
                                name="menu_price"
                                type="number"
                                placeholder="Edit menu price"
                                className="col-span-3"
                                onChange={inputChangeHandle}

                            />
                        </div>

                        {/* Edit image   */}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Image
                            </Label>
                            <Input
                                name="menu_imageFile"
                                type="file"
                                accept="image/*"
                                className="col-span-3"
                                onChange={fileChangeHandle}
                            />
                        </div>

                        <div className="grid grid-cols-4  items-center gap-">
                            <p>CurrentImage:</p>
                            <p className="ml-5">{String(editMenuInfo.menu_imageFile).slice(0, 30)}</p>
                        </div>

                        <DialogFooter>

                            {
                                loading ?
                                    <Button disabled className="bg-blue-500 w-full flex items-center gap-2 hover:bg-blue-600" type="submit"> <Loader className="animate-spin" /> <p>Please wait</p></Button>
                                    :
                                    <Button className="bg-blue-500 w-full hover:bg-blue-600" type="submit">Save changes</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditMenuCard