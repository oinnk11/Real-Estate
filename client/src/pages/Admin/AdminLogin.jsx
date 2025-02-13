import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "/logo.png";
import { adminLogin } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAuthContext from "../../hooks/useAuthContext";

const AdminLogin = () => {
  const { fetchUser } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLogin = async () => {
    setIsSubmitting(true);

    const response = await adminLogin({ email, password });

    const data = response?.data;

    if (response.success) {
      toast.success(data.message, { autoClose: 1500 });
      fetchUser();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="px-4 py-6 border shadow-md w-[380px] rounded-xl space-y-4">
        <img src={logo} className="object-contain h-6 mx-auto !mb-8" />

        <span>
          <h1 className="font-semibold text-lg">Welcome Back! 👋</h1>

          <p className="text-muted text-sm">
            Access your admin dashboard to manage listings, monitor user
            activities, and keep everything running smoothly.
          </p>
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="space-y-3"
        >
          <Input
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
          <Button
            placeholder={isSubmitting ? "Logging in" : "Login"}
            disabled={isSubmitting}
            classname="w-full"
          />
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
