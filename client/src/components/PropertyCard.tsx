import { Bed, MapPin, Toilet } from "lucide-react";
import React from "react";

const PropertyCard = ({ img, price, title, location, bathrooms, bedrooms }) => {
  return (
    <div className="rounded-2xl border shadow-md p-3 space-y-3 bg-white">
      <img src={img} className="w-full h-[200px] rounded-xl object-cover" />

      <div className="space-y-1">
        <div className="flex items-center">
          <span className="size-7 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1">
            <MapPin className="size-5 text-primary" />
          </span>
          <p className="text-muted">{location}</p>
        </div>
        <h2 className="font-bold text-xl">Rs. {price}</h2>
      </div>

      <h3 className="font-medium text-lg text-ellipsis line-clamp-1">
        {title}
      </h3>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="size-7 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1">
            <Bed className="size-5 text-primary" />
          </span>

          <p className="text-muted">
            {bedrooms && bedrooms > 0 ? bedrooms : 0} Bedroom
          </p>
        </div>

        <div className="flex items-center">
          <span className="size-7 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1">
            <Toilet className="size-5 text-primary" />
          </span>
          <p className="text-muted">
            {bathrooms && bathrooms > 0 ? bathrooms : 0} Bathroom
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
