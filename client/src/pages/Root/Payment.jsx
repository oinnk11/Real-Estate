import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getListingById } from "../../hooks/useListings";
import success from "../../assets/success.png";
import error from "../../assets/error.png";
import Button from "../../components/Button";
import formatNumber from "../../utils/formatNumber";

const Payment = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const listingId = queryParams.get("listingId");

  const status = queryParams.get("status");

  const [listing, setListing] = useState({});

  useEffect(() => {
    const fetchListing = async () => {
      if (!listingId) return;

      const response = await getListingById(listingId);

      if (response.success) {
        setListing(response.data);
      }
    };

    fetchListing();
  }, [listingId]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-6">
      {status === "Completed" ? (
        <div className="space-y-4 text-center">
          <img src={success} className="h-28 mx-auto" />
          <h1 className="text-green-500 font-semibold text-center text-xl">
            Success
          </h1>

          <p className="text-primary">
            Your payment has been processed successfully.
          </p>

          <Link
            to={`/listing/${listingId}`}
            className="modal-card flex flex-col md:flex-row justify-center gap-2 md:gap-4 md:text-left"
          >
            <img
              src={listing.thumbnail}
              className="aspect-square h-24 rounded-xl mx-auto"
            />

            <div className="flex-1">
              <h1 className="font-semibold">{listing.title}</h1>

              <p className="modal-desc">Rs. {formatNumber(listing.price)}</p>
              <p className="modal-desc">{listing.location}</p>
            </div>
          </Link>

          <p className="text-sm text-muted !mb-5 max-w-[300px] mx-auto">
            Page will be automatically redirected to the listings page or click
            the button below.
          </p>

          <Link to="/listings">
            <Button>Done</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <img src={error} className="h-28 mx-auto" />
          <h1 className="text-danger font-semibold text-center text-xl">
            Error
          </h1>

          <p className="text-primary">
            There was some error processing your payment.
          </p>

          <Link
            to={`/listing/${listingId}`}
            className="modal-card flex flex-col md:flex-row justify-center gap-2 md:gap-4 md:text-left"
          >
            <img
              src={listing.thumbnail}
              className="aspect-square h-24 rounded-xl mx-auto"
            />

            <div className="flex-1">
              <h1 className="font-semibold">{listing.title}</h1>

              <p className="modal-desc">Rs. {formatNumber(listing.price)}</p>
              <p className="modal-desc">{listing.location}</p>
            </div>
          </Link>

          <p className="text-sm text-muted !mb-5 max-w-[300px] mx-auto">
            Page will be automatically redirected to the listing or click the
            button below.
          </p>

          <Link to={`/listing/${listingId}`}>
            <Button>Done</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Payment;
