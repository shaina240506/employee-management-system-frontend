import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ title, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--slds-bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header title={title} />
        <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
