export const BoardCard = ({ board, isShared }: { board: any; isShared?: boolean }) => {
  return (
    <a href={`/b/${board.id}`}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer h-32 flex flex-col justify-between group">
        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{board.name}</h3>
        <div className="text-xs text-muted-foreground">
          {isShared ? `Owned by ${board.ownerId}` : `Created ${new Date(board.createdAt).toLocaleDateString()}`}
        </div>
      </div>
    </a>
  );
};
