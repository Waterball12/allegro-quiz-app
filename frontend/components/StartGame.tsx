import React from 'react';
import {View} from "react-native";
import {List, Subheading, Surface, Title, Button} from "react-native-paper";
import {SocketGame} from "../types/socket";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

export interface StartGameProps {
    game: SocketGame;
    onGameStart: () => void;
}

const names = ['Ivan Giambattista', 'Ruggiero Ulderico', 'Orsola Fabio', 'Sisto Gioacchino', 'Rosaria Jessica'];

const StartGame = (props: StartGameProps) => {
    const {
        game,
        onGameStart
    } = props;

    return (
        <View style={{width: '100%', height: '100%', position: 'relative'}}>
            <View style={{flex: 1, backgroundColor: Colors.light.primaryLight}}>
                <Surface style={{marginTop: 8, marginBottom: 8, marginLeft: 16, marginRight: 16, backgroundColor: Colors.light.primaryButton, borderRadius: Layout.borderRadius}}>
                    <Title style={{textAlign: 'center', color: '#fff'}}>Connected to room {game.id}</Title>
                    <Subheading style={{textAlign: 'center', color: '#fff'}}>Connected users: {game?.users?.length}</Subheading>
                </Surface>
                {game?.isOwner ? (
                    <div style={{padding: '16px'}}>
                        <Button
                            onPress={onGameStart}
                            style={{backgroundColor: Colors.light.primaryButton, paddingTop: 16, paddingBottom: 16, borderRadius: Layout.borderRadius}}
                            color="#fff"
                        >
                            Start game
                        </Button>
                    </div>
                ) : null}
                {names.slice(0, game?.users?.length ?? 0).map((usr, key) => (
                    <List.Item
                        title={usr}
                        key={key}
                        titleStyle={{color: '#fff'}}
                        style={{backgroundColor: Colors.light.primaryButton, borderRadius: Layout.borderRadius, marginLeft: 16, marginRight: 16, marginTop: 8}}
                        left={props => <List.Icon {...props} color="#fff" icon="account" />}
                        right={props => <List.Icon {...props} color={Colors.light.primaryLight} icon="check" />}
                    />
                ))}
                {game?.users?.length > 5 && <Subheading style={{textAlign: 'center'}}>{game?.users?.length - 5} more users are connected</Subheading>}
            </View>
        </View>
    );
};

export default StartGame;
