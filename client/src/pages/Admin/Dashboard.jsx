import { ArrowLeftRight, Building, CreditCard, Users } from "lucide-react";
import formatNumber from "../../utils/formatNumber";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../hooks/useAdmin";
import { twMerge } from "tailwind-merge";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [listingCount, setListingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [transactions, setTransactions] = useState(0);

  const [recentBookings, setRecentBookings] = useState([]);

  const countCard = [
    {
      title: "Users",
      count: userCount,
      icon: Users,
    },
    {
      title: "Listings",
      count: listingCount,
      icon: Building,
    },
    {
      title: "Bookings",
      count: bookingCount,
      icon: CreditCard,
    },
    {
      title: "Transactions (This Month)",
      count: `Rs. ${formatNumber(transactions)}`,
      icon: ArrowLeftRight,
    },
  ];

  const fetchDashboardData = async () => {
    const response = await getDashboardData();

    if (response.success) {
      const data = response.data;

      setUserCount(data.userCount);
      setListingCount(data.listingCount);
      setBookingCount(data.bookingCount);
      setTransactions(data.transactions);
      setRecentBookings(data.recentBookings);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-4">
      {/* COUNT CARDS */}
      <div className="flex gap-3 flex-col lg:flex-row">
        {countCard.map((item) => (
          <div
            className="flex-1 border rounded-xl p-4 flex items-center gap-4"
            key={item.title}
          >
            <div className="size-12 bg-sky-50 rounded-lg inline-flex items-center justify-center">
              <item.icon className="text-primary size-8" />
            </div>
            <span>
              <p className="font-semibold text-xl">{item.count}</p>
              <p className="text-sm text-muted">{item.title}</p>
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h1 className="font-semibold text-lg">Recent Bookings</h1>

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
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
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
                </tr>
              ))}
            </tbody>
          </table>

          {recentBookings.length < 1 && (
            <div className="w-full py-6 text-center">
              <h1 className="font-semibold">No recent transactions.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
