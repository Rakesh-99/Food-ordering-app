import { Link } from "react-router-dom";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="w-full text-center h-16 border-t flex-col md:flex-row lg:flex-row flex justify-around items-center py-2">
        <p className="">Developed and designed with love by <Link to='' className="text-violet-500 font-[500]">@Rakesh Kumar Parida</Link></p>


        <div className="flex  gap-10 py-5">
          <span className="border-2 cursor-pointer rounded-full px-2 py-2 shadow "><FaGithub size={21} className="hover:text-violet-700 transition-all" /></span>
          <span className="border-2 cursor-pointer rounded-full px-2 py-2 shadow "><FaTwitter size={21} className="hover:text-violet-700 transition-all" /></span>
          <span className="border-2 cursor-pointer rounded-full px-2 py-2 shadow "><FaLinkedin size={21} className="hover:text-violet-700 transition-all" /></span>
        </div>
      </div>
    </>
  );
};

export default Footer;
