import profilePlaceholder from "../../assets/profilePlaceholder.png";
import useAuthContext from "../../hooks/useAuthContext";
import Button from "../../components/Button";
import PropertyCard from "../../components/PropertyCard";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "react-modal";
import Input from "../../components/Input";
import { editProfile } from "../../hooks/useUsers";
import { toast } from "react-toastify";
import { getListings } from "../../hooks/useListings";
import { Loader2, Pen, Trash2 } from "lucide-react";
import formatNumber from "../../utils/formatNumber";

const Profile = () => {
  const { user, logoutUser, fetchUser } = useAuthContext();

  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedView, setSelectedView] = useState("listings");

  // Modal related states
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isListingEditModalOpen, setIsListingEditModalOpen] = useState(false);
  const [isDeleteListingModalOpen, setIsDeleteListingModalOpen] =
    useState(false);

  const [selectedListing, setSelectedListing] = useState();

  // Edit profile related states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isProfileEditModalOpen) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [isProfileEditModalOpen, user]);

  const fetchUserListings = async () => {
    const response = await getListings({ userId: user.id });

    if (response.success) {
      setListings(response.data);
    }
  };

  const fetchUserBookings = async () => {
    setBookings([]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserListings();
    fetchUserBookings();
  }, []);

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

  return (
    <div className="fluid py-12 space-y-8">
      <div className="grid md:grid-cols-3 gap-4 w-full">
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
                  {formatNumber(user.listingCount)}
                </h1>
              </span>
              <span>
                <h3 className="text-sm">Bookings</h3>
                <h1 className="font-bold text-2xl">
                  {formatNumber(user.bookingCount)}
                </h1>
              </span>
              <span>
                <h3 className="text-sm">Views</h3>
                <h1 className="font-bold text-2xl">
                  {formatNumber(user.totalViews)}
                </h1>
              </span>
            </div>

            <Button
              placeholder="Edit profile"
              classname="w-full"
              onClick={() => setIsProfileEditModalOpen(true)}
            />
            <button
              className="border border-danger w-full p-2 rounded-lg text-danger font-medium hover:bg-danger hover:text-white transition-colors duration-150"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="md:col-span-2 px-4 space-y-4">
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
                listings.map((item) => (
                  <div key={item.id + item.title} className="relative">
                    <PropertyCard listing={item} />
                    <div className="absolute bottom-3 right-4 flex items-center gap-1 z-0">
                      <button
                        className="border rounded-full p-1 hover:bg-black/20 transition-colors"
                        onClick={() => {
                          setIsListingEditModalOpen(true);
                          setSelectedListing(item.id);
                        }}
                      >
                        <Pen className="size-5" />
                      </button>
                      <button
                        className="rounded-full p-1 bg-danger hover:bg-danger/80 text-white transition-colors"
                        onClick={() => {
                          setIsDeleteListingModalOpen(true);
                          setSelectedListing(item.id);
                        }}
                      >
                        <Trash2 className="size-5" />
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
              bookings.map((item) => (
                <PropertyCard key={item.id} listing={item} />
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
      <Modal
        isOpen={isListingEditModalOpen}
        className="h-screen bg-black/85 flex items-center justify-center"
      >
        <div className="bg-white w-full max-w-[600px] p-4 space-y-2 rounded-xl">
          <h2 className="font-semibold">Edit Listing</h2>

          <div className="inline-flex gap-1 items-center justify-end w-full">
            <button
              onClick={() => {
                setIsListingEditModalOpen(false);
              }}
              className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border py-2 px-4 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {}}
              className="inline-flex text-sm gap-1 items-center bg-primary hover:bg-primary/85 transition-colors duration-150 text-white py-2 px-4 rounded-lg font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>

      {/* LISTING DELETE MODAL */}
      <Modal
        isOpen={isDeleteListingModalOpen}
        className="h-screen bg-black/85 flex items-center justify-center"
      >
        <div className="bg-white w-full max-w-[450px] p-4 space-y-2 rounded-xl">
          <h2 className="font-semibold">
            Are you sure you want to delete this listing?
          </h2>

          <p className="text-muted text-sm"></p>
          <div className="inline-flex gap-1 items-center justify-end w-full">
            <button
              onClick={() => {
                setIsDeleteListingModalOpen(false);
              }}
              className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border py-2 px-4 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {}}
              className="inline-flex text-sm gap-1 items-center bg-danger hover:bg-danger/85 transition-colors duration-150 text-white py-2 px-4 rounded-lg font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* PROFILE EDIT MODAL */}
      <Modal
        isOpen={isProfileEditModalOpen}
        className="h-screen bg-black/85 flex items-center justify-center"
      >
        <div className="bg-white p-4 rounded-xl w-full max-w-[400px] space-y-4">
          <h1 className="font-semibold text-xl">Edit Profile</h1>
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
          <div className="w-full flex gap-2 items-center">
            <button
              className="w-full"
              onClick={() => setIsProfileEditModalOpen(false)}
            >
              Cancel
            </button>
            <Button
              classname="w-full"
              placeholder="Edit"
              onClick={() => onEditProfile()}
            />
          </div>
        </div>
      </Modal>

      {/* LOGOUT MODAL */}
      <Modal
        isOpen={isLogoutModalOpen}
        className="h-screen bg-black/85 flex items-center justify-center"
      >
        <div className="bg-white w-full max-w-[450px] p-4 space-y-2 rounded-xl">
          <h2 className="font-semibold">Are you sure you want to logout?</h2>

          <p className="text-muted text-sm">
            You will have to login again using your email and password.
          </p>

          <div className="inline-flex gap-1 items-center justify-end w-full">
            <button
              onClick={() => {
                setIsLogoutModalOpen(false);
              }}
              className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border py-2 px-4 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => logoutUser()}
              className="inline-flex text-sm gap-1 items-center bg-danger hover:bg-danger/85 transition-colors duration-150 text-white py-2 px-4 rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
