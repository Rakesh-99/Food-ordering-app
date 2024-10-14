import { BiCurrentLocation, BiLocationPlus } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { GrLocationPin } from "react-icons/gr";
import { Button } from "../components/ui/button";
import profileImage from '../assets/profile.png';
import { ChangeEvent, FormEvent, useRef, useState } from "react";






const Profile = () => {


    const imageRef = useRef<HTMLInputElement>(null)
    const [userProfilePic, setUserProfilePic] = useState<string | null>("");


    const [userProfile, setUserProfile] = useState({
        fullname: "Rakesh Kumar Parida",
        email: "rakesh@gmail.com",
        address: "Odisha",
        city: "Bhubaneswar",
        country: "India",
        profilePicture: ""
    })




    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        // FileReader 
        if (file) {
            const reader = new FileReader();

            reader.onloadend = (event) => {
                const result = event.target?.result as string;
                setUserProfilePic(result);
                setUserProfile({
                    ...userProfile,
                    profilePicture: result
                })
                // console.log(result);
            }

            reader.readAsDataURL(file);
        }
    }

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setUserProfile({
            ...userProfile,
            [name]: value
        })
    };

    const formSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        // Api implement : 
        
    }



    return (
        <>
            <div className="flex flex-wrap md:flex-row lg:flex-row justify-center items-center flex-col">

                {/* left content  */}
                <div className="md:w-1/2 lg:w-1/2 w-full flex justify-center items-center">
                    <img src={profileImage} alt="profile image" className="md:w-[500px] lg:w-[500px] w-[300px]" />
                </div>

                {/* Right content  */}
                <div className="md:w-1/2 lg:1/2 w-full">
                    <form className="w-full py-10 flex  flex-col justify-center " onSubmit={formSubmitHandle}>

                        {/* Top content  */}
                        <div className="flex items-center  gap-2">
                            {
                                userProfilePic ? <div className="border cursor-pointer hover:bg-zinc-200 w-16 h-16 bg-zinc-50 rounded-full flex justify-center items-center text-center" onClick={() => imageRef.current?.click()} >
                                    <img src={userProfilePic} alt="user profile" className="w-full rounded-full h-full object-fill hover:opacity-65 transition-all" />
                                </div>
                                    :
                                    <div className="border cursor-pointer hover:bg-zinc-200 w-16 h-16 bg-zinc-50 rounded-full flex justify-center items-center text-center" onClick={() => imageRef.current?.click()} >
                                        <span className=" rounded-full  w-full text-xl">CN</span>
                                    </div>
                            }


                            <input
                                className="font-bold  border-b border-violet-400 outline-none py-2 px-2 text-xl" type="text"
                                name="fullname"
                                placeholder="Fullname"
                                onChange={inputChangeHandle}
                                value={userProfile.fullname} />

                            <input type="file"
                                className="hidden"
                                name="profilePicture"
                                ref={imageRef}
                                onChange={fileChangeHandle}
                                accept="image/*" />
                        </div>


                        {/* button content  */}
                        <div className="flex mt-5 flex-col mx-5 gap-5">

                            {/* Email  */}
                            <div className="flex items-center rounded-sm px-3 gap-3 py-2  bg-zinc-50">
                                <span>
                                    <TfiEmail size={21} />
                                </span>

                                <div className="flex  flex-col  w-full">
                                    <label className="font-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        className="w-1/2  py-2 px-2 bg-transparent outline-none border-b border-violet-400"
                                        onChange={inputChangeHandle}
                                        value={userProfile.email}
                                    />
                                </div>
                            </div>

                            {/* Address  */}
                            <div className="flex items-center gap-3 py-2 px-3 rounded-sm bg-zinc-50">
                                <span>
                                    <BiLocationPlus size={23} />
                                </span>

                                <div className="flex w-full flex-col">
                                    <label className="font-semibold">Address</label>
                                    <input
                                        value={userProfile.address}
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        className="w-1/2  py-2 px-2 bg-transparent outline-none border-b border-violet-400"
                                        onChange={inputChangeHandle} />
                                </div>
                            </div>

                            {/* City  */}
                            <div className="flex items-center gap-3 py-2 px-3 rounded-sm bg-zinc-50">
                                <span>
                                    <BiCurrentLocation size={25} />
                                </span>

                                <div className="flex w-full flex-col">
                                    <label className="font-semibold">City</label>
                                    <input
                                        value={userProfile.city}
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className="w-1/2  py-2 px-2 bg-transparent outline-none border-b border-violet-400"
                                        onChange={inputChangeHandle} />
                                </div>
                            </div>


                            {/* Country  */}
                            <div className="flex items-center gap-3 py-2 px-3 rounded-sm bg-gray-100">
                                <span>
                                    <GrLocationPin size={25} />
                                </span>

                                <div className="flex w-full flex-col ">
                                    <label className="font-semibold">Country</label>
                                    <input
                                        value={userProfile.country}
                                        type="text"
                                        name="country"
                                        placeholder="Email address"
                                        className="w-1/2  py-2 px-2 bg-transparent outline-none border-b border-b-violet-400"
                                        onChange={inputChangeHandle} />
                                </div>

                            </div>

                            <div className="w-full  text-center">
                                <Button type="submit" className="bg-violet-500 h-12 md:h-auto lg:h-auto  w-40">Update</Button>
                            </div>
                        </div>

                    </form>
                </div >
            </div >

        </>
    )
};


export default Profile;