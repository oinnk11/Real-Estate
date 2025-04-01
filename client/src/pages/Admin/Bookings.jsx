import { useState } from "react";
import bookings from "../../assets/data/bookings";
import formatNumber from "../../utils/formatNumber";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Modal from "react-modal";

const Bookings = () => {
  // PAGINATION RELATED STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(5);
  const totalPages = Math.ceil(bookings.length / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = Number(startIndex) + Number(rows);

  const currentData = bookings.slice(startIndex, endIndex);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  // ACTION RELATED STATES
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const deleteListng = () => {
    console.log("🚀 ~ id to delete:", selectedBooking);

    setIsDeleteModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div>
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
      <div className="w-full rounded-xl border overflow-hidden">
        <table className="table-auto w-full bg-white overflow-y-auto">
          <thead className="text-left border-b bg-sky-50">
            <tr>
              <th className="px-6 py-3">Booking ID</th>
              <th className="px-6 py-3">Booked By</th>
              <th className="px-6 py-3">Listing ID</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Date Booked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((booking) => (
              <tr key={booking.id + booking.title}>
                <td className="px-6 py-3">{booking.id}</td>
                <td className="px-6 py-3">{booking.seller.name}</td>
                <td className="px-6 py-3">{booking.listing.id}</td>
                <td className="px-6 py-3">
                  Rs. {formatNumber(booking.listing.price)}
                </td>
                <td className="px-6 py-3">{booking.dateBooked}</td>
                <td className="px-0 py-3 space-x-2">
                  <button
                    className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex text-sm gap-1 items-center bg-danger hover:bg-danger/85 transition-colors duration-150 text-white p-2 flex-1 rounded-lg font-medium"
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
      <Modal
        isOpen={isDeleteModalOpen}
        className="h-screen bg-black/85 flex items-center justify-center"
      >
        <div className="bg-white w-full max-w-[450px] p-4 space-y-2 rounded-xl">
          <h2 className="font-semibold">
            Are you sure you want to delete this booking?
          </h2>

          <p className="text-muted">
            This action cannot be undone. This will permanently delete this
            booking.
          </p>

          <div className="inline-flex gap-1 items-center justify-end w-full">
            <button
              onClick={() => {
                setSelectedBooking(null);
                setIsDeleteModalOpen(false);
              }}
              className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border py-2 px-4 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteListng()}
              className="inline-flex text-sm gap-1 items-center bg-danger hover:bg-danger/85 transition-colors duration-150 text-white py-2 px-4 rounded-lg font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bookings;
