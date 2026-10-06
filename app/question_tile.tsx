import type { Question } from './types';

export default function QuestionTile({
    item,
    tileId,
    isOpened,
    onOpen,
}: {
    item: Question;
    tileId: string;
    isOpened: boolean;
    onOpen: (question: string, tileId: string) => void;
}) {
    return (
        <button
            className={`flex flex-col items-center justify-center border p-4 text-5xl text-white shadow-md shadow-black/20 transition-colors ${isOpened ? 'cursor-default border-blue-950 bg-blue-950/60' : 'cursor-pointer border-blue-800 bg-blue-900 hover:border-blue-500 hover:bg-blue-800'}`}
            type="button"
            disabled={isOpened}
            onClick={() => onOpen(item.question, tileId)}
        >
            {isOpened ? null : item.points}
        </button>
    );
}