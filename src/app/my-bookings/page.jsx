import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import{auth} from "@/lib/auth";

import { headers } from "next/headers";
import Image from "next/image";



const MyBookingPage = async() => {

    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

  const {token} = await auth.api.getToken({
    headers: await headers(),
  })
const user = session?.user

console.log(user);
const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`,
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);

  const bookings = await res.json()
  console.log(bookings);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className='text-2xl font-bold my-5'>My Booking</h1>
            <div className="mb-10 space-y-5">
                {
                    bookings.map(booking => <div key={booking._id} className="flex gap-5 border p-5 min-w-5xl">
                        <Image src={booking.imageUrl}
                        alt={booking.destinationName}
                        height={200}
                        width={200}/>
                        <div>
                            <h1 className="text-2xl font-bold">{booking.destinationName}</h1>
                            <p>{new Date(booking.departureDate).toLocaleDateString('en-US',{
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                            <p>Booking Id: {booking._id}</p>
                            <p className="text-3xl font-bold text-cyan-500">${booking.price}</p>
                            <BookingCancelAlert bookingId={booking._id}/>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default MyBookingPage;