import { ChangeEvent } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';


const Order = () => {


    const selectItemChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log(value);
    }






    return (
        <>
            <div className="flex  px-2 py-2 rounded-md md:shadow-none lg:shadow-none shadow-md   flex-col md:flex-row lg:flex-row justify-evenly lg:items-center mx-3 md:mx-0 lg:mx-0  md:items-center mt-10">
                {/* <h1 className="text-center text-2xl font-extrabold">Order Overview </h1> */}
                {/* Left content  */}
                <div className="flex  flex-col gap-1 rounded-md">
                    <h1 className="text-lg font-semibold">Food Frenzy</h1>
                    <h3 className="text-base font-semibold">Address : <span className="text-lg font-normal">Abc</span></h3>

                    <h3 className="text-base font-semibold">Total Amount : <span className="text-lg font-normal">200</span></h3>
                </div>


                {/* Right content  */}
                <div className="flex md:w-80  lg:w-80 flex-col mt-4 md:mt-0 lg:mt-0 gap-1">
                    <h2 className="text-lg font-semibold">Order Status</h2>

                    <Select >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className=''>
                                {
                                    ["Pending", "Confirmed", "Preapiring", "Out for delivery"].map((val: string, idx: number) => {
                                        return (
                                            <SelectItem onChange={selectItemChange} value={val} key={idx}>{val}</SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </>
    )
}

export default Order