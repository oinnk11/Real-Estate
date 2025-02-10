import { createContext, useEffect, useState } from "react";
import { getUser, logout } from "../hooks/useAuth";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const response = await getUser();

    if (response.success) {
      setUser(response.data);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logoutUser = async () => {
    const response = await logout();

    if (response.success) {
      setUser(null);
      setIsLoading(false);
      toast.success(response.data.message, { autoClose: 1500 });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logoutUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
