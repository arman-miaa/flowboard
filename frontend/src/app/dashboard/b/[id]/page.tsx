import { BoardView } from '@/components/modules/board/BoardView';

export default function BoardPage({ params }: { params: { id: string } }) {
  return <BoardView id={params.id} />;
}
