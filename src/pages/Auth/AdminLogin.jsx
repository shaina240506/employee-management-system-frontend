
import { useState } from "react";
import { toast } from "react-toastify";
import { loginEmployee } from "../../services/EmployeeService";

import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function AdminLogin() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const response = await loginEmployee(loginData);

           localStorage.setItem(
               "employee",
                JSON.stringify(response.data)
         );

        toast.success("Login Successful!");

        if(response.data.role === "ADMIN"){
             navigate("/admin/dashboard");
       }
         else{
              toast.error("Access Denied!");
        }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Invalid Email or Password"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <h2 className="text-2xl font-bold text-center">
                Admin Login
            </h2>

            <InputField
                label="Email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter Email"
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter Password"
            />

            <Button
                text="Login"
                type="submit"
            />

        </form>
    );
}

export default AdminLogin;