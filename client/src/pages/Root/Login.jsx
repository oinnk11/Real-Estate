import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../hooks/useAuth";
import useAuthContext from "../../hooks/useAuthContext";

const Login = () => {
  const { fetchUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLogin = async () => {
    setIsSubmitting(true);

    const response = await login({ email, password });

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
    <section>
      <div className="w-full min-h-screen flex items-center justify-center py-4">
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="w-[400px] md:border rounded-lg p-6 space-y-2"
        >
          <Logo classname="object-contain h-6 mx-auto" />

          <div className="!my-6">
            <h1 className="font-bold text-lg">Welcome Back! 👋</h1>
            <p className="text-gray-500 text-sm">
              Access your account and get started right away.
            </p>
          </div>
          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e)}
          />
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e)}
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1"
            >
              <div
                className={twMerge(
                  "size-4 rounded border flex items-center justify-center shadow",
                  showPassword && "bg-primary"
                )}
              >
                <Check className="text-white" />
              </div>
              <p className="text-sm">Show Password</p>
            </button>
          </div>

          <Button
            placeholder={isSubmitting ? "Logging in..." : "Login"}
            classname="w-full !mt-4"
            // onClick={() => onLogin()}
            disabled={isSubmitting}
            type="submit"
          />

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-link">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
