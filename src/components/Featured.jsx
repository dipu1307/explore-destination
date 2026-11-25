import { Button } from "@heroui/react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import DestinationCard from "./DestinationCard";

const Featured = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
    const destinations = await res.json()
    console.log(destinations)
    return (
      <div className="mt-10 container mx-auto">
        <div className="flex items-center justify-between my-10">
          <div>
            <h1 className="text-3xl font-bold">Featured Destination</h1>
            <p className="">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link href={"/destination"}>
            <Button
              variant="outline"
              className={"border-2 rounded-none text-cyan-500 border-cyan-500"}
            >
              All Destinations <FaLongArrowAltRight />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-5 mb-10">
            {
                destinations.map(destination=> <DestinationCard key={destination._id} destination={destination}/>)
            }
        </div>
      </div>
    );
};

export default Featured;