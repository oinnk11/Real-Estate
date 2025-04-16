import { Link } from "react-router-dom";
import {
  deleteNotification,
  getNotifications,
} from "../../hooks/useNotification";
import useAuthContext from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const { user } = useAuthContext();

  const [notifications, setNotifications] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    const response = await getNotifications(user.id);

    if (response.success) {
      setNotifications(response.data);
    }

    setIsLoading(false);
  };

  const onDeleteNotification = async (id) => {
    const response = await deleteNotification(id);

    if (response.success) {
      toast.success(response.data.message);
      fetchNotifications();
    } else {
      toast.error(response.error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className="fluid py-12 h-no-nav md:max-w-[80%] mx-auto">
      <h1 className="font-semibold text-2xl mb-5">Notifications</h1>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center col-span-3">
            <Loader2 className="text-primary animate-spin duration-1000" />
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              className="hover:bg-black/10 rounded-xl p-4 transition-colors duration-150 flex items-center justify-between gap-2 cursor-pointer"
              key={item.id}
            >
              <Link
                to={`/listing/${item.listingId}`}
                className="flex items-center justify-between w-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.listing.thumbnail}
                      className="aspect-square h-12 object-cover rounded-xl"
                    />

                    <p>{item.message}</p>
                  </div>
                </div>
                <p className="modal-desc">
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </Link>
              <button
                className="btn-danger !px-2 z-10"
                onClick={() => onDeleteNotification(item.id)}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))
        ) : (
          <p>You have no notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
