import { Bed, MapPin, Toilet } from "lucide-react";
import formatNumber from "../utils/formatNumber";

const PropertyCard = ({ listing }) => {
  const { id, title, thumbnail, location, price, bedrooms, bathrooms, status } =
    listing;
  return (
    <a href={`/listing/${id}`} className="relative">
      {status === "Booked" ? (
        <span className="inline-flex items-center gap-1 absolute top-5 right-5 bg-red-100 py-1 px-2 rounded-lg border border-red-500 text-red-500 font-semibold text-xs">
          <div className="size-2 rounded-full bg-red-500"></div>
          {status}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 absolute top-5 right-5 bg-green-100 py-1 px-2 rounded-lg border border-green-500 text-green-500 font-semibold text-xs">
          <div className="size-2 rounded-full bg-green-500"></div>
          {status}
        </span>
      )}
      <div className="rounded-2xl border shadow-md p-3 space-y-3 bg-white">
        <img
          src={thumbnail}
          className="w-full h-[200px] rounded-xl object-cover"
        />

        <div className="space-y-1">
          <h3 className="font-medium text-ellipsis line-clamp-1">{title}</h3>
          <div className="flex items-center">
            <span className="size-6 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1">
              <MapPin className="size-4 text-primary" />
            </span>
            <p className="text-muted text-ellipsis line-clamp-1 text-sm">
              {location}
            </p>
          </div>
        </div>

        <h2 className="font-bold text-xl">Rs. {formatNumber(price)}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="size-6 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1">
              <Bed className="size-4 text-primary" />
            </span>

            <p className="text-muted text-sm text-ellipsis line-clamp-1">
              {bedrooms && bedrooms > 0 ? bedrooms : 0} Bedroom
            </p>
          </div>

          <div className="flex items-center">
            <span className="size-6 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1">
              <Toilet className="size-4 text-primary" />
            </span>
            <p className="text-muted text-sm text-ellipsis line-clamp-1">
              {bathrooms && bathrooms > 0 ? bathrooms : 0} Bathroom
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PropertyCard;
