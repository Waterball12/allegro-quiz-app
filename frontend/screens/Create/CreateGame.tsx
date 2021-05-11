import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";
import {Button, Card, Surface, TextInput, Title} from "react-native-paper";
// @ts-ignore
import BeginnerImage from "../../assets/images/music/ledger-lines.png";
import {Ionicons} from "@expo/vector-icons";

const CreateGame = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <View style={styles.cardContainer}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <Ionicons name="ios-image-outline" />
                            <Title>Add a cover image</Title>
                        </Card.Content>
                    </Card>
                </View>

                <View style={{padding: '20px'}}>
                    <Surface>
                        <TextInput
                            label="Enter Title"
                            value=""
                            mode="flat"
                            onChangeText={text => null}
                        />
                    </Surface>
                </View>

                <View style={{padding: '20px'}}>
                    <Surface>
                        <TextInput
                            label="Enter description"
                            value=""
                            mode="flat"
                            onChangeText={text => null}
                        />
                    </Surface>
                </View>

                <View style={styles.cardContainerTwo}>
                    <Card style={styles.cardTwo}>
                        <Card.Content style={styles.cardContentTwo}>
                            <Card.Title title="Add a question" right={(props) => <Ionicons name="ios-add" {...props} />} />
                        </Card.Content>
                    </Card>
                </View>

            </ScrollView>
            <View style={{display: 'flex', alignItems: 'flex-end', width: '100%', position: 'relative', padding: 10}}>
                <Button mode="contained">
                    Save
                </Button>
            </View>
        </View>
    );
};

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
        marginTop: '10px',
        minHeight: '200px',
        display: 'flex',
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTwo: {
        borderRadius: 10,
        boxShadow: 'rgb(0 0 0 / 30%) 0px 8px 40px -12px',
        marginTop: '10px',
        minHeight: '150px',
        display: 'flex',
        position: 'relative',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    cardContainer: {
        padding: 20
    },
    cardContainerTwo: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
    },
    cover: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    cardContent: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    cardContentTwo: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        padding: 0
    },
    cardContentQuestion: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});

export default CreateGame;