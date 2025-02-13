import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "./Input";
import { getLocationAutoComplete } from "../hooks/useListings";

const LocationAutoComplete = ({ location, setLocation, reset }) => {
  const [locations, setLocations] = useState([]);

  const [locationSearch, setLocationSearch] = useState("");

  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [debouncedLocationSearch, setDebouncedLocationSearch] = useState("");

  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const [isInitial, setIsInitial] = useState(false);

  // Reset states when resetTrigger changes
  useEffect(() => {
    if (location) {
      setLocationSearch(location);
      setIsInitial(true);
      return;
    }

    if (reset) {
      setLocations([]);
      setLocationSearch("");
      setIsLocationSelected(false);
      setDebouncedLocationSearch("");
      setIsLocationLoading(false);
    }
  }, [reset, location]);

  useEffect(() => {
    if (isLocationSelected || isInitial) return;

    setIsLocationLoading(true);

    const handler = setTimeout(() => {
      setDebouncedLocationSearch(locationSearch);
    }, 3000); // 3 seconds delay

    return () => {
      clearTimeout(handler);
    };
  }, [locationSearch, isLocationSelected]);

  useEffect(() => {
    if (!debouncedLocationSearch) {
      setLocations([]);
      setIsLocationLoading(false);
      return;
    }

    // Fetch location auto complete suggestions
    const fetchLocationAutocomplete = async () => {
      setIsLocationLoading(true);
      const response = await getLocationAutoComplete(debouncedLocationSearch);

      if (response.success) {
        setLocations(response.data);
      } else {
        setLocations([]);
      }

      setIsLocationLoading(false);
    };

    fetchLocationAutocomplete();
  }, [debouncedLocationSearch]);

  return (
    <div className="relative">
      <Input
        label="Location"
        placeholder="Enter property location"
        value={locationSearch}
        onChange={(e) => {
          setLocationSearch(e);
          setIsLocationSelected(false);
          setIsInitial(false);
        }}
        classname="rounded-none"
      />
      {(isLocationLoading || locations.length > 0) && (
        <div className="w-full absolute bg-white border rounded-b-xl p-2 max-h-[180px] overflow-y-auto">
          {isLocationLoading ? (
            <Loader2 className="animate-spin duration-1000 text-primary mx-auto" />
          ) : (
            locations.map((suggestion, index) => (
              <button
                key={index + suggestion.description}
                className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer rounded-xl"
                type="button"
                onClick={() => {
                  setLocation(suggestion.description);
                  setLocationSearch(suggestion.description);
                  setIsLocationLoading(false);
                  setIsLocationSelected(true);
                  setLocations([]);
                }}
              >
                {suggestion.description}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LocationAutoComplete;
