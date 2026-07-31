function TextAreaField({
    label,
    name,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-2">

            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <textarea
                rows="4"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    resize-none
                    transition-all
                    duration-300
                    focus:border-purple-600
                    focus:ring-2
                    focus:ring-purple-300
                "
            />

        </div>
    );
}

export default TextAreaField;