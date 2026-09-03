import { useState } from 'react';
import { MoreHorizontal, Plus, Edit, Trash2 } from 'lucide-react';
import { TaskCard } from './TaskCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditColumnModal } from '@/components/shared/modals/EditColumnModal';
import { CreateTaskModal } from '@/components/shared/modals/CreateTaskModal';
import { ConfirmDeleteModal } from '@/components/shared/modals/ConfirmDeleteModal';
import { boardService } from '@/services/board/board.service';
import { toast } from 'sonner';
import { Droppable, Draggable } from '@hello-pangea/dnd';

export const Column = ({ column, fetchBoard, dragHandleProps }: { column: any; fetchBoard: () => void; dragHandleProps?: any }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await boardService.deleteColumn(column.id);
      toast.success('Column deleted');
      fetchBoard();
    } catch (err) {
      toast.error('Failed to delete column');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-muted/50 w-80 rounded-lg flex flex-col max-h-full shrink-0 border border-border">
        <div 
          className="p-3 font-semibold text-foreground flex justify-between items-center group border-b border-border/50 bg-muted/80 rounded-t-lg"
          {...dragHandleProps}
        >
          <div className="flex items-center gap-2">
            {column.title}
            <span className="bg-background text-muted-foreground px-2 py-0.5 rounded-full text-xs font-normal">
              {column.tasks?.length || 0}
            </span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity p-1 outline-none cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditModalOpen(true)} className="cursor-pointer whitespace-nowrap">
                <Edit className="w-4 h-4 mr-2" /> Edit Column
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-destructive focus:text-destructive cursor-pointer whitespace-nowrap"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Droppable droppableId={column.id} type="task">
          {(provided) => (
            <div 
              className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar min-h-[150px]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.tasks?.sort((a: any, b: any) => a.position - b.position).map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} fetchBoard={fetchBoard} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <div className="p-3 border-t border-border/50">
          <button 
            onClick={() => setIsCreateTaskModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-background w-full px-2 py-1.5 rounded transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      <EditColumnModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchBoard}
        column={column}
      />

      <CreateTaskModal 
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onSuccess={fetchBoard}
        columnId={column.id}
        position={column.tasks?.length || 0}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Column"
        description="Are you sure you want to delete this column? All tasks inside will be permanently deleted."
        isLoading={isDeleting}
      />
    </>
  );
};
