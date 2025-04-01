import { ArrowLeftRight, Building, CreditCard, Users } from "lucide-react";
import formatNumber from "../../utils/formatNumber";

const Dashboard = () => {
  const countCard = [
    {
      title: "Users",
      count: 700,
      icon: Users,
    },
    {
      title: "Listings",
      count: 500,
      icon: Building,
    },
    {
      title: "Bookings",
      count: 300,
      icon: CreditCard,
    },
    {
      title: "Transactions (This Month)",
      count: 300,
      icon: ArrowLeftRight,
    },
  ];

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
              <p className="font-semibold text-2xl">
                {formatNumber(item.count)}
              </p>
              <p className="text-sm text-muted">{item.title}</p>
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h1 className="font-semibold text-lg">Recent Bookings</h1>

        <div className="w-full rounded-xl border overflow-hidden">
          <table className="table-auto w-full">
            <thead className="text-left border-b bg-sky-50">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Listing ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Booked By</th>
                <th className="px-6 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-3">1</td>
                <td className="px-6 py-3">1</td>
                <td className="px-6 py-3">This is a title</td>
                <td className="px-6 py-3">Peter Parker</td>
                <td className="px-6 py-3">30000000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
