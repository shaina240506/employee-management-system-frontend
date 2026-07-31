import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  readOnly = false,
  autoComplete,
  max,
  min
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          autoComplete={autoComplete}
          max={max}
          min={min}
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
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
