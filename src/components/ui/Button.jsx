function Button({
  text,
  type       = "button",
  disabled   = false,
  variant    = "brand",
  size       = "default",
  fullWidth  = true,
  onClick,
  icon,
}) {
  const variantClass = {
    brand:              "slds-btn-brand",
    neutral:            "slds-btn-neutral",
    outline:            "slds-btn-outline",
    destructive:        "slds-btn-destructive",
    "destructive-filled": "slds-btn-destructive-filled",
    success:            "slds-btn-success-filled",
  }[variant] || "slds-btn-brand";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "slds-btn",
        variantClass,
        size === "lg"  ? "slds-btn-lg"   : "",
        fullWidth      ? "slds-btn-full"  : "",
      ].join(" ")}
    >
      {icon && icon}
      {text}
    </button>
  );
}

export default Button;