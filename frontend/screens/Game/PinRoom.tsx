import React, {useState} from 'react';
import {Image, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from "axios";
import {Quiz} from "../../types/Quiz";
import {View} from "react-native";
import Colors from "../../constants/Colors";
import {Button, TextInput} from "react-native-paper";
import Layout from "../../constants/Layout";
// @ts-ignore
import BgDesignImage from "../../assets/images/bg_design.png";

const PinRoom = () => {
    const [roomId, setRoomId] = useState<string>('');
    const navigation = useNavigation();

    const handleClick = () => {
        axios.get<Quiz>('http://api.allegroquiz.tech/test')
            .then((response) => {
                navigation.navigate('Quizzer', {
                    roomId: response.data.id
                });
            })
            .catch(() => {
                console.error("Failed to send request")
            })
    }

    const handleJoinGame = () => {
        if (roomId.length <= 0) return;

        navigation.navigate('Quizzer', {
            roomId: roomId
        });
    }

    const handleTextChange = (value: string) => {
        setRoomId(value);
    }

    return (
        <View style={{flex: 1, backgroundColor: Colors.light.primaryLight}}>
            <View style={{marginTop: '46px'}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: Colors.light.primary}} h1>Allegro quiz</Text>
            </View>
            <View style={{marginTop: '36px', paddingLeft: 30, paddingRight: 30}}>
                <TextInput
                    mode="flat"
                    style={{backgroundColor: '#fff', borderRadius: Layout.borderRadius}}
                    placeholder="Game Pin"
                    onChangeText={handleTextChange}
                />
            </View>
            <View style={{marginTop: '16px', paddingLeft: 30, paddingRight: 30}}>
                <Button
                    onPress={handleJoinGame}
                    style={{backgroundColor: Colors.light.primaryButton, paddingTop: 16, paddingBottom: 16, borderRadius: Layout.borderRadius}}
                    color="#fff"
                >
                    Join room
                </Button>
            </View>
            <View style={{marginTop: '16px'}}>
                <Text h4 style={{textAlign: 'center', fontWeight: 'bold', color: Colors.light.primary}}>
                    Or create new game
                </Text>
            </View>
            <View style={{marginTop: '16px', paddingLeft: 30, paddingRight: 30}}>
                <Button
                    onPress={handleClick}
                    style={{backgroundColor: Colors.light.primaryButton, paddingTop: 16, paddingBottom: 16, borderRadius: Layout.borderRadius}}
                    color="#fff"
                >
                    New Game
                </Button>
            </View>
            <View style={{marginTop: '16px', paddingLeft: 30, paddingRight: 30}}>
                <Image
                    source={BgDesignImage}
                    style={{ width: 262, height: 205 }}
                />
            </View>
        </View>
    );
};

export default PinRoom;
