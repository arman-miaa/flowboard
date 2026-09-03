'use client';
import { useEffect, useState } from 'react';
import { boardService } from '@/services/board/board.service';
import { Plus } from 'lucide-react';
import { BoardHeader } from './BoardHeader';
import { Column } from './Column';
import { DashboardHeader } from '../dashboard/DashboardHeader';

export const BoardView = ({ id }: { id: string }) => {
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const createColumn = async () => {
    const title = prompt('Enter column title:');
    if (!title) return;
    try {
      await boardService.createColumn(id, {
        title,
        position: board.columns?.length || 0,
      });
      fetchBoard();
    } catch (err) {
      alert('Failed to create column');
    }
  };

  const createTask = async (columnId: string, currentTasksLength: number) => {
    const title = prompt('Enter task title:');
    if (!title) return;
    try {
      await boardService.createTask(columnId, {
        title,
        position: currentTasksLength,
      });
      fetchBoard();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  if (loading) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading board...</div>;
  if (!board) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Board not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      <BoardHeader board={board} />

      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full items-start">
          {board.columns?.map((column: any) => (
            <Column key={column.id} column={column} createTask={createTask} />
          ))}

          {/* Add Column Button */}
          <button 
            onClick={createColumn}
            className="cursor-pointer w-80 shrink-0 bg-transparent border border-dashed border-border hover:border-primary hover:bg-card text-muted-foreground hover:text-primary rounded-lg p-3 flex items-center gap-2 font-medium transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Column
          </button>
        </div>
      </main>
    </div>
  );
};
