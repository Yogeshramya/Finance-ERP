import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}