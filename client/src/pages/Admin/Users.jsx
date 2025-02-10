import { ChevronLeft, ChevronRight, Pen, Trash } from "lucide-react";
import users from "../../assets/data/users";
import { useState } from "react";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(5);

  const startIndex = (currentPage - 1) * rows;
  const endIndex = Number(startIndex) + Number(rows);

  const currentData = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / rows);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <p className="font-medium mb-3">
        Showing{" "}
        <select
          className="bg-white w-16 py-1 border rounded-lg"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={10} selected>
            10
          </option>
          <option value={15}>15</option>
        </select>{" "}
        entries
      </p>
      <div className="w-full rounded-xl border overflow-hidden">
        <table className="table-auto w-full bg-white overflow-y-auto">
          <thead className="text-left border-b bg-sky-50">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email Address</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Date Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user) => (
              <tr key={user.id + user.name}>
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.phone}</td>
                <td className="px-6 py-3">{user.createdAt}</td>
                <td className="px-0 py-3 space-x-2">
                  <button className="inline-flex text-sm gap-1 hover:bg-black/10 transition-colors duration-150 items-center border p-2 rounded-lg font-medium">
                    <Pen className="size-4" />
                    Edit
                  </button>
                  <button className="inline-flex text-sm gap-1 items-center bg-danger hover:bg-danger/85 transition-colors duration-150 text-white p-2 rounded-lg font-medium">
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
    </div>
  );
};

export default Users;
