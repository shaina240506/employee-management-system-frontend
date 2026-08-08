import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({
  label,
  type        = "text",
  name,
  value,
  onChange,
  placeholder,
  readOnly    = false,
  autoComplete,
  max,
  min,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="slds-field">
      {label && <label className="slds-label">{label}</label>}
      <div style={{ position: "relative" }}>
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
          className="slds-input"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute", right: "10px", top: "50%",
              transform: "translateY(-50%)", background: "none",
              border: "none", cursor: "pointer", padding: "4px",
              color: "var(--slds-text-weak)", display: "flex",
              alignItems: "center",
            }}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
