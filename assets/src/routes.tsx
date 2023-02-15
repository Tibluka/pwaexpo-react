import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Camera from './pages/Camera';
import Main from './pages/Main';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Main} />
                <Tab.Screen name="Camera" component={Camera} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}