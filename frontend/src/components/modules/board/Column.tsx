import { MoreHorizontal, Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';

export const Column = ({ column, createTask }: { column: any; createTask: (columnId: string, currentLength: number) => void }) => {
  return (
    <div className="bg-muted/50 w-80 rounded-lg flex flex-col max-h-full shrink-0 border border-border">
      <div className="p-3 font-semibold text-foreground flex justify-between items-center group cursor-pointer border-b border-border/50">
        {column.title}
        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {column.tasks?.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      <div className="p-3 border-t border-border/50">
        <button 
          onClick={() => createTask(column.id, column.tasks?.length || 0)}
          className="cursor-pointer flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-background w-full px-2 py-1.5 rounded transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>
    </div>
  );
};
