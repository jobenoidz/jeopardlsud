
import type { ScoreOperation, Team } from './types';

export default function TeamCard({
    team,
    scoreInput,
    onNameChange,
    onScoreInputChange,
    onScoreChange,
}: {
    team: Team;
    scoreInput: string;
    onNameChange: (teamId: number, name: string) => void;
    onScoreInputChange: (teamId: number, value: string) => void;
    onScoreChange: (teamId: number, operation: ScoreOperation) => void;
}) {
    return (
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-[4fr_3fr] items-center gap-2 overflow-hidden border border-blue-800 bg-blue-900 p-2 text-white shadow-lg shadow-black/20">
            <div className="flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden">
                <label className="sr-only" htmlFor={`team-${team.id}`}>Team Name</label>
                <input
                    className="h-full min-w-0 w-full border border-blue-800 bg-blue-950 px-2 py-2 text-center text-4xl outline-none transition-colors placeholder:text-blue-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-400"
                    id={`team-${team.id}`}
                    value={team.name}
                    onChange={(event) => onNameChange(team.id, event.target.value)}
                />
            </div>
            <div className="grid h-full min-h-0 min-w-0 grid-rows-[2fr_1fr] gap-1">
                <div className="flex min-h-0 flex-col items-center justify-center gap-0 border border-blue-800 bg-blue-950">
                    <span className="text-sm uppercase tracking-widest text-blue-200">Score</span>
                    <span className="text-4xl">{team.score}</span>
                </div>
                <div className="grid min-h-0 grid-cols-[1fr_3fr_1fr] gap-1">
                    <button className="border border-orange-300/30 bg-orange-500 text-xl transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300" type="button" aria-label={`Subtract points from ${team.name}`} onClick={() => onScoreChange(team.id, 'subtract')}>
                        -
                    </button>
                    <input
                        className="min-h-0 min-w-0 border border-blue-800 bg-blue-950 px-2 py-1 text-center text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-400"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Points"
                        aria-label={`Points for ${team.name}`}
                        value={scoreInput}
                        onChange={(event) => onScoreInputChange(team.id, event.target.value)}
                    />
                    <button className="border border-green-300/30 bg-green-600 text-xl transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" type="button" aria-label={`Add points to ${team.name}`} onClick={() => onScoreChange(team.id, 'add')}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
