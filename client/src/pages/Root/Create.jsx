import Input from "../../components/Input";
import Button from "../../components/Button";
import { Loader2, Upload, X } from "lucide-react";
import {
  createListing,
  getListingTypes,
  getLocationAutoComplete,
} from "../../hooks/useListings";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Create = () => {
  // Listing Types related states
  const [listingTypes, setListingTypes] = useState([]);

  // Form related states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [typeId, setTypeId] = useState();
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [images, setImages] = useState([]);

  // States related to debounce (delay) search locations
  const [locationSearch, setLocationSearch] = useState("");
  const [debouncedLocationSearch, setDebouncedLocationSearch] = useState("");

  // Image previews related state
  const [imagePreviews, setImagePreviews] = useState([]);

  const [locations, setLocations] = useState([]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setTypeId("");
    setBathrooms("");
    setBedrooms("");
    setLocation("");
    setImages([]);
    setImagePreviews([]);
    setLocationSearch("");
    setDebouncedLocationSearch("");
    setIsLocationSelected(false);
    setIsLocationLoading(false);
    setLocations([]);
  };

  useEffect(() => {
    if (isLocationSelected) return;

    setIsLocationLoading(true);

    const handler = setTimeout(() => {
      setDebouncedLocationSearch(locationSearch);
    }, 3000); // 3 seconds debounce

    return () => {
      clearTimeout(handler);
    };
  }, [locationSearch]);

  useEffect(() => {
    if (!debouncedLocationSearch) {
      setLocations([]);
      setIsLocationLoading(false);
      return;
    }

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

  const fetchListingTypes = async () => {
    const response = await getListingTypes();

    if (response.success) {
      setListingTypes(response.data);
    }
  };

  useEffect(() => {
    fetchListingTypes();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 10 * 1024 * 1024;
    const maxFiles = 10;

    if (files.length > maxFiles || files.length + images.length > 10) {
      toast.error("Maximum number of images is 10.");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.warn(`File type not allowed: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        toast.warn(`File too large: ${file.name}`);
        return false;
      }
      return true;
    });

    // Generate preview URLs for valid files
    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...validFiles]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };

  const onCreate = async () => {
    setIsSubmitting(true);

    const formData = new FormData();

    // Append fields to FormData
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("typeId", typeId);
    formData.append("location", location);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);

    // Append images to FormData
    images.forEach((image) => {
      formData.append("images", image); // Add each image file
    });

    const response = await createListing(formData);

    if (response.success) {
      toast.success(response.data.message);
      resetForm();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCreate();
      }}
      className="fluid py-12 space-y-5"
    >
      <h1 className="text-xl font-bold">Post a Listing</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        {/* LEFT COL */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border rounded-xl p-6">
            <h2 className="font-semibold text-lg">Property Details</h2>
            <p className="text-muted text-sm">
              Enter the property title and description to make people better
              understand your property.
            </p>

            <div className="mt-3 space-y-4">
              <Input
                label="Title"
                placeholder="Enter property title"
                value={title}
                onChange={(e) => setTitle(e)}
              />
              <div className="md:grid grid-cols-2 gap-2 max-md:space-y-2">
                <Input
                  label="Price (Rs.)"
                  placeholder="Enter property price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e)}
                />
                <div className="relative">
                  <Input
                    label="Location"
                    placeholder="Enter property location"
                    value={locationSearch}
                    onChange={(e) => {
                      setLocationSearch(e);
                      setIsLocationSelected(false);
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
                <Input
                  label="Bedrooms"
                  placeholder="Enter no. of bedrooms"
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e)}
                />
                <Input
                  label="Bathrooms"
                  placeholder="Enter no. of bathrooms"
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e)}
                />
              </div>

              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter property description"
                  className="border rounded-xl py-2 px-3 text-sm outline-none"
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COL */}
        <div className="space-y-4">
          <div className="border rounded-xl p-6">
            <h2 className="font-semibold text-lg">Property Type</h2>
            <p className="text-muted text-sm">
              Select the type of property you are posting.
            </p>

            <select
              defaultValue={null}
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              className="w-full border rounded-lg bg-white p-2 text-sm mt-4 capitalize"
            >
              <option value={null}>Select</option>
              {listingTypes.map((type) => (
                <option
                  key={type.id + type.name}
                  value={type.id}
                  className="capitalize"
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="font-semibold text-lg">Property Images</h2>
            <p className="text-muted text-sm">
              Select images that best showcase your property to others.
            </p>

            <div className="mt-4 space-y-2">
              {/* <div className="aspect-square w-full border rounded-xl"></div> */}
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={preview} className="relative">
                    <img
                      className="aspect-square border rounded-xl object-cover peer relative"
                      src={preview}
                    />

                    <div className="absolute transform -top-1 -right-1">
                      <button
                        type="button"
                        className="bg-black/80 rounded-full p-1 size-6 flex items-center justify-center"
                        onClick={() => {
                          setImagePreviews((prevItems) =>
                            prevItems.filter((item) => item !== preview)
                          );
                          setImages((prevItems) => {
                            const updatedItems = [...prevItems];
                            updatedItems.splice(index, 1);
                            return updatedItems;
                          });
                        }}
                      >
                        <X className="text-white" />
                      </button>
                    </div>
                  </div>
                ))}
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleImageUpload(e)}
                  className="hidden"
                  ref={imageInputRef}
                  disabled={images.length >= 10}
                />
                <button
                  className="aspect-square w-full border rounded-xl flex items-center justify-center bg-black/20 disabled:hidden"
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  disabled={images.length >= 10}
                >
                  <span className="bg-black/80 rounded-full p-2">
                    <Upload className="text-white size-5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        placeholder={isSubmitting ? "Posting" : "Post"}
        classname="max-md:w-full"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default Create;
