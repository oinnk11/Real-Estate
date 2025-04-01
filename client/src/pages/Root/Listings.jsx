import PropertyCard from "../../components/PropertyCard";
import Input from "../../components/Input";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getListings, getListingTypes } from "../../hooks/useListings";
import { useSearchParams } from "react-router-dom";

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Search params

  // Initial filters
  const initialFilters = {
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    propertyType: searchParams.get("propertyType") || "",
    location: searchParams.get("location") || "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const [listings, setListings] = useState([]);
  const [listingTypes, setListingTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (value, name) => {
    // Change filter state
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Change search params
    const newSearchParams = new URLSearchParams(filters);
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  };

  const fetchListings = async (newFilters) => {
    const response = await getListings(newFilters || filters);

    if (response.success) {
      setListings(response.data);
    }
  };

  const fetchListingTypes = async () => {
    setIsLoading(true);

    const response = await getListingTypes();

    if (response.success) {
      setListingTypes(response.data);
    }

    setIsLoading(false);
  };

  const applyFilters = async () => {
    new URLSearchParams(filters).toString();

    fetchListings();
  };

  const resetFilters = () => {
    const newFilters = {
      type: "",
      minPrice: "",
      maxPrice: "",
      location: "",
    };

    setFilters(newFilters);
    fetchListings(newFilters);
  };

  useEffect(() => {
    fetchListingTypes();
    fetchListings();
  }, []);

  return (
    <section className="fluid py-12">
      <h1 className="font-bold text-2xl">Property Listings</h1>

      <div className="w-full flex flex-col lg:flex-row gap-6 py-5">
        {/* FILTERS */}
        <div className="w-full lg:w-[300px] 2xl:w-[400px] pb-5 max-md:border-b lg:pr-5 lg:border-r">
          <span className="inline-flex items-center justify-between w-full mb-2">
            <h3 className="font-medium text-lg">Filters</h3>
            <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Plus
                className={twMerge(
                  "size-5 transform transition-transform",
                  isFilterOpen ? " rotate-45" : ""
                )}
              />
            </button>
          </span>
          <div
            className={twMerge(
              "space-y-3 transform transition-transform",
              isFilterOpen ? "" : "h-0 overflow-hidden"
            )}
          >
            {/* TYPE FILTER */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Type</p>
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <select
                  name="type"
                  value={filters.type}
                  onChange={(e) => handleFilterChange(e.target.value, "type")}
                  className="outline-none w-full py-2 px-3 text-sm capitalize"
                >
                  <option value="">Select</option>
                  {listingTypes.map((item) => {
                    return (
                      <option key={item.id + item.name} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* PRICE FILTER */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Price Range</p>
              <div className="inline-flex items-center gap-1 w-full">
                <span className="flex-1">
                  <Input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={(value) => handleFilterChange(value, "minPrice")}
                    placeholder="Min Price (Rs.)"
                  />
                </span>
                <p>-</p>
                <span className="flex-1">
                  <Input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={(value) => handleFilterChange(value, "maxPrice")}
                    placeholder="Max Price (Rs.)"
                  />
                </span>
              </div>
            </div>

            {/* LOCATION FILTER */}
            <Input
              name="location"
              value={filters.location}
              onChange={(value) => handleFilterChange(value, "location")}
              placeholder="Location"
            />

            <span className="inline-flex flex-col md:flex-row items-center gap-2 w-full">
              <button
                placeholder="Clear"
                className="btn-neutral flex-1 w-full"
                onClick={resetFilters}
              >
                Clear
              </button>
              <button
                className="btn-primary flex-1 w-full"
                onClick={applyFilters}
              >
                Filter
              </button>
            </span>
          </div>
        </div>
        {/* RESULTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-6 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center col-span-3">
              <Loader2 className="text-primary animate-spin duration-1000" />
            </div>
          ) : listings.length > 0 ? (
            listings.map((item) => (
              <PropertyCard listing={item} key={item.id + item.title} />
            ))
          ) : (
            <div className="flex items-center justify-center col-span-3">
              <h1 className="font-semibold">
                Oops! There are no listings currently.
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Listings;
