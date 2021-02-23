export interface Quiz {
    id: number; // TODO change to string
}

export interface SocketQuestion {
    /**
     * The question received either through game start event or through next question gateway command
     */
    question: string;
    /**
     * Answers without correct
     */
    answers: Array<string>;
}
