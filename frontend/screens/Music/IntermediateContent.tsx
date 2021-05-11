import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {View} from '../../components/Themed';
// @ts-ignore
import LedgerLinesImage from "../../assets/images/music/diatonic-scale.png";

const IntermediateContent = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Card>
                    <Card.Cover
                        source={LedgerLinesImage}
                    />
                    <Card.Content>
                        <Title style={{fontWeight: 'bold'}}>Diatonic Scale/12-Tones & Semitones</Title>
                        <Paragraph>
                            The Diatonic Scale is the most used scales within western harmony, and it’s comprised of five tones and two semitones as indicated in this example that’s shown within. This level of tonal relationship is consistent throughout all major and minor scales and the reason for this is because of the type of modes that’s used within traditional classical music, which is the musical scale. The Major and Minor scales are also referred to as the Ionian (Major) and Aeolian (Minor).
                            There are eight-degree relationships with the eight notes on a scale which are the Tonic (Keynote), Supertonic, Mediant, Subdominant, Dominant, Submediant, Leading Note and Tonic (Keynote).
                        </Paragraph>
                        <Title style={{fontWeight: 'bold'}}>Major & Minor Scales (Harmonic and Melodic):</Title>
                        <Paragraph>
                            The (Major) and Aeolian (Minor) Scales are the most used scales within classical music, and they are first two musical modes you learn when reading about music. It’s where the basis of music theory is taught, and these two scales consist of seven notes with the eighth note being the tonic note of the scale itself.  The most important thing about scales is that they each that their own key signature containing the number of sharps or flats they each have. For example, the C Major scale doesn’t have any sharps or flats and G Major has one sharp and that’s F#. An important part to Minor Scales is understanding the two types they have which is Harmonic and Melodic
                        </Paragraph>
                        <Paragraph>
                            The Harmonic scale is where the seventh note or degree of the scale is raised one semitone higher ascending and descending. For example, if we take the key of C Minor in its natural scale consists of Bb, Eb and Ab, the seventh degree of that key is Bb and since that degree is raised one semitone it becomes B natural. There’s an interesting key relationship between C Minor and its relative major key Eb Major as it contains the same notes, and this allows for a modulating between these two keys through its common tone.
                        </Paragraph>
                        <Title style={{fontWeight: 'bold'}}>
                            The Circle of Fifths/Fourths
                        </Title>
                        <Paragraph>
                            The Circle of Fifths is the most important concept to understand when it comes to music theory because it helps you to understand the relationship Major and Minor keys have together and that’s helps a lot when composing music especially when modulating to different keys. If we look at the Circle of Fifths, it’s basically the idea that the fifth degree of a Major scale determines list of sharps within the scales. For example, C Major has no sharps or flats, and the fifth degree of that scale is G, which means G Major has one sharp and that is F#. The fifth degree of G Major is D, and that key has two sharps F# and C#. this circle repeats and more sharps are included at sharps
                        </Paragraph>
                        <Paragraph>
                            The concept of the Circle of Fourths is the same as the Circle of Fifths where the only difference is that it’s used for determining how many flats are in the keys. For example, as well known the C major scale doesn’t contain any sharps or flats and when you go to the fourth degree of the scale, which is F that has one flat which is Bb. The fourth degree of the F Major scale is Bb and that contains scale has two flats, which is Bb and Eb and the process is repeated until it covers all the keys that contain all the flats and sharps used.
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

export default IntermediateContent;
