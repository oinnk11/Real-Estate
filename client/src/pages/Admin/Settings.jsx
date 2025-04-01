import Input from "../../components/Input";
import Button from "../../components/Button";

const Settings = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="border p-4 rounded-xl w-full max-w-[400px] space-y-4">
        <h3 className="font-semibold text-lg">Change Password</h3>

        <div className="space-y-2">
          <Input
            label="Current Password"
            placeholder="Enter your current password"
          />
          <Input label="New Password" placeholder="Enter new password" />
          <Input label="Confirm Password" placeholder="Re-enter new password" />
        </div>

        <Button placeholder="Change Password" classname="w-full" />
      </div>
    </div>
  );
};

export default Settings;
