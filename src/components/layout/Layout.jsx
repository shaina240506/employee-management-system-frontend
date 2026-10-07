import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--slds-bg)", position: "relative" }}>
      {/* Backdrop overlay (mobile only) */}
      <div
        className={`slds-sidebar-backdrop${sidebarOpen ? " is-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header title={title} onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="slds-main-padding" style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
