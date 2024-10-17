
import { RxAvatar } from "react-icons/rx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { FaPlus } from "react-icons/fa6";
import { GrSubtract } from "react-icons/gr";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import CheckoutPopupModal from "./CheckoutPopupModal";




const Cart = () => {

  const [foodPrice] = useState(120);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(foodPrice);
  const [open, setOpen] = useState(false);


  const addition = () => {
    setQuantity((quantity) => quantity + 1);
    setTotalPrice((totalPrice) => totalPrice + foodPrice);
  }

  const subtraction = () => {
    setQuantity((quantity) => quantity - 1);
    setTotalPrice((totalPrice) => totalPrice - foodPrice)
  }
















  return (
    <div className="w-[90%] m-auto mt-10 select-none">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell><RxAvatar size={23} /></TableCell>
            <TableCell>Paneer</TableCell>
            <TableCell>{foodPrice}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">

                {
                  quantity <= 1 ?
                    <Button disabled className="cursor-not-allowed border-2 rounded-full text-center shadow-sm px-3 bg-blue-500 py-2 active:scale-95 transition-all active:bg-green-500 active:text-white"><GrSubtract /></Button>
                    :
                    <Button
                      onClick={subtraction}
                      type="button"
                      className="border-2 rounded-full text-center shadow-sm px-3 bg-blue-500 py-2 active:scale-95 transition-all cursor-pointer active:bg-green-500 active:text-white">
                      <GrSubtract />
                    </Button>

                }

                <span className="text-lg">{quantity}</span>

                <Button
                  onClick={addition}
                  type="button"
                  className="border-2 rounded-full text-center shadow-sm px-3 py-2 bg-blue-500 active:scale-95 transition-all cursor-pointer active:bg-green-500 active:text-white">
                  <FaPlus />
                </Button>

              </div>
            </TableCell>
            <TableCell>{totalPrice}</TableCell>
            <TableCell className="text-right"><Button className="bg-red-500 hover:bg-red-700">Remove</Button></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Total ammount summery  */}

      <div className="mt-5 flex w-full gap-3 justify-end">
        <h2 className="text-xl font-extrabold">Total amount to be paid :</h2>
        <h1 className="font-extrabold text-xl text-blue-500"> ₹ {totalPrice}</h1>
      </div>

      {/* Checkout button  */}

      <div className="flex w-full justify-end">
        <Button type="button" className="flex gap-4 bg-blue-500 hover:bg-blue-600 mt-5" onClick={() => setOpen(true)}>
          <p>Proceed to checkout</p>
          <FaLongArrowAltRight size={20} />
        </Button>
      </div>



      {/* Checkout modal popup  */}
      <CheckoutPopupModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default Cart