import { DashboardView } from '@/components/modules/dashboard/DashboardView';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>}>
      <DashboardView />
    </Suspense>
  );
}
