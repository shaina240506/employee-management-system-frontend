import { useEffect } from "react";
import EmployeeLogin from "./EmployeeLogin";

function AuthPage() {

    useEffect(() => {
        document.title = "Employee Login | EMS";
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">

            <div className="bg-white shadow-lg rounded-xl p-8 md:p-10 w-full max-w-lg">

                <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
                    Employee Management System
                </h1>


                <EmployeeLogin />

            </div>

        </div>
    );
}

export default AuthPage;