import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Image from "next/image";

import { LuMapPin } from "react-icons/lu";


const DestinationDetailsPage =async ({params}) => {
    const {id} = await params;
    // console.log(id);

    const {token} = await auth.api.getToken({
      headers: await headers()
    })
    // console.log(token);


    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const destination = await res.json();

     const { _id, imageUrl, price, duration, destinationName, country } =
       destination;

    // console.log(destination);
    return (
      <div className="container mx-auto mb-10 mt-4">
        <div className="flex items-center gap-2 justify-end my-3">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>
        <div className="relative w-full h-[450px]">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <LuMapPin /> <span>{country}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {destination.destinationName}
              </h2>
              <p>{destination.duration}</p>
            </div>
            <div className="mt-5 mb-10">
              <h4 className="text-xl font-bold">Over view</h4>
              <p>
                Top travel destinations span both local highlights in Bangladesh
                and major international hubs across Asia, Europe, the Americas,
                Africa, and Oceania, with peak outdoor travel weather in
                Bangladesh from mid-December to February. In Bangladesh,
                visitors explore coastal beaches in Cox's Bazar, wildlife in the
                Sundarbans, tea gardens in Srimangal, historic landmarks like
                Lalbagh Fort and Ahsan Manzil in Dhaka, and hill views in Sajek
                and Bandarban. Popular Asian and global spots include Tokyo,
                Kyoto, Bali, the Maldives, Paris, Rome, Florence, and Santorini.
                Travelers also head to New York City, the Grand Canyon, Banff
                National Park, and Machu Picchu in the Americas. Rounding out
                the global mix are Cape Town, Cairo, Sydney, and Bora Bora
                across Africa and Oceania.
              </p>
            </div>
          </div>
          <div>
            <BookingCard destination={destination} />
          </div>
        </div>
      </div>
    );
};

export default DestinationDetailsPage;