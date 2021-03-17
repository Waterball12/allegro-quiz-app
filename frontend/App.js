import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from "./screens/Home";
import Quizzer from "./screens/Quizzer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Music from "./screens/Music";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
            >
                <Tab.Screen
                    name="Home"
                    options={{
                        tabBarIcon: ({ focused, color, size }) => {

                            // You can return any component that you like here!
                            return <Ionicons name="ios-resize" size={size} color={color} />;
                        }
                    }}
                    component={Home}
                />
                <Tab.Screen
                    name="Quizzer"
                    component={Quizzer}
                />
                <Tab.Screen
                    name="music"
                    component={Music}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
