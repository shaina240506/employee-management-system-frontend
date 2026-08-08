function TextAreaField({ label, name, value, onChange, placeholder, rows = 4 }) {
  return (
    <div className="slds-field">
      {label && <label className="slds-label">{label}</label>}
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="slds-textarea"
      />
    </div>
  );
}

export default TextAreaField;