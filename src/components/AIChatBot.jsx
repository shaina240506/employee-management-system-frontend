import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, SendHorizontal, Loader2, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import QuickAction from "./QuickAction";
import { chatWithAI } from "../services/AIService";

function AIChatBot({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const employee = JSON.parse(localStorage.getItem("employee") || "{}");
  const storageKey =
    role === "ADMIN"
      ? "adminChatHistory"
      : `employeeChatHistory_${employee?.id}`;

  const welcomeMessage = {
    sender: "ai",
    text:
      role === "EMPLOYEE"
        ? `👋 **Welcome ${employee?.firstName || ""}!**\n\nI'm your **AI HR Assistant**.\n\nI can help you with:\n\n- 👤 Profile Details\n- 💻 Assigned Assets\n- ✉️ Email Generation\n\nHow can I help you today?`
        : `👋 **Welcome ${employee?.firstName || ""}!**\n\nI'm your **AI HR Assistant**.\n\nI can help you with:\n\n- 👥 Employee Information\n- 💻 Asset Management\n- 🏢 Organization Summary\n- ✉️ Email Generation\n- 📈 Performance Reviews\n\nHow can I help you today?`,
  };

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(storageKey);
    return savedMessages ? JSON.parse(savedMessages) : [welcomeMessage];
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const clearChat = () => {
    localStorage.removeItem(storageKey);
    setMessages([welcomeMessage]);
  };

  const quickActions =
    role === "EMPLOYEE"
      ? [
          { title: "Show My Profile", icon: "👤" },
          { title: "Show My Assets", icon: "💻" },
          { title: "Generate Email", icon: "✉️" },
        ]
      : [
          { title: "Employee Count", icon: "👥" },
          { title: "Asset Count", icon: "💻" },
          { title: "Organization Summary", icon: "🏢" },
          { title: "Generate Email", icon: "✉️" },
          { title: "Performance Review", icon: "📈" },
        ];

  const sendMessage = async (text = message) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await chatWithAI(text, employee?.id, role);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="slds-ai-float-btn"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "var(--slds-brand)",
          color: "#fff",
          boxShadow: "var(--slds-shadow-lg)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9000,
          transition: "transform var(--t-fast)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div
          className="slds-ai-chat-window"
          style={{
            position: "fixed",
            bottom: "86px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 32px)",
            height: "580px",
            maxHeight: "calc(100vh - 120px)",
            borderRadius: "8px",
            background: "#fff",
            boxShadow: "var(--slds-shadow-lg)",
            border: "1px solid var(--slds-border)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9000,
            animation: "slds-slideup .15s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "var(--slds-brand-darker)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={18} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: "700", margin: 0, color: "#fff" }}>
                  AI HR Assistant
                </h2>
                <p style={{ fontSize: "10px", opacity: 0.7, margin: 0 }}>
                  Employee Management System
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={clearChat}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "11px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="slds-btn-icon"
                style={{ color: "#fff" }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "var(--slds-bg)",
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {messages.map((msg, index) => (
                <ChatMessage key={index} sender={msg.sender} text={msg.text} />
              ))}

              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "10px 0" }}>
                  <div className="slds-avatar slds-avatar-sm" style={{ background: "var(--slds-brand)" }}>
                    <Bot size={14} />
                  </div>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid var(--slds-border)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      fontSize: "12px",
                      color: "var(--slds-text-weak)",
                    }}
                  >
                    AI is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Actions */}
            <div style={{ background: "#fff", borderTop: "1px solid var(--slds-border)", padding: "10px 12px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--slds-text-weak)", textTransform: "uppercase", marginBottom: "6px" }}>
                Suggested Actions
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {quickActions.map((item) => (
                  <QuickAction
                    key={item.title}
                    title={`${item.icon} ${item.title}`}
                    onClick={() => sendMessage(item.title)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div style={{ background: "#fff", borderTop: "1px solid var(--slds-border)", padding: "10px 12px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={message}
                placeholder="Ask AI anything..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                className="slds-input"
                style={{ flex: 1 }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="slds-btn slds-btn-brand"
                style={{ width: "36px", height: "36px", padding: 0, borderRadius: "4px" }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <SendHorizontal size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatBot;
