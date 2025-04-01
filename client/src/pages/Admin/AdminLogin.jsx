import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "/logo.png";

const AdminLogin = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="px-4 py-6 border shadow-md w-[380px] rounded-xl space-y-4">
        <img src={logo} className="object-contain h-6 mx-auto !mb-8" />

        <div>
          <h1 className="font-semibold text-lg">Welcome Back! 👋</h1>

          <p className="text-muted text-sm">
            Access your admin dashboard to manage listings, monitor user
            activities, and keep everything running smoothly.
          </p>
        </div>

        <div className="space-y-3">
          <Input label="Username" placeholder="Enter your username" />
          <Input label="Password" placeholder="Enter your password" />
          <Button placeholder="Login" classname="w-full" />
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
