function SelectField({
    
    label,
    name,
    value,
    onChange,
    options = [],

}) {
    return (
        <div className="flex flex-col gap-2">

            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    transition-all
                    duration-300
                    focus:border-purple-600
                    focus:ring-2
                    focus:ring-purple-300
                "
            >
                <option value="">Select</option>

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}

            </select>

        </div>
    );
}

export default SelectField;