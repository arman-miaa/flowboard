'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { boardService } from '@/services/board/board.service';
import { logoutUser } from '@/services/auth/logoutUser';
import { Plus } from 'lucide-react';
import { DashboardSidebar } from './DashboardSidebar';
import { BoardCard } from './BoardCard';
import { Button } from '@/components/ui/button';

export const DashboardView = () => {
  const [boards, setBoards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (!userData || userData === 'undefined') {
      logoutUser();
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await boardService.getBoards();
      setBoards(res.data || []);
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
      const res = await boardService.createBoard({ name, description: '' });
      router.push(`/b/${res.data.id}`);
    } catch (error) {
      alert('Failed to create board');
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;

  const myBoards = boards.filter(b => b.ownerId === user?.id);
  const sharedBoards = boards.filter(b => b.ownerId !== user?.id);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <DashboardSidebar user={user} handleLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My Boards</h1>
          <Button onClick={createBoard} className="bg-[#4F46E5] hover:bg-indigo-700 text-white gap-2">
            <Plus className="w-4 h-4" /> Create Board
          </Button>
        </header>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Owned by me</h2>
          {myBoards.length === 0 ? (
            <div className="text-center p-8 bg-white border border-slate-200 border-dashed rounded-lg">
              <p className="text-slate-500">You don't have any boards yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myBoards.map(board => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Shared with me</h2>
          {sharedBoards.length === 0 ? (
            <div className="text-center p-8 bg-white border border-slate-200 border-dashed rounded-lg">
              <p className="text-slate-500">No boards shared with you.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sharedBoards.map(board => (
                <BoardCard key={board.id} board={board} isShared={true} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
