import { HeartIcon, StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';


function MiniInfoCard({
    img, 
    location, 
    title,
    description,
    star,
    price,
    total
}) {
    return (
        <div className="flex py-7 px-2 pr-4 cursor-pointer">
            <div className="relative h-24 w-10 md:h-32 md:w-40 
            flex-shrink-0">
                <Image className="rounded-2xl" src={img} layout="fill" objectFit="cover"/>
            </div>

            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <p>{location}</p>
                    {/* <HeartIcon className="h-7 cursor-pointer"/> */}
                </div>

                <h4 className="text-xl w-full">{title}</h4>

                <div className="border-b w-full pt-2" />

                {/* <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p> */}

                <div className="flex justify-between items-end pt-5">
                    <p className="flex items-center">
                        {/* <StarIcon className="h-5 text-red-400"/>
                        {star} */}
                    </p>

                    <div>
                        <p className="text-lg font-semibold lg:text-2xl
                        pb-2">{price}</p>
                        <p className="text-right font-extralight">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniInfoCard