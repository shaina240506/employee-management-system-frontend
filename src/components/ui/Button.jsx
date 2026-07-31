function Button({
    text,
    type = "button",
    disabled = false,
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                w-full
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
                ${
                    disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                }
            `}
        >
            {text}
        </button>
    );
}

export default Button;