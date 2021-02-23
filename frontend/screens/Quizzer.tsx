import React, {useEffect, useState} from 'react';
import {HttpTransportType, HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useRoute} from "@react-navigation/native";
import {View} from "react-native";
import {Button, Card, Image, Text} from "react-native-elements";
import RemainingTime from "../components/RemainingTime";
import Minimalistic from "../layouts/Minimalistic";
import StartGame from "../components/StartGame";
import QuestionPanel from "../components/QuestionPanel";
import {SocketQuestion} from "../types/Quiz";

const Quizzer = () => {
    const [loading, setLoading] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState<Array<string>>([]);
    const [questions, setQuestions] = useState<Array<SocketQuestion>>([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [questionEnded, setQuestionEnded] = useState(false);
    const [showRemaining, setRemaining] = useState(false);
    const [error, setError] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const route = useRoute();
    const {roomId}:any = route.params ?? {};
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        setLoading(true);
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:4900/gateway?roomId=" + roomId, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();
        connection.serverTimeoutInMilliseconds = 1200000;
        connection.start()
            .then(r => {
                setLoading(false);
            });

        connection.onclose(() => {
            setError(true);
        });

        connection.on("GameStarted", ({gameId, users}) => {
            setGameStarted(true);
            setConnectedUsers(users);
        })

        connection.on("QuestionReceived", (socketQuestion: SocketQuestion) => {
            setQuestionEnded(false);
            setQuestions(prev => [...prev, {...socketQuestion}]);
            setRemaining(true);
        })

        connection.on("GameEnded", ({gameId}) => {
            setGameEnded(true);
        })

        connection.on("QuestionEnded", ({correctAnswer}) => {
            setCorrectAnswer(correctAnswer);
            setQuestionEnded(true);
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
    if (loading) {
        return (
            <div>Loading..</div>
        )
    }

    if (gameEnded) {
        return (
            <Minimalistic>
                <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                    <Text h1 style={{textAlign: 'center'}}>
                        Game ended
                    </Text>
                </View>
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

    if (gameStarted) {
        return (
            <QuestionPanel
                onEndRemaining={() => setRemaining(false)}
                connectedUsers={connectedUsers}
                questions={questions}
                roomId={roomId}
                showRemaining={showRemaining}
                onNextQuestion={handleNextQuestion}
                questionEnded={questionEnded}
                correctAnswer={correctAnswer}
            />
        )
    }

    return (
        <StartGame roomId={roomId} onGameStart={handleStartGame} />
    );

};

export default Quizzer;
