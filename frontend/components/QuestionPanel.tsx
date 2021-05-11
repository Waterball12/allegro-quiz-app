import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {Card, Text} from "react-native-elements";
import RemainingTime from "./RemainingTime";
import {Button, Surface, Title} from "react-native-paper";
import {SocketGame, SocketQuestion} from "../types/socket";
import dayjs from "dayjs";

export interface QuestionPanelProps {
    game: SocketGame;
    onNextQuestion: () => void;
    correctAnswer: Array<SocketQuestion> | undefined;
    onSubmit: (answer: string) => void;
}

const QuestionPanel = (props: QuestionPanelProps) => {
    const {
        onNextQuestion,
        game,
        correctAnswer,
        onSubmit
    } = props;

    const [question, setQuestion] = useState<SocketQuestion | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [showRemaining, setRemaining] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string | undefined>(undefined);

    useEffect(() => {
        const question = game.questions[game.currentQuestion - 1];

        if (question) {
            setQuestion(question);
            setDisabled(false);
            setUserAnswer(undefined);
            const remainingTime = dayjs(question.endAt).subtract(Date.now());
            setRemainingTime(remainingTime.second() - 1);
            setRemaining(true);
        }

    }, [game.questions[game.currentQuestion - 1]])

    const handleEndRemaining = () => {
        setDisabled(true);
        setRemaining(false);
    }

    const answerQuestion = (answer: string) => {
        setUserAnswer(answer);
        onSubmit(answer);
    }

    return (
        <View style={{width: '100%', height: '100%', position: 'relative'}}>
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Title style={{textAlign: 'center'}}>Game started {game?.id}</Title>
                <Card>
                    <Card.Title>Question {game?.questions.length}</Card.Title>
                    <Card.Divider/>
                    <Text>
                        {question ?  question.title : "Loading..."}
                    </Text>
                </Card>
                <Card>
                    {question?.answer.map((answer, key) => (
                        <Surface
                            style={{padding: '16px', marginTop: '16px',
                                backgroundColor: (correctAnswer ? (correctAnswer[key]?.isCorrect ? "#d1ffd2" : "#808080") :
                                    (userAnswer === answer ? "#c8c8c8" : undefined))}}
                            key={key} >
                            <Button
                                icon={(correctAnswer ? (correctAnswer[key]?.isCorrect ? "check" : "close") : undefined)}
                                onPress={() => answerQuestion(answer)}
                                disabled={disabled || (userAnswer !== undefined)}
                            >
                                {answer}
                            </Button>
                        </Surface>
                    )) ?? null}
                </Card>
                {showRemaining ? (
                    <Text h4 style={{textAlign: 'center', color: 'red'}}>
                        <RemainingTime ms={remainingTime ?? 15} onEnd={handleEndRemaining} />
                    </Text>
                ) : (game.isOwner ? (
                    <Button style={{marginTop: '16px'}}  onPress={onNextQuestion}>
                        Next question
                    </Button>
                ) : null) }
            </View>
        </View>
    );
};

export default QuestionPanel;
