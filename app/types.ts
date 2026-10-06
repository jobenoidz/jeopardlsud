import { boardOne } from './questions';

export type Board = typeof boardOne;
export type CategoryKey = keyof Board;
export type Question = Board[CategoryKey][number];

export type Team = {
    id: number;
    name: string;
    score: number;
};

export type ScoreOperation = 'add' | 'subtract';
