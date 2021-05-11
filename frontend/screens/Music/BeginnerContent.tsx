import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {View} from '../../components/Themed';
// @ts-ignore
import LedgerLinesImage from "../../assets/images/music/ledger-lines.png";

const BeginnerContent = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Card>
                    <Card.Cover
                        source={LedgerLinesImage}
                    />
                    <Card.Content>
                        <Paragraph>
                            There are seven musical notes that are used in music theory and they are A, B, C, D, E, F and G, these are the only notes that in music notation.
                            They are used for two different areas and they are for determining the tone, pitch and duration of the notes indicated on the stave.
                            Each note has its own sound of tone that is completely different from any other notes and its pitch is based on where it is positioned on the stave.
                            Musical Notes and Stave go hand in hand with each other because that’s where the notes are written on for the individual to read so they can understand what
                            their playing. For example, the Musical Stave consists of five lines where the beginning note is Middle C, and it is positioned underneath the Musical Stave
                        </Paragraph>
                        <Paragraph>
                            However, the principle of the concept stays the same. is used for indicating what note is written and the pitch of it. The notes move up the Stave then the pitch
                            is raised and if it moves down then it’s lowered. For example, the note Middle C is positioned underneath the stave with a leger line within the note indicating
                            its position in relation to the Musical Stave.
                        </Paragraph>
                        <Paragraph>
                            Leger Lines are additional stave lines for when the notes pitch is higher or lower that’s what can be notated on the Musical Stave, so the leger lines are drawn either within,
                            above or below relative to the notes name itself.
                        </Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default BeginnerContent;
