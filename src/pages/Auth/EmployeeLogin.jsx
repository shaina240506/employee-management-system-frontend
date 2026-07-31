import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword } from "../../services/EmployeeService";
import { loginEmployee } from "../../services/EmployeeService";

import InputField from "../../components/ui/InputField";

function EmployeeLogin() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [forgotData, setForgotData] = useState({
    email: "",
    favouriteColorAnswer: "",
    birthplaceAnswer: "",
    firstSchoolAnswer: "",
    newPassword: "",
    confirmPassword: ""
});
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));

    };
    const handleForgotChange = (e) => {

    const { name, value } = e.target;

    setForgotData((prev) => ({
        ...prev,
        [name]: value
    }));

};

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!loginData.email.trim()) {

        toast.error("Email is required.");
        return;

    }

    if (!loginData.password.trim()) {

        toast.error("Password is required.");
        return;

    }

    setLoading(true);

    try {

        const response = await loginEmployee(loginData);

        localStorage.setItem(
            "employee",
            JSON.stringify(response.data)
        );

        toast.success("Login Successful");

        if (response.data.role === "ADMIN") {

            navigate("/admin/dashboard");

        } else {

            navigate("/employee/dashboard");

        }

    } catch (error) {

        if (error.response?.status === 400) {

            toast.error("Please enter Email and Password.");

        } else {

            toast.error(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        }

    } finally {

        setLoading(false);

    }

};
const handleForgotPassword = async () => {

    if (forgotData.newPassword !== forgotData.confirmPassword) {

        toast.error("Passwords do not match");

        return;

    }

    try {

        const { confirmPassword, ...requestData } = forgotData;
        console.log(requestData);

        const response = await forgetPassword(requestData);

        toast.success(response.data);

        setShowForgotModal(false);

        setForgotData({
            email: "",
            favouriteColorAnswer: "",
            birthplaceAnswer: "",
            firstSchoolAnswer: "",
            newPassword: "",
            confirmPassword: ""
        });

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Password Reset Failed"
        );

    }

};

    return (
        <>
        <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-6"
        >

            <InputField
                label="Email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                autoComplete="off"
            />

            <InputField
                label="Password"
                type="password"
                autoComplete="off"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter Password"
            />
            <div className="text-right -mt-3">

            <button
                 type="button"
                 onClick={() => setShowForgotModal(true)}
                 className="text-sm text-purple-600 hover:underline"
             >
                 Forgot Password?
             </button>

            </div>

            <div className="flex flex-col items-center gap-4 pt-2">

                <button

                    type="submit"

                    className="w-44 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"

                >

                    {loading ? "Logging In..." : "Login"}

                </button>

                <button

                    type="button"

                    onClick={() => navigate("/employee/register")}

                    className="w-44 border border-gray-400 py-3 rounded-lg hover:bg-gray-100"

                >

                    Register

                </button>

            </div>

        </form>
        {showForgotModal && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl p-8 w-[450px] shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
        </h2>

        <InputField
            label="Email"
            name="email"
             value={forgotData.email}
             onChange={handleForgotChange}
             placeholder="Enter Email"
             />

        <InputField
            label="Favourite Color"
            name="favouriteColorAnswer"
            placeholder="Favourite Color"
            value={forgotData.favouriteColorAnswer}
            onChange={handleForgotChange}

        />

        <InputField
            label="Birth Place"
            name="birthplaceAnswer"
            value={forgotData.birthplaceAnswer}
            onChange={handleForgotChange}
            placeholder="Birth Place"
        />

        <InputField
            label="First School"
            name="firstSchoolAnswer"
            value={forgotData.firstSchoolAnswer}
            onChange={handleForgotChange}
            placeholder="First School"
        />

        <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={forgotData.newPassword}
            onChange={handleForgotChange}
            placeholder="New Password"
        />

        <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={forgotData.confirmPassword}
            onChange={handleForgotChange}
            placeholder="Confirm Password"
        />

        <div className="flex justify-end gap-4 mt-6">

            <button
                onClick={() => setShowForgotModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-300"
            >
                Cancel
            </button>

            <button
                onClick={handleForgotPassword}
                type="button"
                className="px-5 py-2 rounded-lg bg-purple-600 text-white"
            >
                Reset Password
            </button>

        </div>

    </div>

</div>

)}
</>
    );

}

export default EmployeeLogin;