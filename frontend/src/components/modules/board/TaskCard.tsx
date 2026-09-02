export const TaskCard = ({ task }: { task: any }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm border border-slate-200 hover:border-[#4F46E5] cursor-grab active:cursor-grabbing group">
      <h4 className="text-sm font-medium text-slate-900 leading-snug">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>
      )}
    </div>
  );
};
