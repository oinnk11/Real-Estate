import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Root/Home";
import Login from "./pages/Root/Login";
import Signup from "./pages/Root/Signup";
import RootLayout from "./components/RootLayout";
import About from "./pages/Root/About";
import Listings from "./pages/Root/Listings";
import AdminListings from "./pages/Admin/Listings";
import ListingDetails from "./pages/Root/ListingDetails";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import Settings from "./pages/Admin/Settings";
import Users from "./pages/Admin/Users";
import Bookings from "./pages/Admin/Bookings";
import useAuthContext from "./hooks/useAuthContext";
import Logo from "./components/Logo";
import { Loader2 } from "lucide-react";
import Profile from "./pages/Root/Profile";
import Create from "./pages/Root/Create";

function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center p-4 flex-col gap-6">
        <Logo classname="h-10" />

        <Loader2 className="animate-spin ease-in-out text-primary" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user?.role !== "admin" ? <RootLayout /> : <Navigate to="/admin" />
          }
        >
          <Route index element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route
            path="/create"
            element={!user ? <Navigate to="/login" /> : <Create />}
          />
          <Route
            path="/profile"
            element={!user ? <Navigate to="/login" /> : <Profile />}
          />
          <Route path="/aboutus" element={<About />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="users" element={<Users />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path="/admin/login"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <AdminLogin />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
