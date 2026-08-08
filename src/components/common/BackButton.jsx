import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--slds-brand)",
        fontSize: "13px",
        fontWeight: "600",
        fontFamily: "inherit",
        padding: "4px 0",
        transition: "color var(--t-fast)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--slds-brand-dark)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--slds-brand)")}
    >
      <FiChevronLeft size={16} />
      Back
    </button>
  );
}

export default BackButton;