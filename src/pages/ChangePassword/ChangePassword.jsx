import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/EmployeeService";

import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

function ChangePassword() {

    const employee = JSON.parse(localStorage.getItem("employee"));

    const [loading, setLoading] = useState(false);

    const [passwordData, setPasswordData] = useState({
        email: employee?.email || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value
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
                confirmPassword: ""

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                error.response?.data ||

                "Password Change Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

                <div className="mb-8">

                    <BackButton />

                </div>

                <h1 className="text-3xl font-bold text-center text-purple-700 mb-10">

                    Change Password

                </h1>

                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="space-y-6"
                >

                    <InputField
                        label="Email"
                        name="email"
                        value={passwordData.email}
                        readOnly
                    />

                    <InputField
                        label="Old Password"
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter Old Password"
                    />

                    <InputField
                        label="New Password"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                    />

                    <InputField
                        label="Confirm New Password"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                    />

                    <div className="pt-2">

                        <Button
                            text={loading ? "Changing..." : "Change Password"}
                            type="submit"
                            disabled={loading}
                        />

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ChangePassword;