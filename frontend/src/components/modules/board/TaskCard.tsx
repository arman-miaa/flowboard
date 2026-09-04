import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { EditTaskModal } from '@/components/shared/modals/EditTaskModal';
import { ConfirmDeleteModal } from '@/components/shared/modals/ConfirmDeleteModal';
import { boardService } from '@/services/board/board.service';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const TaskCard = ({ task, fetchBoard, userRole }: { task: any; fetchBoard: () => void; userRole?: string }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await boardService.deleteTask(task.id);
      toast.success('Task deleted');
      fetchBoard();
    } catch (err) {
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => { setModalMode("view"); setIsEditModalOpen(true); }}
        className="bg-card p-3 rounded shadow-sm border border-border hover:border-primary cursor-pointer group transition-colors relative"
      >
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-sm font-medium text-card-foreground leading-snug">{task.title}</h4>
          
          {userRole !== 'VIEWER' && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground p-0.5 rounded-sm outline-none">
                  <MoreHorizontal className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { setModalMode("edit"); setIsEditModalOpen(true); }} className="cursor-pointer">
                    <Edit className="w-4 h-4 mr-2" /> Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {task.description && (
          <div className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {task.description}
          </div>
        )}
      </div>

      <EditTaskModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchBoard}
        task={task}
        initialMode={modalMode}
        userRole={userRole}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task?"
        isLoading={isDeleting}
      />
    </>
  );
};
