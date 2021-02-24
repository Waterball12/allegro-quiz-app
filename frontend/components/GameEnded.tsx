import React from 'react';
import {View} from "react-native";
import {Text} from "react-native-elements";
import {List} from "react-native-paper";

export interface GameEndedProps {
    results: any;
    myId: string;
}

const GameEnded = (props: GameEndedProps) => {
    const {
        results,
        myId
    } = props;

    return (
        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <Text h1 style={{textAlign: 'center'}}>
                Game ended
            </Text>
            {results.map((player: {id: string, score: number}, key: number) => (
                <List.Item
                    title={player.id}
                    description={`Score: ${player.score}`}
                    left={props => <List.Icon {...props} icon={myId == player.id ? "account-check" : "account"} />}
                    style={{backgroundColor: myId === player.id ? '#adffc3' : undefined}}
                    key={key}
                />
            ))}
        </View>
    );
};

export default GameEnded;
