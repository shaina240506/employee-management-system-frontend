import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, SendHorizontal, Loader2, X } from "lucide-react";

import ChatMessage from "./ChatMessage";
import QuickAction from "./QuickAction";
import { chatWithAI } from "../services/AIService";

function AIChatBot({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const employee = JSON.parse(localStorage.getItem("employee"));
  const storageKey =
  role === "ADMIN"
    ? "adminChatHistory"
    : `employeeChatHistory_${employee?.id}`;
  const welcomeMessage = {
    sender: "ai",
    text: `👋 **Welcome ${employee?.firstName || ""}!**

I'm your **AI HR Assistant**.

I can help you with:

- 👥 Employee Information
- 💻 Asset Management
- 🏢 Organization Summary
- ✉️ Email Generation
- 📈 Performance Reviews

How can I help you today?`,
  };

  const [messages, setMessages] = useState(() => {

  const savedMessages = localStorage.getItem(storageKey);

  return savedMessages
    ? JSON.parse(savedMessages)
    : [welcomeMessage];

});
  const messagesEndRef = useRef(null);

  useEffect(() => {

  localStorage.setItem(
    storageKey,
    JSON.stringify(messages)
  );

}, [messages, storageKey]);
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);
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
          { title: "Performance Review", icon: "📈" },
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
      const response = await chatWithAI(
        text,

        employee?.id,

        role,
      );

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
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
      >
        <MessageCircle size={26} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] max-w-[95vw] h-[620px] rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50">
          {/* Header */}

          <div className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 px-6 py-5 min-h-[84px] flex-shrink-0">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Bot className="text-white" size={22} />
                </div>

                <div>
                  <h2 className="text-white text-lg font-bold">
                    AI HR Assistant
                  </h2>

                  <p className="text-purple-100 text-sm">
                    Employee Management Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="px-3 py-2 rounded-lg bg-white/20 text-white text-sm hover:bg-white/30 transition"
                >
                  Clear
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/20 flex justify-center items-center transition"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}

          <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
            <div className="flex-[2] overflow-y-auto px-5 py-5">
              {messages.map((msg, index) => (
                <ChatMessage key={index} sender={msg.sender} text={msg.text} />
              ))}

              {loading && (
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-center items-center shadow">
                    <Bot size={18} />
                  </div>

                  <div className="bg-white rounded-2xl rounded-bl-md border border-slate-200 px-5 py-4 shadow-sm">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>

                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:150ms]"></span>

                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Suggested Actions */}

            <div className="bg-white border-t px-4 pt-2 pb-1 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Suggested Actions
              </p>

              <div className="flex flex-wrap gap-1.5">
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

          {/* Footer */}

          <div className="bg-white border-t px-4 pt-3 pb-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                placeholder="Ask AI anything..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="
                                    flex-1
                                    rounded-2xl
                                    border
                                    border-slate-300
                                    px-5
                                    py-3
                                    outline-none
                                    transition
                                    focus:border-purple-500
                                    focus:ring-2
                                    focus:ring-purple-500/30
                                    "
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="
                                    w-14
                                    h-14
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-purple-700
                                    via-fuchsia-600
                                    to-indigo-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    shadow-lg
                                    hover:scale-105
                                    transition
                                    disabled:opacity-50
                                    disabled:hover:scale-100
                                    "
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <SendHorizontal size={22} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatBot;
