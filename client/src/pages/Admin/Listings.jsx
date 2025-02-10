import { useEffect, useState } from "react";
import listings from "../../assets/data/listings";
import formatNumber from "../../utils/formatNumber";
import { ChevronLeft, ChevronRight, Pen, Trash } from "lucide-react";
import Modal from "react-modal";
import Input from "../../components/Input";

const Listings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(5);

  const startIndex = (currentPage - 1) * rows;
  const endIndex = Number(startIndex) + Number(rows);

  const currentData = listings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listings.length / rows);

  // ACTION RELATED STATES
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    setTitle(selectedListing?.title);
    setDescription(selectedListing?.description);
    setPrice(selectedListing?.price);
  }, [selectedListing]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const editListng = () => {
    console.log("🚀 ~ id to edit:", selectedListing);

    setIsEditModalOpen(false);
    setSelectedListing(null);
  };

  const deleteListng = () => {
    console.log("🚀 ~ id to delete:", selectedListing);

    setIsDeleteModalOpen(false);
    setSelectedListing(null);
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
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Booked By</th>
              <th className="px-6 py-3">Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((listing) => (
              <tr key={listing.id + listing.title}>
                <td className="px-6 py-3">{listing.id}</td>
                <td className="px-6 py-3">{listing.title}</td>
                <td className="px-6 py-3">{listing?.buyer?.id ?? "N/A"}</td>
                <td className="px-6 py-3">Rs. {formatNumber(listing.price)}</td>
                <td className="px-0 py-3 space-x-2">
                  <button
                    className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border p-2 flex-1 rounded-lg font-medium"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setSelectedListing(listing);
                    }}
                  >
                    <Pen className="size-4" />
                    Edit
                  </button>
                  <button
                    className="inline-flex text-sm gap-1 items-center bg-danger hover:bg-danger/85 transition-colors duration-150 text-white p-2 flex-1 rounded-lg font-medium"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedListing(listing);
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
            Are you sure you want to delete this listing?
          </h2>

          <p className="text-muted">
            This action cannot be undone. This will permanently delete this
            listing.
          </p>

          <div className="inline-flex gap-1 items-center justify-end w-full">
            <button
              onClick={() => {
                setSelectedListing(null);
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

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        className="h-screen bg-black/85 flex items-center justify-center"
      >
        <div className="bg-white w-full max-w-[500px] p-4 space-y-2 rounded-xl">
          <h3 className="text-lg font-medium">Edit Listing</h3>

          {/* FIELDS */}
          <Input
            label="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e)}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border w-full rounded-xl resize-none p-2"
              rows={5}
            />
          </div>

          <Input
            label="Price"
            type="number"
            placeholder="Price"
            value={price}
            disabled={selectedListing?.buyer ? true : false}
            onChange={(e) => setPrice(e)}
          />

          <div className="inline-flex gap-1 items-center justify-end w-full">
            <button
              onClick={() => {
                setSelectedListing(null);
                setIsEditModalOpen(false);
              }}
              className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border py-2 px-4 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => editListng()}
              className="inline-flex text-sm gap-1 items-center bg-primary hover:bg-primary/85 transition-colors duration-150 text-white py-2 px-4 rounded-lg font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Listings;
