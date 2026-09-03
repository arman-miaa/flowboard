export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 text-center mt-auto">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} FlowBoard. All rights reserved.
      </p>
    </footer>
  );
};
