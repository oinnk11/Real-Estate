import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { changePassword } from "../../hooks/useAdmin";
import { toast } from "react-toastify";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const onChangePassword = async () => {
    setIsSubmitting(true);

    const response = await changePassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (response.success) {
      toast.success(response.data.message);
      resetForm();
    } else {
      toast.error(response.error);
    }

    setIsSubmitting(false);
  };
  return (
    <div className="h-full w-full flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChangePassword();
        }}
        className="border p-4 rounded-xl w-full max-w-[400px] space-y-4"
      >
        <h3 className="font-semibold text-lg">Change Password</h3>

        <div className="space-y-2">
          <Input
            label="Old Password"
            placeholder="Enter your old password"
            type="password"
            value={oldPassword}
            onChange={(value) => setOldPassword(value)}
          />
          <Input
            label="New Password"
            placeholder="Enter new password"
            type="password"
            value={newPassword}
            onChange={(value) => setNewPassword(value)}
          />
          <Input
            label="Confirm Password"
            placeholder="Re-enter new password"
            type="password"
            value={confirmPassword}
            onChange={(value) => setConfirmPassword(value)}
          />
        </div>

        <Button
          placeholder={isSubmitting ? "Changing" : "Change Password"}
          classname="w-full"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default Settings;
