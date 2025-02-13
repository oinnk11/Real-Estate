import { useEffect, useState } from "react";
import formatNumber from "../../utils/formatNumber";
import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";
import Modal from "react-modal";
import { createBooking, deleteBooking } from "../../hooks/useBookings";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getBookings, getUsers } from "../../hooks/useAdmin";
import { getListings } from "../../hooks/useListings";
import { toast } from "react-toastify";
const Bookings = () => {
  // PAGINATION RELATED STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(5);

  const [bookings, setBookings] = useState([]);

  const totalPages = Math.ceil(bookings.length / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = Number(startIndex) + Number(rows);

  const currentData = bookings.slice(startIndex, endIndex);

  // ACTION RELATED STATES
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);

  // Create booking related states
  const [userId, setUserId] = useState(null);
  const [listingId, setListingId] = useState(null);
  const [amount, setAmount] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const fetchBookings = async () => {
    const response = await getBookings();

    if (response.success) {
      setBookings(response.data);
    }
  };

  const fetchUsers = async () => {
    const response = await getUsers();

    if (response.success) {
      setUsers(response.data);
    }
  };

  const fetchListings = async () => {
    const response = await getListings();

    if (response.success) {
      setListings(response.data);
    }
  };

  const onCreateBooking = async () => {
    setIsSubmitting(true);

    const response = await createBooking({ userId, listingId, amount });

    if (response.success) {
      toast.success(response.data.message);
      setIsCreateModalOpen(false);
      setUserId(null);
      setListingId(null);
      setAmount(null);
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  const handleDeleteBooking = async () => {
    const response = await deleteBooking(selectedBooking.id);

    if (response.success) {
      toast.success(response.data.message);
      fetchBookings();
    } else {
      toast.error(response.error);
    }

    setIsDeleteModalOpen(false);
    setSelectedBooking(null);
  };

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchListings();
  }, [isCreateModalOpen]);

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
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

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="size-5" /> Create
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border overflow-x-auto">
        <table className="w-full text-sm overflow-y-auto">
          <thead className="text-left border-b bg-sky-50">
            <tr>
              <th className="px-6 py-3 w-20"></th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Booked By</th>
              <th className="px-6 py-3">Sold By</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Commission</th>
              <th className="px-6 py-3">Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((booking) => (
              <tr key={booking.id + booking.title}>
                <td className="py-3">
                  <img
                    src={booking.listing.thumbnail}
                    className="aspect-square h-12 rounded-xl object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-3">{booking.id}</td>
                <td className="px-6 py-3">{booking.buyer.name}</td>
                <td className="px-6 py-3">{booking.listing.seller.name}</td>
                <td className="px-6 py-3">
                  Rs. {formatNumber(booking.listing.price)}
                </td>
                <td className="px-6 py-3">
                  Rs. {formatNumber(booking.amount)}
                </td>
                <td
                  className={twMerge(
                    "px-6 py-3 font-semibold",
                    booking.status === "Completed"
                      ? "text-green-500"
                      : "text-danger"
                  )}
                >
                  {booking.status}
                </td>
                <td className="px-0 py-3 space-x-2">
                  <button
                    className="btn-danger"
                    // disabled={booking.status === "Completed"}
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedBooking(booking);
                    }}
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

      {/* MODALS */}
      {/* DELETE MODAL */}
      <Modal isOpen={isDeleteModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">
            Are you sure you want to delete this booking?
          </h2>

          <p className="modal-desc">
            This action cannot be undone. This will permanently delete this
            booking.
          </p>

          <div className="modal-footer">
            <button
              onClick={() => {
                setSelectedBooking(null);
                setIsDeleteModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteBooking()}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* CREATE MODAL */}
      <Modal isOpen={isCreateModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">Create Listing</h2>

          <div className="space-y-1 flex flex-col">
            <label className="text-sm font-medium" htmlFor="user">
              Select User
            </label>
            <select
              name="user"
              className="select"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value={null}>Select</option>
              {users.map((user) => (
                <option key={user.id + user.name} value={user.id}>
                  #{user.id} - {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="text-sm font-medium" htmlFor="listing">
              Select Listing
            </label>
            <select
              name="listing"
              className="select"
              value={listingId}
              onChange={(e) => setListingId(e.target.value)}
            >
              <option value={null}>Select</option>
              {listings.map((listing) => (
                <option key={listing.id + listing.title} value={listing.id}>
                  #{listing.id} - {listing.title}: Rs.{" "}
                  {formatNumber(listing.price)}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Booking Amount"
            placeholder="Enter booking amount"
            type="number"
            value={amount}
            onChange={(value) => setAmount(value)}
          />

          <div className="modal-footer">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <Button onClick={onCreateBooking} disabled={isSubmitting}>
              {isSubmitting ? "Creating" : "Create"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Bookings;
