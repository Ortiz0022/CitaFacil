import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#F4F7F7]">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
