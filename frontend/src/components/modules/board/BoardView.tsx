'use client';
import { useState, useEffect } from 'react';
import { boardService } from '@/services/board/board.service';
import { Plus } from 'lucide-react';
import { BoardHeader } from './BoardHeader';
import { Column } from './Column';

import { CreateColumnModal } from '@/components/shared/modals/CreateColumnModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export const BoardView = ({ id }: { id: string }) => {
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, [id]);

  const fetchBoard = async () => {
    try {
      const res = await boardService.getBoardById(id);
      setBoard(res.data || null);
    } catch (error) {
      console.error('Failed to fetch board', error);
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumns = Array.from(board.columns);
      const [reorderedItem] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, reorderedItem);

      // Optimistic update
      setBoard({ ...board, columns: newColumns });

      try {
        await boardService.updateColumn(draggableId, { position: destination.index });
        // Optionally refetch or update subsequent columns if backend doesn't do transaction
        fetchBoard();
      } catch (err) {
        console.error(err);
        fetchBoard(); // revert on fail
      }
      return;
    }

    if (type === 'task') {
      const startColIndex = board.columns.findIndex((c: any) => c.id === source.droppableId);
      const finishColIndex = board.columns.findIndex((c: any) => c.id === destination.droppableId);

      const startCol = board.columns[startColIndex];
      const finishCol = board.columns[finishColIndex];

      if (startCol === finishCol) {
        // Reordering in same column
        const newTasks = Array.from(startCol.tasks);
        const [reorderedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, reorderedTask);

        // Update positions optimistically so the Column sort doesn't revert it
        newTasks.forEach((t: any, idx: number) => { t.position = idx; });

        const newColumns = Array.from(board.columns);
        newColumns[startColIndex] = { ...startCol, tasks: newTasks };

        setBoard({ ...board, columns: newColumns });

        try {
          await boardService.moveTask(draggableId, { columnId: startCol.id, position: destination.index });
          fetchBoard();
        } catch (err) {
          console.error(err);
          fetchBoard();
        }
      } else {
        // Moving to different column
        const startTasks = Array.from(startCol.tasks);
        const [movedTask] = startTasks.splice(source.index, 1);

        const finishTasks = Array.from(finishCol.tasks);
        finishTasks.splice(destination.index, 0, movedTask);

        // Update positions optimistically
        startTasks.forEach((t: any, idx: number) => { t.position = idx; });
        finishTasks.forEach((t: any, idx: number) => { t.position = idx; });

        const newColumns = Array.from(board.columns);
        newColumns[startColIndex] = { ...startCol, tasks: startTasks };
        newColumns[finishColIndex] = { ...finishCol, tasks: finishTasks };

        setBoard({ ...board, columns: newColumns });

        try {
          await boardService.moveTask(draggableId, { columnId: finishCol.id, position: destination.index });
          fetchBoard();
        } catch (err) {
          console.error(err);
          fetchBoard();
        }
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading board...</div>;
  if (!board) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Board not found</div>;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <BoardHeader board={board} fetchBoard={fetchBoard} />

      <main className="flex-1 overflow-x-auto p-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div 
                className="flex gap-6 h-full items-start"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.columns?.sort((a: any, b: any) => a.position - b.position).map((column: any, index: number) => (
                  <Draggable key={column.id} draggableId={column.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="h-full"
                      >
                        <Column 
                          column={column} 
                          fetchBoard={fetchBoard} 
                          dragHandleProps={board.userRole !== 'VIEWER' ? provided.dragHandleProps : null}
                          userRole={board.userRole}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {board.userRole !== 'VIEWER' && (
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="cursor-pointer w-80 shrink-0 bg-transparent border border-dashed border-border hover:border-primary hover:bg-card text-muted-foreground hover:text-primary rounded-lg p-3 flex items-center gap-2 font-medium transition-colors"
                  >
                    <Plus className="w-5 h-5" /> Add Column
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>

      <CreateColumnModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchBoard}
        boardId={id}
        position={board.columns?.length || 0}
      />
    </div>
  );
};
