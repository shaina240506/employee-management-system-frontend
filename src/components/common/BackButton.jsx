import { useNavigate } from "react-router-dom";

function BackButton({ path }) {

    const navigate = useNavigate();

    const handleBack = () => {

        if (path) {

            navigate(path);

        } else {

            navigate(-1);

        }

    };

    return (

        <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-gray-700 font-semibold hover:bg-purple-100 hover:text-purple-700 transition duration-200"
        >
            <span className="text-lg">←</span>
            <span>Back</span>
        </button>

    );

}

export default BackButton;