'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, LayoutDashboard, Users, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [boards, setBoards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await api.get('/boards');
      setBoards(res.data);
    } catch (error) {
      console.error('Failed to fetch boards', error);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async () => {
    const name = prompt('Enter board name:');
    if (!name) return;
    try {
      const res = await api.post('/boards', { name, description: '' });
      router.push(`/b/${res.data.id}`);
    } catch (error) {
      alert('Failed to create board');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flowboard_token');
    localStorage.removeItem('flowboard_user');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">Loading...</div>;

  const myBoards = boards.filter(b => b.ownerId === user?.id);
  const sharedBoards = boards.filter(b => b.ownerId !== user?.id);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E2E8F0] hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#4F46E5] flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" /> FlowBoard
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#0F172A] bg-[#F1F5F9] rounded-md font-medium">
            <LayoutDashboard className="w-5 h-5 text-[#64748B]" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-md font-medium transition-colors">
            <Users className="w-5 h-5" /> Shared with me
          </a>
        </nav>
        <div className="p-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-[#0F172A] truncate">{user?.name}</p>
              <p className="text-xs text-[#64748B] truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0F172A]">My Boards</h1>
          <button 
            onClick={createBoard}
            className="flex items-center gap-2 bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Board
          </button>
        </header>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Owned by me</h2>
          {myBoards.length === 0 ? (
            <div className="text-center p-8 bg-white border border-[#E2E8F0] border-dashed rounded-lg">
              <p className="text-[#64748B]">You don't have any boards yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myBoards.map(board => (
                <Link key={board.id} href={`/b/${board.id}`}>
                  <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer h-32 flex flex-col justify-between group">
                    <h3 className="font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">{board.name}</h3>
                    <div className="text-xs text-[#64748B]">Created {new Date(board.createdAt).toLocaleDateString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Shared with me</h2>
          {sharedBoards.length === 0 ? (
            <div className="text-center p-8 bg-white border border-[#E2E8F0] border-dashed rounded-lg">
              <p className="text-[#64748B]">No boards shared with you.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sharedBoards.map(board => (
                <Link key={board.id} href={`/b/${board.id}`}>
                  <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer h-32 flex flex-col justify-between group">
                    <h3 className="font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">{board.name}</h3>
                    <div className="text-xs text-[#64748B]">Owned by {board.ownerId}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
