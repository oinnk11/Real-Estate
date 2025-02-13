import { Link, useParams } from "react-router-dom";
import Icon from "../../components/Icon";
import {
  Bed,
  Building,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  MapPin,
  Toilet,
  X,
} from "lucide-react";
import Button from "../../components/Button";
import formatNumber from "../../utils/formatNumber";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "react-modal";
import { getListingById } from "../../hooks/useListings";
import placeholder from "../../assets/profilePlaceholder.png";
import useAuthContext from "../../hooks/useAuthContext";
import { initiatePayment } from "../../hooks/usePayment";
import { toast } from "react-toastify";

const ListingDetails = () => {
  const { id } = useParams();

  const { user } = useAuthContext();

  const [listing, setListing] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const bathrooms = listing?.bathrooms;
  const bedrooms = listing?.bedrooms;

  const previews = listing?.images?.slice(0, 5);
  const noOfImages = listing?.images?.length;

  const images = listing?.images;

  // CURRENTLY SELECTED PREVIEW IMAGE
  const [selectedImage, setSelectedImage] = useState(0);

  // IMAGE MODAL RELATED STATES
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState(
    noOfImages > 5 ? 5 : 0
  );

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // FUNCTION TO SET PREVIEW IMAGE
  const setPreview = (index) => {
    setSelectedImage(index);
  };

  const setPreviousImage = () => {
    if (selectedImageModal > 0) {
      setSelectedImageModal(selectedImageModal - 1);
    }
  };

  const setNextImage = () => {
    if (selectedImageModal < noOfImages - 1) {
      setSelectedImageModal(selectedImageModal + 1);
    }
  };

  useEffect(() => {
    const fetchListingById = async () => {
      const response = await getListingById(id);

      if (response.success) {
        setListing(response.data);
      }

      setIsLoading(false);
    };

    fetchListingById();
  }, [id, listing?.id]);

  const redirectToPayment = (url) => {
    window.location.href = url;
  };

  const onBook = async () => {
    const response = await initiatePayment({
      amount: listing.price,
      listingId: listing.id,
    });
    console.log("🚀 ~ response:", response);

    if (response.success) {
      redirectToPayment(response.data.paymentUrl);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[calc(100vh-40vh)] flex flex-col gap-5 items-center justify-center">
          <Loader2 className="animate-spin ease-in-out text-primary" />
        </div>
      ) : !listing ? (
        <div className="h-[calc(100vh-40vh)] flex flex-col items-center justify-center gap-5">
          <h1 className="text-2xl font-semibold">Opps! Nothing to see here.</h1>
          <Link to="/">
            <Button>Go Back to Home</Button>
          </Link>
        </div>
      ) : (
        <section className="fluid">
          <div className="py-10 space-y-12">
            {/* IMAGES */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <button
                className="cursor-zoom-in outline-none md:col-span-3"
                onClick={() => {
                  setIsImageModalOpen(true);
                  setSelectedImageModal(selectedImage);
                }}
              >
                <img
                  src={images[selectedImage]}
                  className="w-[800px] h-[500px] object-contain"
                />
              </button>

              <span className="md:col-span-2">
                <div className="grid grid-cols-3 gap-4">
                  {previews.map((image, index) => (
                    <button
                      key={image + index}
                      onClick={() => setPreview(index)}
                      className={twMerge(
                        "h-fit",
                        selectedImage === index &&
                          "outline outline-2 outline-offset-2"
                      )}
                    >
                      <img
                        src={image}
                        className="aspect-square w-[250px] object-cover"
                      />
                    </button>
                  ))}

                  {noOfImages > 5 && (
                    <button
                      className="relative flex h-fit"
                      onClick={() => {
                        setIsImageModalOpen(true);
                        setSelectedImageModal(5);
                      }}
                    >
                      <img
                        src={listing.images[5]}
                        className="aspect-square w-[250px] object-cover filter brightness-50"
                      />
                      <span className="font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black/90 rounded-full aspect-square flex items-center justify-center size-8">
                        +{noOfImages - 5}
                      </span>
                    </button>
                  )}
                </div>
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="space-y-4 flex-1">
                <div className="space-y-3 flex-1 border-b pb-5">
                  <p
                    className={twMerge(
                      "text-sm font-semibold",
                      listing.status === "Booked"
                        ? "text-danger"
                        : "text-green-500"
                    )}
                  >
                    {listing.status}
                  </p>
                  <div className="w-full flex items-start justify-between gap-5">
                    <h1 className="font-medium text-2xl 2xl:text-3xl">
                      {listing.title}
                    </h1>

                    <span className="inline-flex items-center gap-1">
                      <Eye className="size-5" />
                      <p className="text-muted">{listing.views}</p>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1">
                    <Icon
                      icon={MapPin}
                      classname="size-8"
                      iconClassname="size-6"
                    />
                    <p className="text-muted">{listing.location}</p>
                  </span>

                  <h3 className="text-3xl font-semibold">
                    Rs. {formatNumber(listing.price)}
                  </h3>

                  <span className="inline-flex max-md:flex-col gap-4 md:items-center">
                    <span className="inline-flex items-center gap-1">
                      <Icon
                        icon={Building}
                        classname="size-8"
                        iconClassname="size-6"
                      />
                      <p className="text-muted capitalize">
                        {listing.type.name}
                      </p>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon
                        icon={Bed}
                        classname="size-8"
                        iconClassname="size-6"
                      />
                      <p className="text-muted">
                        {bedrooms && bedrooms > 0 ? bedrooms : 0} Bedroom
                      </p>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon
                        icon={Toilet}
                        classname="size-8"
                        iconClassname="size-6"
                      />
                      <p className="text-muted">
                        {bathrooms && bathrooms > 0 ? bathrooms : 0} Bathroom
                      </p>
                    </span>
                  </span>
                </div>

                <div className="pb-5 border-b space-y-2">
                  <h1 className="font-semibold text-lg">Property Details</h1>

                  <p className="text-muted">{listing.description}</p>
                </div>

                {/* SELLER DETAILS */}

                <div className="!mt-6 space-y-4 pb-5 border-b">
                  <h1 className="font-semibold text-lg">Seller Details</h1>

                  <div className="inline-flex items-center gap-3 w-full">
                    <img
                      src={placeholder}
                      className="aspect-square h-16 rounded-full"
                    />

                    <span>
                      <p className="font-medium text-lg">
                        {listing.seller.name}
                      </p>
                      <p className="text-muted text-sm">
                        {listing.seller.phone}
                      </p>
                    </span>
                  </div>
                </div>

                {listing.status === "Available" &&
                  listing.seller.id !== user.id && (
                    <Button
                      placeholder="Book Now"
                      disabled={
                        listing.status !== "Available" &&
                        listing.seller.id === user.id
                      }
                      classname="!mt-5 max-lg:w-full ml-auto"
                      onClick={() => setIsPaymentModalOpen(true)}
                    />
                  )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IMAGE MODAL */}
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={() => setIsImageModalOpen(false)}
        className="modal-bg relative"
      >
        <button
          className="absolute right-5 top-5 z-30 bg-black/90 inline-flex items-center justify-center p-1 rounded-full"
          onClick={() => setIsImageModalOpen(false)}
        >
          <X className="text-white" />
        </button>

        <div className="relative flex items-center justify-center h-screen w-full">
          <img src={images && images[selectedImageModal]} />
          <button
            className="absolute left-5 top-1/2 z-20 bg-black/90 inline-flex items-center justify-center p-1 rounded-full disabled:hidden"
            disabled={!selectedImageModal > 0}
            onClick={() => setPreviousImage()}
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            className="absolute right-5 top-1/2 z-20 bg-black/90 inline-flex items-center justify-center p-1 rounded-full disabled:hidden"
            disabled={!(selectedImageModal < noOfImages - 1)}
            onClick={() => setNextImage()}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">Booking Confirmation</h2>

          <p className="modal-desc">
            Are you sure you want to continue? You will be redirected to Khalti.
          </p>

          <h3 className="font-semibold">Booking Details</h3>

          <div className="border rounded-xl p-4 flex gap-2 !mb-4">
            <img
              src={listing.thumbnail}
              className="object-cover aspect-square h-20 rounded-xl"
            />

            <span>
              <p className="font-semibold text-lg">{listing.title}</p>
              <p className="modal-desc">{listing.location}</p>
              <p className="font-medium">Rs. {formatNumber(listing.price)}</p>
            </span>
          </div>

          <h3 className="font-semibold">Payment Details</h3>

          <div className="inline-flex items-center justify-between w-full !mb-4 text-sm">
            <p>10% of {formatNumber(listing.price)}</p>

            <p className="font-semibold">
              Rs. {formatNumber(listing.price * 0.1)}
            </p>
          </div>

          <div className="modal-footer">
            <button
              className="btn-neutral"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </button>
            <Button onClick={onBook}>Continue</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListingDetails;
