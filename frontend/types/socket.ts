/**
 * Represent a websocket game entity
 */
export interface SocketGame {
    id: string;
    quiz: any;
    started: Date | null;
    currentQuestion: number;
    questions: Array<SocketQuestion>;
    users: Array<string>;
    status: GameStatus;
    isOwner: boolean;
}

export interface SocketQuestion {
    title: string;
    answer: Array<string>;
    isCorrect: boolean | null;
    endAt: Date;
}

/**
 * Represent a websocket user joined game entity
 * Notifies that a user has joined a game
 */
export interface SocketUserJoinedGame {
    userId: string;
    gameId: string;
}


export interface SocketGameStarted {
    gameId: string;
    users: Array<string>;
    status: number;
    currentQuestion: number;
}

/**
 * This entity shouldn't exist
 */
export interface SocketPartialGame {
    id: string;
    quiz: {
        title: string;
        description: string;
        imageUrl: string;
        questions: []
    },
    users: Array<string>,
    isOwner: boolean
}

export enum GameStatus {
    Idle = 0,
    Running = 1,
    Stopped = 2,
    Ended = 3
}

export interface SocketQuestionStarted {
    answers: Array<string>;
    currentQuestion: number;
    endAt: Date;
    gameId: string;
    question: string;
}

export interface SocketQuestionEnded {
    gameId: string;
    answers: Array<SocketQuestion>;
}
