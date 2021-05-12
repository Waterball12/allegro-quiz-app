export interface Quiz {
    id: number; // TODO change to string
}

export interface CreateQuizParams {
    title: string;
    description: string;
    question: Array<QuestionParams>;
}

export interface QuestionParams {
    title: string;
    timeout: number;
    answer: Array<AnswerParams>;
}

export interface AnswerParams {
    isCorrect: string;
    description: string;
}