
import { RxAvatar } from "react-icons/rx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { FaPlus } from "react-icons/fa6";
import { GrSubtract } from "react-icons/gr";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";




const Cart = () => {

  const [foodPrice] = useState(120);

  const [quantity, setQuantity] = useState(1);

  const [totalPrice, setTotalPrice] = useState(foodPrice);


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
        <TableCaption>A list of your recent invoices.</TableCaption>
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
            <TableCell className="text-right"><Button className="bg-blue-500">Remove</Button></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Checkout button  */}
      <Link to={'/checkout'} className="flex justify-end mt-5">
        <Button type="button" className="flex gap-4">
          <p>Proceed to checkout</p>
          <FaLongArrowAltRight size={20} />
        </Button>
      </Link>

    </div>
  )
}

export default Cart