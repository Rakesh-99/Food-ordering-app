import { Label } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { RestaurantMenuTypes, restaurantMenuSchema } from '../../zod/schema-restaurantMenu/restaurant-menu';
import { Loader } from "lucide-react";
import useMenuStore from "../../store/menu-store/menuStore";

const PopupModalMenu = ({ openMenu, setOpenMenu }: { openMenu: boolean, setOpenMenu: Dispatch<SetStateAction<boolean>> }) => {

    const [formError, setFormError] = useState<Partial<RestaurantMenuTypes>>();

    const { loading, createMenu, updateMenu } = useMenuStore();


    const [formData, setFormData] = useState<RestaurantMenuTypes>({

        price: 0,
        description: '',
        name: '',
        image: ''
    });


    // Input change handle : 
    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'number' && value !== '' ? Number(value) : value // Handle empty value for number input
        })
    }


    // File change handle : 
    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                image: file
            })
        }
    }

    // Form submit handle : 
    const formSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // Zod form validation : 
        const result = restaurantMenuSchema.safeParse(formData);

        if (result.error) {
            const catchError = result.error.formErrors.fieldErrors;
            setFormError(catchError as Partial<RestaurantMenuTypes>)
            return false;
        }

        // Form Data handle : 
        const formDataSetup = new FormData();
        formDataSetup.append("name", formData.name);
        formDataSetup.append("price", formData.price.toString());
        formDataSetup.append("description", formData.description);
        // check if the image available or not then append the image in formData : 
        if (formData.image) {
            formDataSetup.append("image", formData.image);
        }

        // Api implementation : 
        await createMenu(formDataSetup);
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
                                            value={formData.name}
                                            name="name"
                                            placeholder="Name"
                                            className="col-span-3"
                                        />
                                        {
                                            formData &&
                                            <p className="text-sm text-red-500 ml-1">{formError?.name}</p>
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
                                            value={formData.description}
                                            name="description"
                                            placeholder="Description"
                                            className="col-span-3"
                                        />
                                        {
                                            formData &&
                                            <p className="text-sm text-red-500 ml-1">{formError?.description}</p>
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
                                            value={formData.price}
                                            name="price"
                                            placeholder="Price"
                                            className="col-span-3"
                                        />
                                        {
                                            formData &&
                                            <p className="text-sm text-red-500 ml-1">{formError?.price}</p>
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
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="col-span-3"
                                    />
                                    {
                                        formData &&
                                        <p className="text-sm text-red-500 ml-1">{formError?.image}</p>
                                    }
                                </div>

                            </div>

                            <DialogFooter>
                                {
                                    loading ?
                                        <Button disabled className="bg-blue-500 flex gap-2 items-center w-full hover:bg-blue-600" type="submit">
                                            <Loader className="animate-spin" />
                                            <p>Loading..</p>
                                        </Button>
                                        :
                                        <Button className="bg-blue-500 w-full hover:bg-blue-600" type="submit">Add menu</Button>
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default PopupModalMenu