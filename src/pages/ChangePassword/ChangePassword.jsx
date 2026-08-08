import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { changePassword } from "../../services/EmployeeService";

function ChangePassword() {
  const employee = JSON.parse(localStorage.getItem("employee") || "{}");
  const [loading, setLoading] = useState(false);

  const [passwordData, setPasswordData] = useState({
    email: employee?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.oldPassword === passwordData.newPassword) {
      toast.error("New password cannot be the same as old password.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await changePassword(passwordData);
      toast.success(response.data);
      setPasswordData({
        email: employee?.email || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data ||
        "Password Change Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Account Security Settings">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <BackButton />

        <div className="slds-card" style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
          <div className="slds-card-header">
            <h1 className="slds-card-title">Change Password</h1>
          </div>
          <div className="slds-card-body">
            <form onSubmit={handleSubmit} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <InputField
                label="Account Email"
                name="email"
                value={passwordData.email}
                readOnly
              />
              <InputField
                label="Current Password"
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
              <InputField
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <InputField
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />

              <div style={{ marginTop: "12px" }}>
                <Button
                  text={loading ? "Updating..." : "Update Password"}
                  type="submit"
                  disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;