import { Share } from 'lucide-react';
import Link from 'next/link';

export const BoardHeader = ({ board }: { board: any }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 text-sm font-medium">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-bold text-slate-900 border-l border-slate-200 pl-4">{board.name}</h1>
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
        <button className="cursor-pointer flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
          <Share className="w-4 h-4" /> Share
        </button>
      </div>
    </header>
  );
};
