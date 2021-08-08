import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import MiniInfoCard from "../components/MiniInfoCard";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { useState, useCallback } from "react";
import getCenter from 'geolib/es/getCenter';
import Image from 'next/image';

function Search({ searchResults }) {
    const router = useRouter();

    // ES6 Destructuring
    const { location, startDate, endDate, noOfGuests } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");

    const range = `${formattedStartDate} to ${formattedEndDate}`;

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transformation
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);


    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
        transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
        transitionDuration: 'auto'
    }); 

    return (
        <div>
            <Header isTransparent={false} placeholder={`${location} | ${range} | ${noOfGuests}`} />
            <main className="flex overflow-y-scroll">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ stays from {range} - for {noOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                    <p className="text-xs mb-6">Click a destination to navigate inside the map.</p>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>

                    <div className="flex flex-col">
                        {searchResults.map(({
                            img,
                            location,
                            title,
                            description,
                            star,
                            price,
                            total,
                            long,
                            lat,
                        }) => (
                            <div key={title} onClick={() => {
                                setViewport({
                                    longitude: long,
                                    latitude: lat,
                                    zoom: 11,
                                    transitionInterpolator: new FlyToInterpolator(),
                                    transitionDuration: 'auto'
                                });
                            }}>
                                <InfoCard

                                    img={img}
                                    location={location}
                                    title={title}
                                    description={description}
                                    star={star}
                                    price={price}
                                    total={total}
                                />
                            </div>
                        ))}
                    </div>
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px] overflow-hidden">
                    {/* <Map searchResults={searchResults}/> */}
                    <ReactMapGL
                        mapStyle='mapbox://styles/luchorm23/cks2fsog64b5h18mlksef3n44'
                        mapboxApiAccessToken={process.env.mapbox_key}
                        onViewportChange={(newviewport) => setViewport(newviewport)}

                        {...viewport}
                    >
                        {searchResults.map(result => (
                            <div key={result.long}>
                                <Marker                                   
                                    longitude={result.long}
                                    latitude={result.lat}
                                    // offsetLeft={-20}
                                    // offsetTop={-10}
                                >

                                    <Image
                                        onClick={() => setSelectedLocation(result)}
                                        className="cursor-pointer"
                                        width={40}
                                        height={40}
                                        src="/pin.svg"
                                        aria-label="push-pin"
                                        role='img'
                                    />

                                </Marker>
                                {/* The popup that should show if we click on a Marker */}
                                {selectedLocation.long === result.long && (
                                    <Popup
                                        closeOnClick={true}
                                        onClose={() => {
                                            setSelectedLocation({});                                            
                                        }}
                                    
                                        latitude={result.lat}
                                        longitude={result.long}
                                        
                                        // offsetLeft={90}
                                    >
                                         
                                             <MiniInfoCard
                                                img={result.img}
                                                location={result.location}
                                                title={result.title}
                                                description={result.description}
                                                star={result.star}
                                                price={result.price}
                                                total={result.total}
                                                />                                         
                                    </Popup>
                                )}
                            </div>
                        ))}
                    </ReactMapGL>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps() {

    const searchResults = await fetch('https://links.papareact.com/isz').then((res) => res.json());

    return {
        props: {
            searchResults,
        }
    }

}