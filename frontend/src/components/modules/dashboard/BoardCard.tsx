export const BoardCard = ({ board, isShared }: { board: any; isShared?: boolean }) => {
  return (
    <a href={`/b/${board.id}`}>
      <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer h-32 flex flex-col justify-between group">
        <h3 className="font-semibold text-slate-900 group-hover:text-[#4F46E5] transition-colors">{board.name}</h3>
        <div className="text-xs text-slate-500">
          {isShared ? `Owned by ${board.ownerId}` : `Created ${new Date(board.createdAt).toLocaleDateString()}`}
        </div>
      </div>
    </a>
  );
};
