import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import StatisticScreen from './screens/StatisticScreen';
import LessonsStack from './components/LessonStackNavigator';
import QuestionStack from './components/QuestionStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Теория') {
              iconName = focused
                ? 'code-slash'
                : 'code-slash-outline';
            } else if (route.name === 'Тесты') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'Статистика') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4F59DF',
          inactiveTintColor: '#2A303F',
        }}
      >
        <Tab.Screen name="Теория" component={LessonsStack} />
        <Tab.Screen name="Тесты" component={QuestionStack} />
        <Tab.Screen name="Статистика" component={StatisticScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#EEF0F4',
    padding: 8,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});