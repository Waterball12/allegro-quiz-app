/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {BottomTabParamList, TabCreateParamList, TabGameParamList, TabOneParamList} from '../types';
import BeginnerContent from "../screens/Music/BeginnerContent";
import Discover from "../screens/Discover";
import IntermediateContent from "../screens/Music/IntermediateContent";
import AdvancedContent from "../screens/Music/AdvancedContent";
import PinRoom from "../screens/Game/PinRoom";
import CreateGame from "../screens/Create/CreateGame";
import Quizzer from "../screens/Game/Quizzer";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabDiscover"
            tabBarOptions={{ activeTintColor: "#fff", inactiveTintColor: "#F6F6F6", style: {backgroundColor: Colors.light.primary} }}
        >
            <BottomTab.Screen
                name="TabDiscover"
                component={TabOneNavigator}
                options={{
                    title: "Discover",
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />
                }}
            />
            <BottomTab.Screen
                name="TabGame"
                component={TabGameNavigator}
                options={{
                    title: "Enter Pin",
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-git-pull-request-outline" color={color} />
                }}
            />
            <BottomTab.Screen
                name="TabCreate"
                component={TabCreateNavigator}
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-add-circle-outline" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const headerStyles = {
    headerStyle: {
        backgroundColor: Colors.light.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    }
}

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="Discover"
                component={Discover}
                options={{ headerTitle: "Allegro Quiz", headerTitleAlign: "center", ...headerStyles  }}
            />
            <TabOneStack.Screen
                name="Beginner"
                component={BeginnerContent}
                options={{ headerTitle: 'Music theory - Beginner', ...headerStyles }}
            />
            <TabOneStack.Screen
                name="Intermediate"
                component={IntermediateContent}
                options={{ headerTitle: 'Music theory - Intermediate', ...headerStyles }}
            />
            <TabOneStack.Screen
                name="Advanced"
                component={AdvancedContent}
                options={{ headerTitle: 'Music theory - Advanced', ...headerStyles }}
            />
        </TabOneStack.Navigator>
    );
}


const TabGameStack = createStackNavigator<TabGameParamList>();

function TabGameNavigator() {
    return (
        <TabGameStack.Navigator>
            <TabGameStack.Screen
                name="PinRoom"
                component={PinRoom}
                options={{ headerTitle: 'Pin Room', headerTitleAlign: 'center', ...headerStyles }}
            />
            <TabGameStack.Screen
                name="Quiz"
                component={Quizzer}
                options={{ headerTitle: 'Quiz', headerTitleAlign: 'center', ...headerStyles }}
            />
        </TabGameStack.Navigator>
    );
}

const TabCreateStack = createStackNavigator<TabCreateParamList>();

function TabCreateNavigator() {
  return (
    <TabCreateStack.Navigator>
      <TabCreateStack.Screen
        name="Create"
        component={CreateGame}
        options={{ headerTitle: 'Create a new game', headerTitleAlign: 'center', ...headerStyles }}
      />
    </TabCreateStack.Navigator>
  );
}
