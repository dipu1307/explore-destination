'use client';

import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import React, { useState } from 'react';
import toast from "react-hot-toast";

const BookingCard = ({destination}) => {

    const {data: session} = authClient.useSession();
       
    const user = session?.user;
    const [departureDate, setDepartureDate] = useState(null);

    console.log(new Date(departureDate));

    const { price,_id,destinationName,country,imageUrl,} = destination;

    const handleBooking = async()=>{
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            desitinationId: _id,
            destinationName,
            country,
            price,
            imageUrl,
            departureDate: new Date(departureDate)
        }
        console.log(bookingData);
        const res = await fetch(`http://localhost:5000/bookings`,{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        const data = await res.json();
        console.log(data);
        toast.success('You booked succesfully book the destination');
    }

    
    return (
      <div>
        <Card className="border rounded-none mt-5 ">
          <div className="">
            <p>Starting form</p>
            <p className="text-2xl font-bold text-cyan-500">${price}</p>
            <p>per person</p>
          </div>
          <div>
            <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
              <Label>Departure Date</Label>
              <DateField.Group>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
              </DateField.Group>
            </DateField>
          </div>
          <Button onClick={handleBooking} className={'bg-cyan-500 w-full mt-2'}>Book Now</Button>
        </Card>
      </div>
    );
};

export default BookingCard;