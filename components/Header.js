import  Image  from "next/image";
import {  SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
 } from "@heroicons/react/solid";
function Header() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-transparent p-5 md:px-10">
            
            {/* Left- Logo*/}
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image 
                src="https://links.papareact.com/qd3"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>
            {/* Medium - Search*/}
            <div className="flex items-center md:border-2 rounded-full py-2 bg-white md:shadow-sm">
                <input className="pl-5 bg-transparent outline-none flex-grow placeholder-gray-400 font-light" type="text" placeholder="Where are you going?"/>
                <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2"/>
            </div>
            {/* Right */}
            <div className="flex space-x-4 items-center justify-end text-white">
                <p className="hidden md:inline cursor-pointer text-sm">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6 cursor-pointer"/>
                    <UserCircleIcon className="h-6 cursor-pointer"/>
                </div>
            </div>
        </header>
    )
}

export default Header
