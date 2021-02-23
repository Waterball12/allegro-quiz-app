import React from 'react';
import {View} from "react-native";
import {Header} from "react-native-elements";

export interface MinimalisticProps {
    children: React.ReactNode;
}

const Minimalistic = (props: MinimalisticProps) => {
    return (
        <View style={{width: '100%', height: '100%', position: 'relative'}}>
            {props.children}
        </View>
    );
};

export default Minimalistic;
