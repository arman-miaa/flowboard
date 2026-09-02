import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#4F46E5] rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <span className="text-xl font-bold text-slate-900">FlowBoard</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          Log in
        </Link>
        <Link href="/register" className="text-sm font-medium bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
          Sign up
        </Link>
      </div>
    </nav>
  );
};
