import React from 'react';
import Minimalistic from "../layouts/Minimalistic";
import {View} from "react-native";
import {Button, Text} from "react-native-elements";
import {Surface, Title} from "react-native-paper";

export interface StartGameProps {
    roomId: number;
    onGameStart: () => void;
}

const StartGame = ({roomId, onGameStart}: StartGameProps) => {
    return (
        <Minimalistic>
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Surface style={{marginBottom: '16px'}}>
                    <Title style={{textAlign: 'center'}}>Connected to room {roomId}</Title>
                </Surface>
                <div style={{padding: '16px'}}>
                    <Button title="Start game" onPress={onGameStart} />
                </div>
            </View>
        </Minimalistic>
    );
};

export default StartGame;
