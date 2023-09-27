"use client"
import AuthContext from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaRightLong } from "react-icons/fa6"

const Footer = () => {
  const{user} = useContext(AuthContext)
  return (
    <div className="bg-gradient-to-b from-green-50 via-blue-200 to-blue-700  text-white md: tx-lg text-center">
      <div className="footer-action flex justify-center items-center gap-2 p-2 ">
        <Image width={100} height={30} src="/images/logo.jpg" alt="logo" className="mix-blend-darken"/>
        {!user && <button className="bg-gradient-to-br from-green-500 via-purple-500 to-green-700 rounded-tl-2xl rounded-br-2xl">
          <Link href={"/register"} className="rounded-lg py-4 px-6 flex justify-items-center items-center gap-2  ">
            <span className="uppercase font-bold text-lg md:text-2xl"> Sign UP</span>
            <i><FaRightLong/></i>
            </Link>
        </button>}
        
      </div>
      <div className="md:flex justify-around items-center m-5">
        <div className="footer-info sm:flex justify-center items-center gap-2 text-sm md:text-lg cursor-pointer">
          <div className="hover:scale-110 hover:text-lg md:hover:text-xl hover:mr-2 transition-all duration-300 ease-in-out">Contact Us</div>
          <div className="hover:scale-110 hover:text-lg md:hover:text-xl hover:mr-2 transition-all duration-300 ease-in-out">Terms and Conditions</div>
          <div className="hover:scale-110 hover:text-lg md:hover:text-xl hover:mr-2 transition-all duration-300 ease-in-out">Privacy</div>
        </div>
        <div className="copyright">
          &#174;copyright 2023 built and design by DrsoadJS
        </div>

      </div>
    </div>
  );
};

export default Footer;
