import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader } from "lucide-react";
import useMenuStore from "../../store/menu-store/menuStore";







type EditMenuInfoType = {
    name: string,
    price: number,
    description: string,
    image: File | undefined
}


const EditMenuCard = ({ editOpenMenu, setEditOpenMenu, menuId }: { editOpenMenu: boolean, setEditOpenMenu: Dispatch<SetStateAction<boolean>>, menuId: string }) => {



    const { loading, updateMenu, selectedMenu } = useMenuStore();




    const [editMenuInfo, setEditMenuInfo] = useState<EditMenuInfoType>({
        name: "",
        price: 0,
        description: "",
        image: undefined
    })


    // Input change handle : 
    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setEditMenuInfo({
            ...editMenuInfo,
            [name]: type === 'number' ? Number(value) : value
        })
    }

    // File chnage handle :
    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setEditMenuInfo({
                ...editMenuInfo,
                image: file
            })
        }
    };

    // Function will run when the form is being submitted : 
    const formSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // form data config : 
        const formData = new FormData();
        formData.append("name", editMenuInfo?.name);
        formData.append("price", editMenuInfo?.price.toString());
        formData.append("description", editMenuInfo?.description);
        if (editMenuInfo.image) {
            formData.append("image", editMenuInfo?.image);
        }
        // Api implementation : 
        await updateMenu(menuId, formData);
    };


    useEffect(() => {
        if (selectedMenu) {
            setEditMenuInfo({
                name: selectedMenu.name,
                description: selectedMenu.description,
                price: selectedMenu.price,
                image: undefined
            })
        }
    }, [selectedMenu])


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
                                name="name"
                                type="text"
                                value={editMenuInfo.name}
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
                                name="description"
                                value={editMenuInfo.description}
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
                                value={editMenuInfo.price}
                                name="price"
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
                                name="image"
                                type="file"
                                accept="image/*"
                                className="col-span-3"
                                onChange={fileChangeHandle}
                            />
                        </div>

                        <div className="grid grid-cols-4  items-center gap-">
                            <p>CurrentImage:</p>
                            <p className="ml-5">{editMenuInfo.image ? editMenuInfo.image.name : "No image selected"}</p>
                        </div>

                        <DialogFooter>

                            {
                                loading ?
                                    <Button disabled className="bg-blue-500 w-full flex items-center gap-2 hover:bg-blue-600" type="submit"> <Loader className="animate-spin" /> <p>Please wait</p></Button>
                                    :
                                    <Button onClick={() => setEditOpenMenu(false)} className="bg-blue-500 w-full hover:bg-blue-600" type="submit">Save changes</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditMenuCard