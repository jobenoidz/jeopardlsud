import { Fragment } from "react";
import { boardOne, boardTwo } from "./questions";
import QuestionTile from "./question_tile";
import type { Board } from "./types";

type CategoryKey = keyof Board;
const categories: { key: CategoryKey; label: string }[] = [
    { key: 'science', label: 'Science' },
    { key: 'math', label: 'Math' },
    { key: 'ict', label: 'Tech' },
];
export default function QuestionBoard({
    board,
    isBoardOne,
    openedTiles,
    onBoardChange,
    onQuestionOpen,
}: {
    board: Board;
    isBoardOne: boolean;
    openedTiles: Set<string>;
    onBoardChange: (board: Board) => void;
    onQuestionOpen: (question: string, tileId: string) => void;
}) {
    return (
        <div className="flex h-screen min-h-0 min-w-0 w-full flex-3 flex-col bg-blue-950 p-4">
            <div className="grid shrink-0 grid-cols-2 gap-1 pb-2">
                <button
                    className={`border px-4 py-2 text-lg font-bold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${isBoardOne ? 'border-orange-300 bg-orange-500 text-white' : 'border-blue-700 bg-blue-900 text-blue-200 hover:bg-blue-800'}`}
                    type="button"
                    onClick={() => onBoardChange(boardOne)}
                >
                    Board One
                </button>
                <button
                    className={`border px-4 py-2 text-lg font-bold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${isBoardOne ? 'border-blue-700 bg-blue-900 text-blue-200 hover:bg-blue-800' : 'border-orange-300 bg-orange-500 text-white'}`}
                    type="button"
                    onClick={() => onBoardChange(boardTwo)}
                >
                    Board Two
                </button>
            </div>
            <div className="grid min-h-0 min-w-0 w-full flex-1 grid-cols-3 grid-rows-6 grid-flow-col items-stretch gap-0">
                {categories.map(({ key, label }) => (
                    <Fragment key={key}>
                        <div className="flex flex-col items-center justify-center border border-blue-700 bg-blue-800 p-4 text-4xl font-bold uppercase tracking-wider text-white shadow-lg shadow-black/20">
                            <p>{label}</p>
                        </div>
                        {board[key].map((item, index) => {
                            const tileId = `${key}-${index}`;
                            return (
                                <QuestionTile
                                    key={tileId}
                                    item={item}
                                    tileId={tileId}
                                    isOpened={openedTiles.has(tileId)}
                                    onOpen={onQuestionOpen}
                                />
                            );
                        })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}