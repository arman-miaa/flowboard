'use client';
import { BoardView } from '@/components/modules/board/BoardView';
import { use } from 'react';

export default function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BoardView id={id} />;
}
