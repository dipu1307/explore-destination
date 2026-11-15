import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";

import Image from "next/image";

import { LuMapPin } from "react-icons/lu";


const DestinationDetailsPage =async ({params}) => {
    const {id} = await params;
    console.log(id);
    const res = await fetch(`http://localhost:5000/destination/${id}`);
    const destination = await res.json();

     const { _id, imageUrl, price, duration, destinationName, country } =
       destination;

    console.log(destination);
    return (
      <div className="container mx-auto">
       <div className="flex items-center gap-2 justify-end my-3">
        <EditModal destination={destination}/>
        <DeleteAlert destination={destination}/>
       </div>
        <div className="relative w-full h-[450px]">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div>
            <div className="flex items-center gap-2">
              <LuMapPin /> <span>{country}</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {destination.destinationName}
            </h2>
          </div>
        </div>
      </div>
    );
};

export default DestinationDetailsPage;