"use client"
import Popup from './popup';
import { boardOne, boardTwo } from './questions';
import { useCallback, useEffect, useReducer, useState } from 'react';
import TeamCard from './team_card';
import QuestionBoard from './board';
import type { Board, ScoreOperation, Team } from './types';

type TeamAction =
  | { type: 'rename'; teamId: number; name: string }
  | { type: 'changeScore'; teamId: number; amount: number };

function createInitialTeams(): Team[] {
  return Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Team ${index + 1}`,
    score: 0,
  }));
}

function teamsReducer(teams: Team[], action: TeamAction): Team[] {
  return teams.map((team) => {
    if (team.id !== action.teamId) {
      return team;
    }

    if (action.type === 'rename') {
      return { ...team, name: action.name };
    }

    return { ...team, score: team.score + action.amount };
  });
}

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState<Board>(boardOne);
  const [activeQuestion, setActiveQuestion] = useState<{ id: string; question: string } | null>(null);
  const [openedTiles, setOpenedTiles] = useState<Set<string>>(new Set());
  const [teams, dispatchTeams] = useReducer(teamsReducer, undefined, createInitialTeams);
  const [scoreInputs, setScoreInputs] = useState<Record<number, string>>({});

  const handleQuestionOpen = (question: string, tileId: string) => {
    setActiveQuestion({ id: tileId, question });
  };

  const selectBoard = (board: Board) => {
    setCurrentBoard(board);
    setOpenedTiles(new Set());
    setActiveQuestion(null);
  };

  const closePopup = useCallback(() => {
    if (activeQuestion) {
      setOpenedTiles((tiles) => new Set(tiles).add(activeQuestion.id));
    }
    setActiveQuestion(null);
  }, [activeQuestion]);

  const updateTeamName = (teamId: number, name: string) => {
    dispatchTeams({ type: 'rename', teamId, name });
  };

  const updateScoreInput = (teamId: number, value: string) => {
    setScoreInputs((inputs) => ({ ...inputs, [teamId]: value }));
  };

  const changeTeamScore = (teamId: number, operation: ScoreOperation) => {
    const amount = Number(scoreInputs[teamId]);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    dispatchTeams({
      type: 'changeScore',
      teamId,
      amount: operation === 'add' ? amount : -amount,
    });
    updateScoreInput(teamId, '');
  };

  useEffect(() => {
    if (!activeQuestion) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQuestion, closePopup]);

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden bg-blue-950 font-sans">
      <QuestionBoard
        board={currentBoard}
        isBoardOne={currentBoard === boardOne}
        openedTiles={openedTiles}
        onBoardChange={selectBoard}
        onQuestionOpen={handleQuestionOpen}
      />
      <div className="flex h-screen min-h-0 min-w-0 w-[40%] flex-col gap-2 overflow-hidden bg-blue-950 p-2">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            scoreInput={scoreInputs[team.id] ?? ''}
            onNameChange={updateTeamName}
            onScoreInputChange={updateScoreInput}
            onScoreChange={changeTeamScore}
          />
        ))}
      </div>
      {activeQuestion && (
        <Popup
          question={activeQuestion.question}
          onClose={closePopup}
        />)
      }
    </div>
  );
}






