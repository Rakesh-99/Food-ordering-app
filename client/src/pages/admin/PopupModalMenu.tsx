import { Label } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { RestaurantMenuTypes, restaurantMenuSchema } from '../../zod/schema-restaurantMenu/restaurant-menu';

const PopupModalMenu = ({ openMenu, setOpenMenu }: { openMenu: boolean, setOpenMenu: Dispatch<SetStateAction<boolean>> }) => {



    const [formData, setFormData] = useState<RestaurantMenuTypes>({

        menu_price: 0,
        menu_description: '',
        menu_name: '',
        menu_imageFile: ''
    })
    const [formError, setFormError] = useState<Partial<RestaurantMenuTypes>>();



    const formSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = restaurantMenuSchema.safeParse(formData);

        if (result.error) {
            const catchError = result.error.formErrors.fieldErrors;
            setFormError(catchError as Partial<RestaurantMenuTypes>)
            return false;
        }

        // Api implementation 


    }

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'number' && value !== '' ? Number(value) : value // Handle empty value for number input
        })
    }

    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const fileReader = new FileReader();

            fileReader.onloadend = (event) => {
                const result = event.target?.result as string
                setFormData({
                    ...formData,
                    menu_imageFile: result
                })
            }
            fileReader.readAsDataURL(file);
        }
    }




    return (
        <>

            {
                openMenu &&

                <Dialog open={openMenu} onOpenChange={setOpenMenu}>

                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={formSubmitHandle}>
                            <DialogHeader>
                                <DialogTitle>Add menu</DialogTitle>
                                <DialogDescription>
                                    Add a new menu.Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">

                                {/* Menu name  */}

                                <div className="flex flex-col ">
                                    <Label className="text-left">
                                        Name
                                    </Label>
                                    <div className="w-full flex flex-col gap-2">

                                        <Input
                                            type="text"
                                            onChange={inputChangeHandle}
                                            value={formData.menu_name}
                                            name="menu_name"
                                            placeholder="Name"
                                            className="col-span-3"
                                        />
                                        {
                                            formData &&
                                            <p className="text-sm text-red-500 ml-1">{formError?.menu_name}</p>
                                        }

                                    </div>

                                </div>

                                {/* Menu Description  */}
                                <div className="flex flex-col">
                                    <Label className="text-left">
                                        Description
                                    </Label>
                                    <div className="w-full flex flex-col gap-2">

                                        <Input
                                            type="text"
                                            onChange={inputChangeHandle}
                                            value={formData.menu_description}
                                            name="menu_description"
                                            placeholder="Description"
                                            className="col-span-3"
                                        />
                                        {
                                            formData &&
                                            <p className="text-sm text-red-500 ml-1">{formError?.menu_description}</p>
                                        }

                                    </div>

                                </div>

                                {/*Menu Price  */}
                                <div className="flex flex-col">
                                    <Label className="text-left">
                                        Price
                                    </Label>
                                    <div className="w-full flex flex-col gap-2">

                                        <Input
                                            type="number"
                                            onChange={inputChangeHandle}
                                            value={formData.menu_price}
                                            name="menu_price"
                                            placeholder="Price"
                                            className="col-span-3"
                                        />
                                        {
                                            formData &&
                                            <p className="text-sm text-red-500 ml-1">{formError?.menu_price}</p>
                                        }
                                    </div>
                                </div>

                                {/* Menu image  */}
                                <div className="flex flex-col">
                                    <Label className="text-left">
                                        Image
                                    </Label>
                                    <Input
                                        onChange={fileChangeHandle}
                                        name="menu_imageFile"
                                        type="file"
                                        className="col-span-3"
                                    />
                                    {
                                        formData &&
                                        <p className="text-sm text-red-500 ml-1">{formError?.menu_imageFile}</p>
                                    }
                                </div>

                            </div>

                            <DialogFooter>
                                <Button className="bg-blue-500 hover:bg-blue-600" type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}

export default PopupModalMenu