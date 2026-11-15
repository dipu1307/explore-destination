import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuMapPin } from 'react-icons/lu';
import { MdArrowOutward, MdCalendarMonth } from 'react-icons/md';

const DestinationCard = ({destination}) => {
    const {_id, imageUrl, price, duration, destinationName, country}=destination;
    return (
      <div className="border p-2 border-none">
        <div className="relative w-full h-60 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={destinationName}
            width={400}
            height={400}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <LuMapPin /> <span>{country}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div>
              <h3 className="text-2xl font-bold">{country}</h3>
            </div>
            <div className="flex items-center gap-2">
              <MdCalendarMonth />
              <span>{duration}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">${price}</h3>
          </div>
        </div>
        <div>
          <Link href={`/destination/${_id}`}>
            <Button>
              Book Now <MdArrowOutward />
            </Button>
          </Link>
        </div>
      </div>
    );
};

export default DestinationCard;