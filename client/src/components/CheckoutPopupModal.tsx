import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Label } from '@radix-ui/react-dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";



const CheckoutPopupModal = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {


    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contact: '',
        address: '',
        country: '',
        city: ''
    });


    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const formSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        // Api Implementation 

    }


    return (
        <>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogContent>
                    <DialogTitle>
                        Review Your order summery
                    </DialogTitle>

                    <DialogDescription>
                        <p className="text-red-500 font-semibold">Note : </p>
                        <p className="text-sm">Please check your details properly before proceeding to the payment section. You can not change the delivery address once the order is placed.</p>

                        <form onSubmit={formSubmitHandle}>
                            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 ">

                                {/* Username  */}
                                <div className="flex flex-col gap-1 mt-3">
                                    <Label className="font-medium ">Fullname</Label>
                                    <input
                                        type="text"
                                        className="border py-2 outline-none  rounded-sm w-full px-3"
                                        placeholder="Your fullname"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={inputChangeHandle}
                                    />
                                </div>

                                {/* Email  */}

                                <div className="flex flex-col gap-1 mt-3">
                                    <Label className="font-medium ">Email</Label>
                                    <input
                                        type="email"
                                        className="border py-2 outline-none  rounded-sm w-full px-3"
                                        placeholder="Your Email address"
                                        name="email"
                                        value={formData.email}
                                        onChange={inputChangeHandle}
                                    />
                                </div>

                                {/* Contact  */}

                                <div className="flex flex-col gap-1 mt-3">
                                    <Label className="font-medium ">Contact</Label>
                                    <input
                                        type="text"
                                        className="border py-2 outline-none  rounded-sm w-full px-3"
                                        placeholder="Your contact number"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={inputChangeHandle}
                                    />
                                </div>

                                {/* Country  */}
                                <div className="flex flex-col gap-1 mt-3">
                                    <Label className="font-medium ">Country</Label>
                                    <input
                                        type="text"
                                        className="border py-2  outline-none rounded-sm w-full px-3"
                                        placeholder="Your country"
                                        name="country"
                                        value={formData.country}
                                        onChange={inputChangeHandle}
                                    />
                                </div>

                                {/* City  */}
                                <div className="flex flex-col gap-1 mt-3">
                                    <Label className="font-medium ">City</Label>
                                    <input
                                        type="text"
                                        className="border py-2  outline-none rounded-sm w-full px-3"
                                        placeholder="Your current city"
                                        name="city"
                                        value={formData.city}
                                        onChange={inputChangeHandle}
                                    />
                                </div>

                                {/* Address  */}
                                <div className="flex flex-col gap-1 mt-3">
                                    <Label className="font-medium ">Address</Label>
                                    <input
                                        type="text"
                                        className="border py-2  outline-none  rounded-sm w-full px-3"
                                        placeholder="Your current address"
                                        name="address"
                                        value={formData.address}
                                        onChange={inputChangeHandle}
                                    />
                                </div>
                            </div>

                            <DialogFooter >
                                <Button
                                    type="submit"
                                    className="w-full flex gap-4 items-center mt-5 bg-blue-500 hover:bg-blue-600">
                                    <p>Continue to payment</p>
                                    <FaLongArrowAltRight size={18} />
                                </Button>
                            </DialogFooter>

                        </form>
                    </DialogDescription>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default CheckoutPopupModal