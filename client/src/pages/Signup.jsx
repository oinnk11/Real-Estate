import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className="w-full min-h-screen flex items-center justify-center py-4">
        <div className="w-[400px] md:border rounded-lg p-6 space-y-2">
          <Logo classname="object-contain h-6 mx-auto" />

          <div className="!my-6">
            <h1 className="font-bold text-lg">Create your account ✨</h1>
            <p className="text-gray-500 text-sm">
              Sign up now to join our community and enjoy all our services.
            </p>
          </div>
          <Input
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
          />
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
          <Input
            name="confirmPassword"
            label="Confrim Password"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
          />

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

          <Button placeholder="Signup" classname="w-full !mt-4" />

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
