export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 text-center mt-auto">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} FlowBoard. All rights reserved.
      </p>
    </footer>
  );
};
