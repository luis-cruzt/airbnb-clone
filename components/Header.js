import Image from "next/image";
import {
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";


function Header({isTransparent, placeholder}) {

    const [searchInput, setsearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [nOfGuests, setNOfGuests] = useState(1);
    const router =useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const resetInput = ()=> {
        setsearchInput('');
    }

    const search = () => {
        router.push({
            pathname:'/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests: nOfGuests,
            }
        });
    }



    return (
        <header className={"sticky top-0 z-50 grid grid-cols-3 p-5 md:px-10 "+(isTransparent ? 'bg-transparent':'bg-white shadow-md')}>

            {/* Left- Logo*/}
            <div onClick={()=>router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image                    
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>
            {/* Middle - Search*/}
            <div className="flex items-center md:border-2 rounded-full py-2 bg-white md:shadow-sm">
                <input className="pl-5 bg-transparent outline-none flex-grow placeholder-gray-400 font-light"
                    value={searchInput}
                    onChange={(e) => setsearchInput(e.target.value)}
                    type="text"
                    placeholder={(placeholder || 'Where are you going?')}
                />
                <SearchIcon
                onClick={search}
                 className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2" />
            </div>
            {/* Right */}
            <div className={"flex space-x-4 items-center justify-end " + (isTransparent ? 'text-white' : 'text-gray-400')}>
                <p className="hidden md:inline cursor-pointer text-sm">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6 cursor-pointer" />
                    <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>

            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-4">
                    <DateRangePicker
                        classNames="rounded-full"                        
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    
                    <div className="flex items-center border-b">
                        <h2 className="font-semibold text-2xl flex-grow">Number of Guests</h2>
                        <UsersIcon className="h-5 text-white" />
                        <input type="number" className="w-12 pl-2 bg-transparent outline-none text-lg text-[#FD5B61]"
                            value={nOfGuests} onChange={(e) => setNOfGuests(e.target.value)}
                            min={1}
                        />
                    </div>
                    <div className="flex">
                        <button className="flex-grow text-white">Cancel</button>
                        <button className="flex-grow text-[#FD5B61]">Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
