import profilePlaceholder from "../../assets/profilePlaceholder.png";
import useAuthContext from "../../hooks/useAuthContext";
import Button from "../../components/Button";
import PropertyCard from "../../components/PropertyCard";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "react-modal";
import Input from "../../components/Input";
import { editProfile, getProfileData } from "../../hooks/useUsers";
import { toast } from "react-toastify";
import {
  deleteListing,
  getListings,
  getListingTypes,
  updateListing,
} from "../../hooks/useListings";
import { Eye, Loader2, Pen, Trash2, Upload, X } from "lucide-react";
import formatNumber from "../../utils/formatNumber";
import { Link, useNavigate } from "react-router-dom";
import LocationAutoComplete from "../../components/LocationAutoComplete";
import { MAX_NO_FILES } from "../../utils/constants";
import {
  cleanUpImageUrl,
  createImageUrl,
  resetFileInput,
  validateFile,
} from "../../utils/image";
import { getBookings } from "../../hooks/useBookings";

const Profile = () => {
  const { user, logoutUser, fetchUser } = useAuthContext();

  const navigate = useNavigate();

  // State related to user's listings and bookings
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [listingCount, setListingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  // Currently selected view
  const [selectedView, setSelectedView] = useState("listings");

  const [listingTypes, setListingTypes] = useState([]);

  // Edit profile related states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Currently selected listing (for edit or delete)
  const [selectedListing, setSelectedListing] = useState();

  // Edit Listing related states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [listingTypeId, setListingTypeId] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);

  const [resetListingEditValues, setResetListingEditValues] = useState(false);

  // Modal related states
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isListingEditModalOpen, setIsListingEditModalOpen] = useState(false);
  const [isDeleteListingModalOpen, setIsDeleteListingModalOpen] =
    useState(false);

  // Handle input click through another button
  const imageInputRef = useRef();

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetListingEditModalValues = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setBedrooms("");
    setBathrooms("");
    setListingTypeId("");
    setLocation("");
    setImages([]);
    setNewImages([]);
    setImagePreviews([]);
    setResetListingEditValues(true);
  };

  // Edit profile
  const onEditProfile = async () => {
    const { data, success, error } = await editProfile({ name, phone });

    if (success) {
      toast.success(data.message);
      fetchUser();
      setIsProfileEditModalOpen(false);
    } else {
      toast.error(error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length + newImages.length > MAX_NO_FILES) {
      toast.error(`Maximum number of images is ${MAX_NO_FILES}`);
      return;
    }

    const validFiles = files.filter((file) => validateFile(file));

    // Generate preview URLs for valid files
    const previewUrls = validFiles.map((file) => createImageUrl(file));

    // Adding new files and urls to same array
    setNewImages((prevImages) => [...prevImages, ...validFiles]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };

  // Add all fields to form data
  const createFormData = (formData) => {
    // Append fields to FormData
    formData.append("listingId", selectedListing.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("listingTypeId", listingTypeId);
    formData.append("location", location);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Append new images to FormData
    newImages.forEach((image) => {
      formData.append("newImages", image); // Add each image file
    });
  };

  const onEditListing = async () => {
    setIsSubmitting(true);

    const formData = new FormData();

    createFormData(formData);

    const response = await updateListing(formData);

    if (response.success) {
      toast.success(response.data.message);
      navigate(`/listing/${selectedListing.id}`);

      resetListingEditModalValues();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  const onDeleteListing = async () => {
    const response = await deleteListing(selectedListing.id);

    if (response.success) {
      toast.success(response.data.message);
      setListings((prev) =>
        prev.filter((item) => item.id !== selectedListing.id)
      );
    } else {
      toast.error(response.error);
    }

    setIsDeleteListingModalOpen(false);
  };

  // Set profile edit form field values
  useEffect(() => {
    if (isProfileEditModalOpen) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [isProfileEditModalOpen, user]);

  useEffect(() => {
    const setListingEditModalValues = () => {
      setTitle(selectedListing.title);
      setDescription(selectedListing.description);
      setPrice(selectedListing.price);
      setBedrooms(selectedListing.bedrooms);
      setBathrooms(selectedListing.bathrooms);
      setListingTypeId(selectedListing.listingTypeId);
      setLocation(selectedListing.location);
      setImages(selectedListing.images);
    };

    if (isListingEditModalOpen) {
      setListingEditModalValues();
    }
  }, [isListingEditModalOpen, selectedListing]);

  // Fetch user profile data
  useEffect(() => {
    const getUserProfileData = async () => {
      setIsLoading(true);

      const listingTypeResponse = await getListingTypes();

      if (listingTypeResponse.success) {
        setListingTypes(listingTypeResponse.data);
      }

      const listingResponse = await getListings({ userId: user.id });

      if (listingResponse.success) {
        setListings(listingResponse.data);
      }

      const bookingResponse = await getBookings({ userId: user.id });

      if (bookingResponse.success) {
        setBookings(bookingResponse.data);
      }

      const countResponse = await getProfileData(user.id);

      if (countResponse.success) {
        const data = countResponse.data;

        setListingCount(data.listingCount);
        setBookingCount(data.bookingCount);
        setTotalViews(data.totalViews);
      }

      setIsLoading(false);
    };

    getUserProfileData();
  }, [user.id]);

  return (
    <div className="fluid py-12 space-y-8 min-h-no-nav">
      <div className="grid md:grid-cols-3 gap-4 w-full">
        {/* PROFILE INFO */}
        <div>
          <div className="p-4 border rounded-xl space-y-4 text-center">
            <img
              src={profilePlaceholder}
              className="rounded-full size-40 mx-auto"
            />

            <div>
              <h2 className="text-xl font-medium">{user.name}</h2>
              <p className="text-muted text-sm">{user.phone}</p>
              <p className="text-muted text-sm">{user.email}</p>
            </div>

            <div className="flex items-center justify-evenly gap-2">
              <span>
                <h3 className="text-sm">Listings</h3>
                <h1 className="font-bold text-2xl">
                  {formatNumber(listingCount)}
                </h1>
              </span>
              <span>
                <h3 className="text-sm">Bookings</h3>
                <h1 className="font-bold text-2xl">
                  {formatNumber(bookingCount)}
                </h1>
              </span>
              <span>
                <h3 className="text-sm">Views</h3>
                <h1 className="font-bold text-2xl">
                  {formatNumber(totalViews)}
                </h1>
              </span>
            </div>

            <Button
              placeholder="Edit profile"
              classname="w-full"
              onClick={() => setIsProfileEditModalOpen(true)}
            />
            <button
              className="btn-danger !bg-white !text-danger w-full outline outline-1 outline-danger hover:!bg-danger hover:!text-white"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="md:col-span-2 px-4 space-y-4">
          {/* SELECT TAB */}
          <div className="w-full flex items-center border-b">
            <button
              className={twMerge(
                "w-full p-2 font-medium transition-colors duration-150",
                selectedView === "listings"
                  ? "text-primary border-primary border-b"
                  : ""
              )}
              onClick={() => setSelectedView("listings")}
            >
              Listings
            </button>
            <button
              className={twMerge(
                "w-full p-2 font-medium transition-colors duration-150",
                selectedView === "bookings"
                  ? "text-primary border-primary border-b"
                  : ""
              )}
              onClick={() => setSelectedView("bookings")}
            >
              Bookings
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-2 h-[200px] flex items-center justify-center">
                <Loader2 className="text-primary animate-spin duration-1000" />
              </div>
            ) : selectedView === "listings" ? (
              listings.length > 0 ? (
                listings.map((listing) => (
                  <div
                    key={listing.id + listing.title}
                    className="relative group"
                  >
                    <PropertyCard listing={listing} />
                    <div className="absolute flex items-center justify-center gap-2 z-0 inset-0 group-hover:bg-black/50 transition-all rounded-xl group">
                      <Link
                        className="rounded-full p-2 transition-colors hidden group-hover:block bg-black/80 hover:opacity-80"
                        to={`/listing/${listing.id}`}
                      >
                        <Eye className="size-6 text-white" />
                      </Link>
                      <button
                        className="rounded-full p-2 transition-colors hidden group-hover:block bg-black/80 hover:opacity-80"
                        onClick={() => {
                          setIsListingEditModalOpen(true);
                          setSelectedListing(listing);
                        }}
                      >
                        <Pen className="size-6 text-white" />
                      </button>
                      <button
                        className="rounded-full p-2 bg-danger hover:bg-danger/80 text-white transition-colors hidden group-hover:block"
                        onClick={() => {
                          setIsDeleteListingModalOpen(true);
                          setSelectedListing(listing);
                        }}
                      >
                        <Trash2 className="size-6" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 h-[200px] flex items-center justify-center">
                  <h1 className="text-xl font-semibold">
                    No listings posted yet.
                  </h1>
                </div>
              )
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <PropertyCard key={booking.id} listing={booking.listing} />
              ))
            ) : (
              <div className="col-span-2 h-[200px] flex items-center justify-center">
                <h1 className="text-xl font-semibold text-center">
                  No bookings yet.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LISTING EDIT MODAL */}
      <Modal isOpen={isListingEditModalOpen} className="modal-bg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditListing();
          }}
          className="modal-card !max-w-[600px] max-h-[95vh] overflow-y-auto"
        >
          <h2 className="modal-header">Edit Listing</h2>

          <div className="grid md:grid-cols-4 gap-2">
            <div className="md:col-span-3">
              <Input
                label="Title"
                placeholder="Enter listing title"
                value={title}
                onChange={(e) => setTitle(e)}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-sm font-medium">
                Property Type
              </label>

              <select
                defaultValue={null}
                value={listingTypeId}
                onChange={(e) => setListingTypeId(e.target.value)}
                className="w-full border rounded-xl bg-white py-2.5 shadow-sm px-3 text-sm capitalize"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              label="Price (Rs.)"
              placeholder="Enter property price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e)}
            />

            <LocationAutoComplete
              location={location}
              setLocation={setLocation}
              reset={resetListingEditValues}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

          <div className="space-y-1">
            <label className="text-sm font-medium">Images</label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {images.map((image) => (
                <div key={image} className="relative">
                  <img
                    className="aspect-square border rounded-xl object-cover peer relative"
                    src={image}
                  />

                  <div className="absolute transform -top-1 -right-1">
                    <button
                      type="button"
                      className="bg-black/80 rounded-full p-1 size-6 flex items-center justify-center"
                      onClick={() => {
                        setImages((prevImages) =>
                          prevImages.filter((item) => item !== image)
                        );
                      }}
                    >
                      <X className="text-white" />
                    </button>
                  </div>
                </div>
              ))}

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
                        setNewImages((prevItems) => {
                          const updatedItems = [...prevItems];
                          updatedItems.splice(index, 1);
                          return updatedItems;
                        });

                        resetFileInput("fileInput");
                        cleanUpImageUrl(preview);
                      }}
                    >
                      <X className="text-white" />
                    </button>
                  </div>
                </div>
              ))}

              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
                ref={imageInputRef}
                disabled={images.length + newImages.length >= MAX_NO_FILES}
              />
              <button
                className="aspect-square w-full border rounded-xl flex items-center justify-center bg-black/20 disabled:hidden"
                type="button"
                onClick={() => imageInputRef.current.click()}
                disabled={images.length + newImages.length >= MAX_NO_FILES}
              >
                <span className="bg-black/80 rounded-full p-2">
                  <Upload className="text-white size-5" />
                </span>
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={() => {
                setIsListingEditModalOpen(false);
                resetListingEditModalValues();
              }}
              type="button"
              className="btn-neutral"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Editing" : "Edit"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* LISTING DELETE MODAL */}
      <Modal isOpen={isDeleteListingModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">
            Are you sure you want to delete this listing?
          </h2>

          <p className="modal-desc">
            This listing will be permanently deleted.
          </p>

          <div className="modal-footer">
            <button
              onClick={() => {
                setIsDeleteListingModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <button onClick={onDeleteListing} className="btn-danger">
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* PROFILE EDIT MODAL */}
      <Modal isOpen={isProfileEditModalOpen} className="modal-bg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditProfile();
          }}
          className="modal-card max-w-[400px]"
        >
          <h1 className="modal-header">Edit Profile</h1>

          <div className="space-y-2">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e)}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              value={user.email}
              disabled
            />
            <Input
              label="Phone number"
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e)}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn-neutral"
              type="button"
              onClick={() => setIsProfileEditModalOpen(false)}
            >
              Cancel
            </button>
            <Button placeholder="Edit" type="submit" />
          </div>
        </form>
      </Modal>

      {/* LOGOUT MODAL */}
      <Modal isOpen={isLogoutModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">Are you sure you want to logout?</h2>

          <p className="modal-desc">
            You will have to login again using your email and password.
          </p>

          <div className="modal-footer">
            <button
              onClick={() => {
                setIsLogoutModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <button onClick={() => logoutUser()} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
