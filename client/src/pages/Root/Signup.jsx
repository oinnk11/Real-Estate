import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../../hooks/useAuth";
import useAuthContext from "../../hooks/useAuthContext";

const Signup = () => {
  const { fetchUser } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignup = async () => {
    setIsSubmitting(true);

    const response = await signup({ name, email, phone, password });

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
            onSignup();
          }}
          className="w-[400px] md:border rounded-lg p-6 space-y-2"
        >
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
            value={name}
            onChange={(e) => setName(e)}
          />
          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e)}
          />
          <Input
            name="phone"
            label="Phone Number"
            type="number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e)}
          />
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e)}
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center gap-1"
            type="button"
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

          <Button
            placeholder={isSubmitting ? "Loading" : "Login"}
            classname="w-full !mt-4"
            disabled={isSubmitting}
            type="submit"
          />

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
