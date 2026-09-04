"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { boardService } from '@/services/board/board.service';
import { BoardCard } from '@/components/modules/dashboard/BoardCard';

export default function SharedBoardsPage() {
  const [boards, setBoards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (!userData || userData === 'undefined') {
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

  if (loading) {
    return <div className="p-8 text-muted-foreground animate-pulse">Loading shared boards...</div>;
  }

  const sharedBoards = boards.filter(b => b.ownerId !== user?.userId);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Shared With Me</h1>
          <p className="text-muted-foreground mt-1">Boards that other people have invited you to collaborate on.</p>
        </header>

        <section>
          {sharedBoards.length === 0 ? (
            <div className="text-center p-12 bg-card border border-border border-dashed rounded-lg">
              <p className="text-muted-foreground">No boards have been shared with you yet.</p>
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
    </div>
  );
}
