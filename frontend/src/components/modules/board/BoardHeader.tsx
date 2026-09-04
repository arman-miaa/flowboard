import { Share } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { ShareBoardModal } from '@/components/shared/modals/ShareBoardModal';

export const BoardHeader = ({ board }: { board: any }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (userData && userData !== 'undefined') {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isOwner = user?.userId === board.ownerId;

  return (
    <>
      <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground text-sm font-medium">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-bold text-foreground border-l border-border pl-4">{board.name}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {board.accesses?.map((a: any) => (
            <Avatar key={a.id} className="w-8 h-8 border-2 border-background">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {a.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        {isOwner && (
          <Button variant="outline" size="sm" className="gap-2 cursor-pointer" onClick={() => setIsShareModalOpen(true)}>
            <Share className="w-4 h-4" /> Share
          </Button>
        )}
      </div>
    </div>
      
      <ShareBoardModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        boardId={board.id} 
      />
    </>
  );
};
