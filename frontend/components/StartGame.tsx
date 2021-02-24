import React from 'react';
import Minimalistic from "../layouts/Minimalistic";
import {View} from "react-native";
import {Button} from "react-native-elements";
import {List, Subheading, Surface, Title} from "react-native-paper";
import {SocketGame} from "../types/socket";

export interface StartGameProps {
    game: SocketGame;
    onGameStart: () => void;
}

const StartGame = (props: StartGameProps) => {
    const {
        game,
        onGameStart
    } = props;

    return (
        <Minimalistic>
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Surface style={{marginBottom: '16px'}}>
                    <Title style={{textAlign: 'center'}}>Connected to room {game.id}</Title>
                    <Subheading style={{textAlign: 'center'}}>Connected users: {game?.users?.length}</Subheading>
                </Surface>
                {game?.isOwner ? (
                    <div style={{padding: '16px'}}>
                        <Button title="Start game" onPress={onGameStart} />
                    </div>
                ) : null}
                {game?.users?.slice(0, 3).map((usr, key) => (
                    <List.Item
                        title={usr}
                        key={key}
                        left={props => <List.Icon {...props} icon="account" />}
                    />
                ))}
                {game?.users?.length > 3 && <Subheading style={{textAlign: 'center'}}>{game?.users?.length - 3} more users are connected</Subheading>}
            </View>
        </Minimalistic>
    );
};

export default StartGame;
