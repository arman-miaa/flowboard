'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { EditBoardModal } from '@/components/shared/modals/EditBoardModal';
import { ConfirmDeleteModal } from '@/components/shared/modals/ConfirmDeleteModal';
import { boardService } from '@/services/board/board.service';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const BoardCard = ({ board, isShared, refreshBoards }: { board: any; isShared?: boolean; refreshBoards?: () => void }) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await boardService.deleteBoard(board.id);
      toast.success('Board deleted successfully');
      if (refreshBoards) refreshBoards();
    } catch (err) {
      toast.error('Failed to delete board');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => router.push(`/dashboard/b/${board.id}`)}
        className="group relative bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-[160px] flex flex-col justify-between overflow-hidden"
      >
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors pr-6">
            {board.name}
          </h3>
          
          {!isShared && (
            <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity p-1 outline-none">
                  <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {isShared ? `Owned by ${board.ownerId}` : `Created ${new Date(board.createdAt).toLocaleDateString()}`}
        </div>
      </div>

      <EditBoardModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          if (refreshBoards) refreshBoards();
        }}
        board={board}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Board"
        description="Are you sure you want to delete this board? All columns and tasks inside will be permanently deleted."
        isLoading={isDeleting}
      />
    </>
  );
};
