import Image from "next/image";
import Header from '../components/Header'
function Banner() {
    return (
        <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
            <Header isTransparent={true}/>
            <Image
                src="/hero.webp"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute top-1/4 w-full text-left px-8">
            <p className="font-bold md:text-5xl lg:text-7xl text-4xl mx-auto md:mx-0 w-full text-white">
                        Olympian & <br />
                        Paralympian <br />
                        Online <br />
                        Experiences <br />
                    </p>
                    <button className="h-10 w-40 text-black font-semibold bg-white px-4 mt-10 shadow-md rounded-md hover:shadow-xl active:scale-90 transition duration-75">
                        Explore Now
                    </button>
            </div>
        </div>

    )
}

export default Banner
