import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {View} from '../../components/Themed';
// @ts-ignore
import LedgerLinesImage from "../../assets/images/music/ledger-lines.png";

const AdvancedContent = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Card>
                    <Card.Cover
                        source={LedgerLinesImage}
                    />
                    <Card.Content>
                        <Title style={{fontWeight: 'bold'}}>Chord Inversions</Title>
                        <Paragraph>
                            Chord Inversions are another important thing to understand when learning music theory because most chords you’ll play within music will contain inversions, added tones up to a ninth, eleventh and thirteenth depending on the music you’re playing. However, before learning the meaning of those chords you need to understand the basic of chord inversions from their root position. An important thing to understand with Chord Inversion is that they each their own level of effect in terms of its pull towards a tension and release as the root position of a chord is the strongest in its effect. An Inversion of a chord is when same notes of the chord are rearranged in a different order for the root position. For example, the C Major Chord contains the notes C, E, G in its root position, the first inversion of the chord E, G, C, and the second inversion is G, E, C and they if you invert the chord again it goes back to the root position. This is what a chord inversion is at its most basis level and it’s important that you understand that before progressing onto more complex chord notations like Added Tone Chords, Dominant Sevenths, Diminished Sevenths and Augmented Chords.
                        </Paragraph>
                        <Title style={{fontWeight: 'bold'}}>Chord Functions (Consonance & Dissonance):</Title>
                        <Paragraph>
                            Every Chord you play has a purpose and functionality and they produce two primary effects, which is to create Consonance & Dissonance. This is the fundamental purpose in understanding music and it’s building feeling of excitement when their listening to the music and even though every chord can produce a dissonance sound depending on how their played often included an increase in the dynamics when playing. The major thing that creates a dissonance sound within a chord is the intervals used when playing. Putting things in simpler terms Consonance produces a harmonic sound and a Dissonance is a lack of harmony within the sound creating an unpleasant sound, which is seen as a form of tension.
                        </Paragraph>

                        <Title style={{fontWeight: 'bold'}}>Special Chords:</Title>
                        <Title style={{fontWeight: 'bold'}}>Dominant 7th:</Title>

                        <Paragraph>
                            Dominant 7th chords are a chord that are contain the seven-note built from the fifth degree of the chord, so in the key of G Major, the notes are G, B, D, F. This chord has a very special purpose in the fact that it’s has extremely rich sounding voice and contains a level of more tension within the sound and the reason for that is because it contains the Tritone interval within the chord. This interval is found within the third and seven degrees of the chord, which is the B and F. As expected with chords they have their own inversions where the same notes are arranged in a different order, and this help with voice leading when it comes to writing music because there wouldn’t be a noticeable difference how harmonious the music would sound.
                        </Paragraph>

                        <Title style={{fontWeight: 'bold'}}>Diminished 7th:</Title>

                        <Paragraph>
                            Diminished 7th chords are like seventh chords where the major different with them is that the third, fifth and seventh degree of the chord is diminished. In the key of C Major, the notes would be C, E♭, G♭ and B♭♭. Once again, the Tritone interval is found within the first and fifth degrees of the chord were playing those two intervals on its own would be considered a Diminished fifth which is that the tritone interval consists of.
                        </Paragraph>

                        <Title style={{fontWeight: 'bold'}}>Neapolitan 6th:</Title>

                        <Paragraph>
                            Neapolitan 6th chords are another chord that’s commonly used within classical music and its often used within a its first inversion and the purpose of the chord is that it normally appears before Dominant chord substituting the Subdominant degree of a chord. As a result, the sound produced features something that’s harmonically outside the key centre, which they used correctly produces an interesting sound adding flavour to the music. For example, the Subdominant in the key of C Major is F Major, which has the notes D♭, F and A♭ and that in its first inversion is F, A♭ and D♭. This unexpected chord progression is what makes the music sound so interesting because it’s not using the expected chord progression back to the tonic of the key.
                        </Paragraph>

                        <Title style={{fontWeight: 'bold'}}>Tristian Chord:</Title>

                        <Paragraph>
                            The Tristian Chord is a chord, which its name comes from the opera Tristan und Isolde by Richard Wagner in 1865. It consists of Augmented Fourth, Augmented Sixth and Augmented Ninth above the bass note and it the case of its use within the opera, it has the notes F, B, D#, and G#. The chord has also been referred to a Dominant Seventh flat five chord as it’s equivalent. What made this chord special within music is the context in which it was used as it was used within opera at the time where there wasn’t such a level of dramatic power and tonal ambiguity within that type of music, so it created a sensation in music during its premier at the National theatre in Munich. Also, the fact that music was within the period of Romanticism where there was a general view of dramatism, nationalism and strong portrayal of emotions and the context of an opera about two lovers, it really added to this use of the chord.
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

export default AdvancedContent;
