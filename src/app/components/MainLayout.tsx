import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Outlet />
    </div>
  );
}
