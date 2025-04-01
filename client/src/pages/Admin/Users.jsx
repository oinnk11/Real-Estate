import { ChevronLeft, ChevronRight, Pen, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { NO_OF_DATA_SHOWN } from "../../utils/constants";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../hooks/useAdmin";
import formatDate from "../../utils/formatDate";
import Modal from "react-modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { toast } from "react-toastify";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(NO_OF_DATA_SHOWN);

  const [users, setUsers] = useState([]);

  const startIndex = (currentPage - 1) * rows;
  const endIndex = Number(startIndex) + Number(rows);

  const currentData = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / rows);

  const [selectedUser, setSelectedUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const fetchUsers = async () => {
    const response = await getUsers();

    if (response.success) {
      setUsers(response.data);
    }
  };

  const onCreateUser = async () => {
    setIsSubmitting(true);

    const response = await createUser({ name, email, phone, password });

    if (response.success) {
      toast.success(response.data.message);
      fetchUsers();
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setIsCreateModalOpen(false);
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  const onEditUser = async () => {
    setIsSubmitting(true);

    const response = await updateUser({
      id: selectedUser.id,
      name: editName,
      email: editEmail,
      phone: editPhone,
    });

    if (response.success) {
      toast.success(response.data.message);
      setSelectedUser(null);
      setIsEditModalOpen(false);
      fetchUsers();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  const onDeleteUser = async () => {
    setIsSubmitting(true);

    const response = await deleteUser(selectedUser.id);

    if (response.success) {
      toast.success(response.data.message);
      setSelectedUser(null);
      setIsEditModalOpen(false);
      fetchUsers();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setEditName(selectedUser.name);
      setEditEmail(selectedUser.email);
      setEditPhone(selectedUser.phone);
    }
  }, [selectedUser]);

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
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

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="size-5" /> Create
        </Button>
      </div>

      <div className="w-full rounded-xl border overflow-x-auto">
        <table className="table-auto w-full bg-white overflow-y-auto text-sm">
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
          {currentData.length > 0 && (
            <tbody>
              {currentData.map((user) => (
                <tr key={user.id + user.name}>
                  <td className="px-6 py-3">{user.id}</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.phone}</td>
                  <td className="px-6 py-3">{formatDate(user.createdAt)}</td>
                  <td className="px-0 py-3 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditModalOpen(true);
                      }}
                      className="btn-neutral"
                    >
                      <Pen className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsDeleteModalOpen(true);
                      }}
                      className="btn-danger"
                    >
                      <Trash className="size-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {currentData.length < 1 && (
          <div className="w-full py-6 text-center font-semibold">
            <h1>No data to show.</h1>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {users.length > 0 && (
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

      {/* CREATE MODAL */}
      <Modal isOpen={isCreateModalOpen} className="modal-bg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreateUser();
          }}
          className="modal-card"
        >
          <h3 className="modal-header">Create User</h3>

          <Input
            label="Name"
            placeholder="Enter user name"
            value={name}
            onChange={(value) => setName(value)}
          />
          <Input
            label="Email Address"
            placeholder="Enter user email address"
            type="email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Input
            label="Phone Number"
            placeholder="Enter user phone number"
            type="number"
            value={phone}
            onChange={(value) => setPhone(value)}
          />
          <Input
            label="Password"
            placeholder="Enter user password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />

          <div className="modal-footer">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
              }}
              type="button"
              className="btn-neutral"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal isOpen={isEditModalOpen} className="modal-bg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditUser();
          }}
          className="modal-card"
        >
          <h3 className="text-lg font-medium">Edit User</h3>

          <Input
            label="Name"
            placeholder="Enter user name"
            value={editName}
            onChange={(value) => setEditName(value)}
          />
          <Input
            label="Email Address"
            placeholder="Enter user email address"
            type="email"
            value={editEmail}
            onChange={(value) => setEditEmail(value)}
          />
          <Input
            label="Phone Number"
            placeholder="Enter user phone number"
            type="number"
            value={editPhone}
            onChange={(value) => setEditPhone(value)}
          />

          <div className="modal-footer">
            <button
              onClick={() => {
                setSelectedUser(null);
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

      {/* DELETE MODAL */}
      <Modal isOpen={isDeleteModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="font-semibold">
            Are you sure you want to delete this user?
          </h2>

          <p className="text-muted">
            This action cannot be undone. This will permanently delete this user
            and their listings.
          </p>

          <div className="modal-footer">
            <button
              disabled={isSubmitting}
              onClick={() => {
                setSelectedUser(null);
                setIsDeleteModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteUser}
              disabled={isSubmitting}
              className="btn-danger"
            >
              {isSubmitting ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Users;
