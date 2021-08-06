import Image from "next/image";

function LargeCard({ img, title, description, buttonText }) {
    return (
        <section className="relative py-16 cursor-pointer">
            <div className="relative h-[500px] min-w-[300px]">
                <Image className="rounded-xl" src={img} layout="fill" objectFit="cover"/>
            </div>
            <div className="absolute top-60 left-16">
                <h3 className="text-5xl mb-3 w-96 font-semibold">{title}</h3>
                {/* <p>{description}</p> */}

                <button className="text-sm text-white bg-black px-5 py-3 rounded-lg mt-5">{buttonText}</button>
            </div>
        </section>
    )
}

export default LargeCard
