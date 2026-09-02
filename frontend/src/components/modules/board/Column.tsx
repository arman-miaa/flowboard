import { MoreHorizontal, Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';

export const Column = ({ column, createTask }: { column: any; createTask: (columnId: string, currentLength: number) => void }) => {
  return (
    <div className="bg-slate-100 w-80 rounded-lg flex flex-col max-h-full shrink-0 border border-slate-200">
      <div className="p-3 font-semibold text-slate-900 flex justify-between items-center group cursor-pointer border-b border-slate-200/50">
        {column.title}
        <button className="text-slate-500 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {column.tasks?.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      <div className="p-3 border-t border-slate-200/50">
        <button 
          onClick={() => createTask(column.id, column.tasks?.length || 0)}
          className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-white w-full px-2 py-1.5 rounded transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>
    </div>
  );
};
