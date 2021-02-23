import React from 'react';
import Minimalistic from "../layouts/Minimalistic";
import {View} from "react-native";
import {Card, Text} from "react-native-elements";
import RemainingTime from "./RemainingTime";
import {SocketQuestion} from "../types/Quiz";
import {Button, Surface, Title} from "react-native-paper";

export interface QuestionPanelProps {
    roomId: number;
    questions: Array<SocketQuestion>;
    showRemaining: boolean;
    onEndRemaining: () => void;
    connectedUsers: Array<any>;
    onNextQuestion: () => void;
    questionEnded: boolean;
    correctAnswer: Array<string>;
}

const QuestionPanel = ({roomId, questions, connectedUsers, onEndRemaining, showRemaining, onNextQuestion, questionEnded, correctAnswer}: QuestionPanelProps) => {
    const lastQuestion =  questions[questions.length - 1];
    return (
        <Minimalistic>
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Title style={{textAlign: 'center'}}>Game started {roomId}</Title>
                <Card>
                    <Card.Title>Question {questions.length}</Card.Title>
                    <Card.Divider/>
                    <Text>
                        {questions.length <= 0 ? "Loading..." : lastQuestion.question}
                    </Text>
                </Card>
                <Card>
                    {lastQuestion?.answers.map((answer, key) => (
                        <Surface style={{padding: '16px', marginTop: '16px', backgroundColor: (questionEnded ? (correctAnswer.some(y => y === answer) ? '#d1ffd2' : '#808080') : 'inherit') }} key={key} >
                            <Button icon={(questionEnded ? (correctAnswer.some(y => y === answer) ? 'check' : 'close') : undefined)} onPress={() => console.log('Pressed')} disabled={questionEnded}>
                                {answer}
                            </Button>
                        </Surface>
                    )) ?? null}
                </Card>
                {showRemaining ? (
                    <Text h4 style={{textAlign: 'center', color: 'red'}}>
                        <RemainingTime ms={15} onEnd={onEndRemaining} />
                    </Text>
                ) : <Button style={{marginTop: '16px'}}  onPress={onNextQuestion}>
                    Next question
                </Button>}
                {/*<Text style={{marginTop: '30px', textAlign: 'center'}}>*/}
                {/*    Connected users: {connectedUsers.length}*/}
                {/*</Text>*/}
                {/*{connectedUsers.map((x, key) => (*/}
                {/*    <Text key={key} style={{paddingTop: '5px'}}>*/}
                {/*        {x}*/}
                {/*    </Text>*/}
                {/*))}*/}
            </View>
        </Minimalistic>
    );
};

export default QuestionPanel;
