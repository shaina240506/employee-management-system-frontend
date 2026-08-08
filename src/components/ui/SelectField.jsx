function SelectField({ label, name, value, onChange, options = [] }) {
  return (
    <div className="slds-field">
      {label && <label className="slds-label">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="slds-select"
      >
        <option value="">— Select —</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;