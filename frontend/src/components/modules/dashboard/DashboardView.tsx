'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { boardService } from '@/services/board/board.service';
import { logoutUser } from '@/services/auth/logoutUser';
import { Plus } from 'lucide-react';
import { BoardCard } from './BoardCard';
import { Button } from '@/components/ui/button';
import { CreateBoardModal } from '@/components/shared/modals/CreateBoardModal';

export const DashboardView = () => {
  const [boards, setBoards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (!userData || userData === 'undefined') {
      logoutUser();
      router.push('/login');
      return;
    }
    if (!user) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchBoards();
    }
  }, [query, user]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchBoards = async () => {
    try {
      const res = await boardService.getBoards(query);
      setBoards(res.data || []);
    } catch (error) {
      console.error('Failed to fetch boards', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;

  const myBoards = boards.filter(b => b.ownerId === user?.userId);
  const sharedBoards = boards.filter(b => b.ownerId !== user?.userId);

  return (
    <>
      <div className="p-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">My Boards</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create Board
          </Button>
        </header>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Owned by me</h2>
          {myBoards.length === 0 ? (
            <div className="text-center p-8 bg-card border border-border border-dashed rounded-lg">
              <p className="text-muted-foreground">You don't have any boards yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myBoards.map(board => (
                <BoardCard key={board.id} board={board} refreshBoards={fetchBoards} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Shared with me</h2>
          {sharedBoards.length === 0 ? (
            <div className="text-center p-8 bg-card border border-border border-dashed rounded-lg">
              <p className="text-muted-foreground">No boards shared with you.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sharedBoards.map(board => (
                <BoardCard key={board.id} board={board} isShared={true} />
              ))}
            </div>
          )}
        </section>
      </div>
      
      <CreateBoardModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchBoards}
      />
    </>
  );
};
