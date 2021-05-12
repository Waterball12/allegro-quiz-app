import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";
import {ActivityIndicator, FAB, Modal, Portal, Surface, TextInput} from "react-native-paper";
// @ts-ignore
import BeginnerImage from "../../assets/images/music/ledger-lines.png";
import {Formik, FormikHelpers} from 'formik';
import {AnswerParams, CreateQuizParams, QuestionParams} from "../../types/Quiz";

const CreateGame = () => {

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    const handleSubmit = (values: CreateQuizParams, formikHelpers: FormikHelpers<CreateQuizParams>) => {
        setTimeout(() => {
            formikHelpers.resetForm();
        }, 1500);
    }

    return (
        <View style={styles.container}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Formik initialValues={{title: '', answer: [] as Array<AnswerParams>} as QuestionParams} onSubmit={values => console.log(values)}>
                        {({values, handleChange}) => (
                            <>
                                <View style={{padding: '20px'}}>
                                    <Surface>
                                        <TextInput
                                            label="Question title"
                                            value={values.title}
                                            mode="flat"
                                            onChangeText={handleChange('title')}
                                            style={{backgroundColor: '#fff'}}
                                        />
                                    </Surface>
                                </View>
                            </>
                        )}
                    </Formik>
                </Modal>
            </Portal>
            <Formik
                initialValues={{title: '', description: '', question: []} as CreateQuizParams}
                onSubmit={handleSubmit}
            >
                {({handleChange, values, submitForm, isSubmitting}) => (
                    <>
                        <ScrollView style={styles.subContainer}>
                            <View style={{padding: '20px'}}>
                                <Surface>
                                    <TextInput
                                        disabled={isSubmitting}
                                        label="Enter Title"
                                        value={values.title}
                                        mode="flat"
                                        onChangeText={handleChange('title')}
                                        style={{backgroundColor: '#fff'}}
                                    />
                                </Surface>
                            </View>

                            <View style={{padding: '20px'}}>
                                <Surface>
                                    <TextInput
                                        disabled={isSubmitting}
                                        label="Enter description"
                                        value={values.description}
                                        mode="flat"
                                        onChangeText={handleChange('description')}
                                        style={{backgroundColor: '#fff'}}
                                    />
                                </Surface>
                            </View>

                            <View style={{padding: '20px'}}>
                                <FAB
                                    disabled={isSubmitting}
                                    style={styles.questionBtn}
                                    icon="plus"
                                    onPress={showModal}
                                    color="#fff"
                                    label="Add question"
                                >
                                </FAB>
                            </View>
                            {isSubmitting && <ActivityIndicator animating={true} color={Colors.light.primary} />}

                        </ScrollView>
                        <FAB
                            disabled={isSubmitting}
                            style={styles.fab}
                            icon="folder"
                            onPress={submitForm}
                            label="Save"
                            color="#fff"
                        />
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.primaryLight
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.light.primary
    },
    questionBtn: {
        backgroundColor: Colors.light.primary
    },
    subContainer: {
        width: '100%',
        position: 'relative'
    },
});

export default CreateGame;