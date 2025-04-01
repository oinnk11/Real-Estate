import { useLocation } from "react-router-dom";

const AdminTopBar = () => {
  const { pathname } = useLocation();

  const location = pathname.split("/")[2];

  return (
    <div className="w-full border-b py-4 px-6 h-16 flex items-center justify-between bg-white sticky top-0">
      <h1 className="font-semibold text-xl capitalize">{location}</h1>
    </div>
  );
};

export default AdminTopBar;
