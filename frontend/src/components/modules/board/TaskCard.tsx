export const TaskCard = ({ task }: { task: any }) => {
  return (
    <div className="bg-card p-3 rounded shadow-sm border border-border hover:border-primary cursor-grab active:cursor-grabbing group transition-colors">
      <h4 className="text-sm font-medium text-card-foreground leading-snug">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
      )}
    </div>
  );
};
