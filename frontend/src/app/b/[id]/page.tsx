'use client';
import { useEffect, useState } from 'react';
import { boardService } from '@/services/board/board.service';
import { useParams, useRouter } from 'next/navigation';
import { Share, Plus, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function BoardView() {
  const params = useParams();
  const router = useRouter();
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoard();
  }, [params.id]);

  const fetchBoard = async () => {
    try {
      const res = await boardService.getBoardById(params.id as string);
      setBoard(res.data || null);
    } catch (error) {
      console.error('Failed to fetch board', error);
      // alert('Access denied or board not found');
      // router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const createColumn = async () => {
    const title = prompt('Enter column title:');
    if (!title) return;
    try {
      await boardService.createColumn(params.id as string, {
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

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Loading board...</div>;
  if (!board) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Board not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Board Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-[#64748B] hover:text-[#0F172A] text-sm font-medium">
            ← Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#0F172A] border-l border-[#E2E8F0] pl-4">{board.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {/* Fake avatars for members */}
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">
              O
            </div>
            {board.accesses?.map((a: any) => (
              <div key={a.id} className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold text-green-600">
                {a.user.name.charAt(0)}
              </div>
            ))}
          </div>
          <button className="cursor-pointer flex items-center gap-2 bg-white border border-[#E2E8F0] text-[#0F172A] px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            <Share className="w-4 h-4" /> Share
          </button>
        </div>
      </header>

      {/* Board Canvas */}
      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full items-start">
          {board.columns?.map((column: any) => (
            <div key={column.id} className="bg-[#F1F5F9] w-80 rounded-lg flex flex-col max-h-full shrink-0 border border-[#E2E8F0]">
              <div className="p-3 font-semibold text-[#0F172A] flex justify-between items-center group cursor-pointer border-b border-[#E2E8F0]/50">
                {column.title}
                <button className="text-[#64748B] hover:text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {column.tasks?.map((task: any) => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm border border-[#E2E8F0] hover:border-[#4F46E5] cursor-grab active:cursor-grabbing group">
                    <h4 className="text-sm font-medium text-[#0F172A] leading-snug">{task.title}</h4>
                    {task.description && (
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{task.description}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-[#E2E8F0]/50">
                <button 
                  onClick={() => createTask(column.id, column.tasks?.length || 0)}
                  className="cursor-pointer flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] hover:bg-white w-full px-2 py-1.5 rounded transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </div>
            </div>
          ))}

          {/* Add Column Button */}
          <button 
            onClick={createColumn}
            className="cursor-pointer w-80 shrink-0 bg-white/50 border border-dashed border-[#CBD5E1] hover:border-[#4F46E5] hover:bg-white text-[#64748B] hover:text-[#4F46E5] rounded-lg p-3 flex items-center gap-2 font-medium transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Column
          </button>
        </div>
      </main>
    </div>
  );
}
