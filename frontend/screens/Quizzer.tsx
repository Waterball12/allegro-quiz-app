import React, {useEffect, useState} from 'react';
import {HttpTransportType, HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useRoute} from "@react-navigation/native";
import Minimalistic from "../layouts/Minimalistic";
import StartGame from "../components/StartGame";
import QuestionPanel from "../components/QuestionPanel";
import {
    GameStatus,
    SocketGame,
    SocketGameStarted,
    SocketPartialGame,
    SocketQuestion,
    SocketQuestionEnded,
    SocketQuestionStarted,
    SocketUserJoinedGame
} from "../types/socket";
import GameEnded from "../components/GameEnded";

const Quizzer = () => {
    const [loading, setLoading] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState<Array<SocketQuestion> | undefined>(undefined);
    const [error, setError] = useState(false);
    const route = useRoute();
    const {roomId}:any = route.params ?? {};
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
    const [results, setResults] = useState<any>([]);
    const [game, setGame] = useState<SocketGame>({} as any);
    const [myId, setMyId] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        const connection = new HubConnectionBuilder()
            .withUrl("http://165.227.254.227/gateway?roomId=" + roomId, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();
        connection.serverTimeoutInMilliseconds = 1200000;
        connection.start()
            .then(() => {
                setLoading(false);
            });

        connection.onclose(() => {
            setError(true);
        });

        connection.on("Connected", (e: SocketPartialGame) => {
            const game: SocketGame = {
                id: e.id,
                quiz: null,
                started: null,
                currentQuestion: 0,
                users: e.users,
                status: 0,
                isOwner: e.isOwner,
                questions: e.quiz.questions
            };
            setGame(game);
        })

        connection.on("UserJoinedGame", (e: SocketUserJoinedGame) => {
            setGame(prev => ({
                ...prev,
                users: [...prev.users, e.userId]
            } as SocketGame))
        })

        connection.on("GameStarted", (e: SocketGameStarted) => {
            setGame(prev => ({
                ...prev,
                currentQuestion: e.currentQuestion,
                users: e.users,
                status: e.status,
                started: null
            }));
        })

        connection.on("Ready", (myId: string) => {
            setMyId(myId);
        })

        connection.on("QuestionReceived", (e: SocketQuestionStarted) => {
            setCorrectAnswer(undefined);
            setGame(prev => ({
                ...prev,
                currentQuestion: e.currentQuestion,
                questions: [...prev.questions, {
                    title: e.question,
                    answer: e.answers,
                    endAt: e.endAt,
                    isCorrect: null
                }]
            }));
        })

        connection.on("QuestionEnded", (e: SocketQuestionEnded) => {
            setCorrectAnswer(e.answers);
        })

        connection.on("GameEnded", (e: SocketGame) => {
            setGame(prev => ({
                ...prev,
                status: e.status
            }));
            setResults(e.users as any);
        })

        setHubConnection(connection);
    }, []);

    const handleStartGame = () => {
        if (hubConnection != null) {
            return hubConnection.send("StartGame", roomId);
        }
    }
    const handleNextQuestion = () => {
        if (hubConnection != null) {
            return hubConnection.send("NextQuestion", roomId);
        }
    }
    const submitAnswer = (answer: string) => {
        if (hubConnection != null) {
            return hubConnection.send("SubmitAnswer", roomId, answer);
        }
    }

    if (loading) {
        return (
            <div>Loading..</div>
        )
    }

    if (game?.status === GameStatus.Ended) {
        return (
            <Minimalistic>
                <GameEnded results={results} myId={myId} />
            </Minimalistic>
        )
    }

    if (error) {
        return (
            <Minimalistic>
                <div>Encountered error...</div>
            </Minimalistic>
        )
    }

    if (game?.status == GameStatus.Running) {
        return (
            <QuestionPanel
                onNextQuestion={handleNextQuestion}
                game={game}
                correctAnswer={correctAnswer}
                onSubmit={submitAnswer}
            />
        )
    }

    return (
        <StartGame
            game={game}
            onGameStart={handleStartGame}
        />
    );
};

export default Quizzer;
