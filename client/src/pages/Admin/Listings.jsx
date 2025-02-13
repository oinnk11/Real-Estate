import { useEffect, useState } from "react";
import formatNumber from "../../utils/formatNumber";
import { ChevronLeft, ChevronRight, Pen, Trash } from "lucide-react";
import Modal from "react-modal";
import Input from "../../components/Input";
import { NO_OF_DATA_SHOWN } from "../../utils/constants";
import { getListings, getListingTypes } from "../../hooks/useListings";
import { deleteListing, updateListing } from "../../hooks/useAdmin";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import formatDate from "../../utils/formatDate";
import { twMerge } from "tailwind-merge";

const Listings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(NO_OF_DATA_SHOWN);

  const [listings, setListings] = useState([]);

  // Pagination related variables
  const startIndex = (currentPage - 1) * rows;
  const endIndex = Number(startIndex) + Number(rows);

  const currentData = listings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listings.length / rows);

  // ACTION RELATED STATES
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const [listingTypes, setListingTypes] = useState([]);

  // EDITING RELATED VALUES
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [listingTypeId, setListingTypeId] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const fetchListings = async () => {
    const response = await getListings();

    if (response.success) {
      setListings(response.data);
    }
  };

  const fetchListingTypes = async () => {
    const response = await getListingTypes();

    if (response.success) {
      setListingTypes(response.data);
    }
  };

  const editListng = async () => {
    setIsSubmitting(true);

    const response = await updateListing({
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      listingTypeId,
      listingId: selectedListing.id,
    });

    if (response.success) {
      toast.success(response.data.message);
      setIsEditModalOpen(false);
      setSelectedListing(null);
      fetchListings();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  const onDeleteListing = async () => {
    setIsSubmitting(true);

    const response = await deleteListing(selectedListing.id);

    if (response.success) {
      toast.success(response.data.message);
      setIsDeleteModalOpen(false);
      setSelectedListing(null);
      fetchListings();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchListings();
    fetchListingTypes();
  }, []);

  useEffect(() => {
    if (selectedListing) {
      setTitle(selectedListing.title);
      setDescription(selectedListing.description);
      setPrice(selectedListing.price);
      setBathrooms(selectedListing.bathrooms);
      setBedrooms(selectedListing.bedrooms);
      setListingTypeId(selectedListing.listingTypeId);
    }
  }, [selectedListing]);

  return (
    <div className="w-full">
      <p className="font-medium mb-3">
        Showing{" "}
        <select
          className="bg-white w-16 py-1 border rounded-lg outline-none"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>{" "}
        entries
      </p>

      {/* TABLE */}
      <div className="rounded-xl border overflow-x-auto">
        <table className="w-full text-sm overflow-y-auto">
          <thead className="text-left border-b bg-sky-50">
            <tr>
              <th className="px-6 py-3 w-20"></th>
              <th className="px-6 py-3 w-14">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Seller</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Posted</th>
              <th className="px-6 py-3">Status</th>
              <th className="w-48">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((listing) => (
              <tr key={listing.id + listing.title}>
                <td className="py-3">
                  <img
                    src={listing.thumbnail}
                    className="aspect-square h-12 rounded-xl object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-3">{listing.id}</td>
                <td className="px-6 py-3">{listing.title}</td>
                <td className="px-6 py-3">{listing.seller.name}</td>
                <td className="px-6 py-3">Rs. {formatNumber(listing.price)}</td>
                <td className="px-6 py-3">{formatDate(listing.createdAt)}</td>
                <td
                  className={twMerge(
                    "px-6 py-3 font-semibold",
                    listing.status === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {listing.status}
                </td>
                <td className="px-0 py-3 space-x-2">
                  <button
                    className="btn-neutral"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setSelectedListing(listing);
                    }}
                    disabled={listing.status === "Booked"}
                  >
                    <Pen className="size-4" />
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedListing(listing);
                    }}
                    disabled={listing.status === "Booked"}
                  >
                    <Trash className="size-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentData.length < 1 && (
          <div className="w-full py-6 text-center font-semibold">
            <h1>No data to show.</h1>
          </div>
        )}
      </div>

      {/* Pagination */}
      {listings.length > 1 && (
        <div className="pagination mt-4 flex justify-center items-center gap-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center px-3 py-1 border rounded disabled:opacity-50 bg-white"
          >
            <ChevronLeft className="size-5" />
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => changePage(page + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === page + 1 ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-3 py-1 border rounded disabled:opacity-50 bg-white"
          >
            Next
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      {/* MODALS */}
      {/* DELETE MODAL */}
      <Modal isOpen={isDeleteModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">
            Are you sure you want to delete this listing?
          </h2>

          <p className="modal-desc">
            This action cannot be undone. This will permanently delete this
            listing.
          </p>

          <div className="modal-footer">
            <button
              onClick={() => {
                setSelectedListing(null);
                setIsDeleteModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteListing}
              disabled={isSubmitting}
              className="btn-danger"
            >
              {isSubmitting ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal isOpen={isEditModalOpen} className="modal-bg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editListng();
          }}
          className="modal-card"
        >
          <h3 className="modal-header">Edit Listing</h3>

          {/* FIELDS */}
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

          <Input
            label="Price (Rs.)"
            placeholder="Enter property price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e)}
          />

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

          <div className="modal-footer">
            <button
              onClick={() => {
                setSelectedListing(null);
                setIsEditModalOpen(false);
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
    </div>
  );
};

export default Listings;
