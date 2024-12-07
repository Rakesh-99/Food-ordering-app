import { NavLink } from "react-router-dom"
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet";
import { IoHomeOutline, IoCart } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { RxUpdate } from "react-icons/rx";

import { RiRestaurantFill } from "react-icons/ri";
import { Loader2, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLinksTypes } from "../constants/dataTypes";
import { useUserStore } from "../store/userStore";








const Header = () => {

  const { logout, loading, isAuthenticated, user } = useUserStore();

  const navlinks: NavLinksTypes[] = [

    {
      path: '/',
      label: 'Home',
      icon: IoHomeOutline
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: ImProfile
    },
    {
      path: '/order',
      label: 'Order',
      icon: RxUpdate
    }
  ]


  const logoutHandle = async () => {
    await logout();
  };


  return (
    <>
      <div className="md:flex lg:flex sm:hidden hidden border-b relative py-4 items-center justify-between md:px-10 lg:px-10 sm:px-3 px-2">

        {/* App title  */}
        <div className="">
          <Link to={'/'} className="md:text-2xl lg:text-2xl sm:text-lg text-sm font-extrabold">Food Frenzy</Link>
        </div>


        {/* For larger screen devices - i.e lg and md */}
        <div className="flex gap-12 items-center">

          <div className="flex items-center gap-10">

            {/* Nvalinks  */}
            {
              navlinks.map((val: NavLinksTypes, idx: number): JSX.Element => {

                return (
                  <div className="" key={idx}>
                    <NavLink className='flex items-center gap-1 justify-center'
                      to={val.path}>
                      <span> <val.icon size={18} className="mb-1" />  </span>
                      <p className="font-[500]">{val.label}</p>
                    </NavLink>

                  </div>
                )
              })
            }


            {/* Dashboard */}
            {
              user && user?.admin &&
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="py-1 px-2 text-sm">Dashboard</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">

                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem

                    >
                      <Link to={'/admin/restaurant'}>Restaurant</Link>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem

                    >
                      <Link to={'/admin/available-menu'}>Menu</Link>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem

                    >
                      <Link to={'/admin/order'}>Order</Link>
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            }

          </div>

          <div className="flex items-center gap-6 ">
            {/* Theme drop down menu  */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem >
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart  */}
            <div className="relative">
              <Link to={'/cart'}><IoCart size={22} /></Link>
              <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full text-center w-5 font-semibold text-sm">
                {1}
              </span>
            </div>

            <div className="">
              <FaCircleUser size={22} />
            </div>

            {/* Logout button :  */}
            {/* Rendering the login and logout button based on the user existence :  */}

            {
              isAuthenticated ?
                <div className="">
                  {
                    loading ?
                      <button disabled className="flex items-center justify-center gap-1 font-semibold bg-red-500 text-white py-2 px-3 rounded-sm">
                        <p>Logout..</p>
                        <Loader2 />
                      </button>
                      :
                      <button onClick={logoutHandle} className="font-semibold bg-red-500 text-white py-2 px-3 rounded-sm">Logout</button>
                  }
                </div>
                :
                <Button >
                  <Link to={'/login'}>Get started</Link>
                </Button>
            }


          </div>
        </div >
      </div>
      {/* For smaller screen devices  */}
      <div className="md:hidden lg:hidden flex ">
        <SmallerScreenHeader />
      </div>
    </>
  )
}

export default Header;




// Navbar for Smaller screen devices : 

export const SmallerScreenHeader = () => {

  const { logout, loading, isAuthenticated, user } = useUserStore((state) => state);

  const logoutHandle = async () => {
    await logout();
  };

  const navlinks: NavLinksTypes[] = [

    {
      path: '/profile',
      label: 'Profile',
      icon: IoHomeOutline
    },
    {
      path: '/restaurant-orders',
      label: 'Restaurant Orders',
      icon: RxUpdate
    },

    {
      path: '/cart',
      label: 'Cart',
      icon: IoCart
    }
  ];

  const adminRoutes = [
    {
      path: '/admin/available-menu',
      label: 'Menu',
      icon: BiMenu
    },
    {
      path: '/admin/restaurant',
      label: 'Restaurant',
      icon: RiRestaurantFill

    },
    {
      path: '/admin/order',
      label: 'Order',
      icon: RxUpdate
    },
  ]

  return (
    <>
      <div className="py-2 w-full shadow-sm">
        <Sheet>
          <SheetTrigger asChild className="">
            <div className="flex items-center justify-between mx-5 py-2">
              <Link to={'/'} className="text-xl font-extrabold ">Food Frenzy</Link>
              <Button variant="outline" className="">
                <BiMenu size={23} />
              </Button>
            </div>
          </SheetTrigger>



          <SheetContent className="flex flex-col gap-10">
            {/* Header  */}
            <SheetHeader className="border-b-2">
              <div className="flex items-center justify-between my-10">
                <Link to={'/'} className="text-xl font-extrabold">Food Frenzy</Link>

                {/* theme toggle  */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MdOutlineWbSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <LuSunMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem >
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                      Dark
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetHeader>

            <div className="flex  flex-col gap-1 ">
              {
                navlinks.map((val: NavLinksTypes, idx: number): JSX.Element => {
                  return (
                    <SheetClose asChild className="flex gap-2" key={idx}>
                      <Link className="my-2" to={val.path}>
                        <val.icon size={22} />
                        <p className="text-base font-medium">{val.label}</p>
                      </Link>
                    </SheetClose>
                  )
                })
              }

              {
                user && user?.admin &&
                <div className="">
                  {
                    adminRoutes.map((val: NavLinksTypes, idx: number) => {
                      return (
                        <SheetClose asChild className="flex gap-2" key={idx}>
                          <Link className="my-4" to={val.path}>
                            <val.icon size={22} />
                            <p className="text-base font-medium">{val.label}</p>
                          </Link>
                        </SheetClose>
                      )
                    })
                  }
                </div>
              }
            </div>


            <SheetFooter className="">
              <SheetClose asChild>

                {/* conditionally rendering the login and logout based on user existence  */}

                <div className="">
                  {
                    isAuthenticated
                      ?

                      <div className="w-full">
                        {
                          loading ?
                            <button disabled className="flex w-full items-center justify-center gap-1 font-semibold bg-red-500 text-white py-2 px-3 rounded-sm">
                              <p>Logout..</p>
                              <Loader2 />
                            </button>
                            :
                            <button onClick={logoutHandle} className="font-semibold bg-red-500 text-white py-2 px-3 rounded-sm w-full">Logout</button>
                        }
                      </div>
                      :
                      <Button className="w-full">
                        <Link to={'/login'}>Get Started</Link>
                      </Button>
                  }
                </div>


              </SheetClose>
            </SheetFooter>

          </SheetContent>
        </Sheet >
      </div >
    </>
  )
};


