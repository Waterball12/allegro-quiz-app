import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Avatar, Card, Paragraph, Title, TouchableRipple} from 'react-native-paper';

import {View} from '../components/Themed';
import Colors from '../constants/Colors';
// @ts-ignore
import BeginnerImage from "../assets/images/music/ledger-lines.png";
// @ts-ignore
import IntermediateImage from "../assets/images/music/diatonic-scale.png";
// @ts-ignore
import AdvancedImage from "../assets/images/music/circle-fifth.png";
import {useLinkProps} from "@react-navigation/native";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="compass" />



const BeginnerContent = () => {

    const {onPress: toBeginner} = useLinkProps({to: '/beginner'});
    const {onPress: toIntermediate} = useLinkProps({to: '/intermediate'});
    const {onPress: toAdvanced} = useLinkProps({to: '/advanced'});

    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <Card.Title title="Discover" left={LeftContent} />
                <View style={styles.cardContainer}>
                    <TouchableRipple
                        onPress={toBeginner}
                        onPressOut={toBeginner}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <Card style={styles.card}>
                            <Card.Content>
                                <Title>Beginner</Title>
                                <Paragraph style={{color: '#9e9e9e'}}>Musical Notes, Stave and Leger Lines</Paragraph>
                            </Card.Content>
                            <Card.Cover style={styles.cover} source={BeginnerImage} />
                        </Card>
                    </TouchableRipple>
                </View>

                <View style={styles.cardContainer}>
                    <TouchableRipple
                        onPress={toIntermediate}
                        onPressOut={toIntermediate}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <Card style={styles.card}>
                            <Card.Content>
                                <Title>Intermediate</Title>
                                <Paragraph style={{color: '#9e9e9e'}}>Diatonic Scale/12-Tones & Semitones</Paragraph>
                            </Card.Content>
                            <Card.Cover style={styles.cover} source={IntermediateImage} />
                        </Card>
                    </TouchableRipple>
                </View>

                <View style={styles.cardContainer}>
                    <TouchableRipple
                        onPress={toAdvanced}
                        onPressOut={toAdvanced}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <Card style={styles.card} elevation={0}>
                            <Card.Content>
                                <Title>Advanced</Title>
                                <Paragraph style={{color: '#9e9e9e'}}>Chord Inversions</Paragraph>
                            </Card.Content>
                            <Card.Cover style={styles.cover} source={AdvancedImage} />
                        </Card>
                    </TouchableRipple>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background
    },
    subContainer: {
        width: '100%',
        position: 'relative'
    },
    card: {
        borderRadius: 10,
        boxShadow: 'rgb(0 0 0 / 30%) 0px 8px 40px -12px',
        marginTop: '10px'
    },
    cardContainer: {
        padding: 20
    },
    cover: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#fff'
    }
});

export default BeginnerContent;
