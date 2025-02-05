import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className="w-full min-h-screen flex items-center justify-center py-4">
        <div className="w-[400px] md:border rounded-lg p-6 space-y-2">
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
          />
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between">
            <button
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

            <Link
              to="/forgot-password"
              className="underline text-blue-600 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <Button placeholder="Login" classname="w-full !mt-4" />

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
