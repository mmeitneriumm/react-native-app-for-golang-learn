import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionScreen from '../screens/QuestionScreen';
import TestScreen from '../screens/TestScreen';

const LessonsStack = createStackNavigator();

export default function LessonStack() {
  return (
    <LessonsStack.Navigator>
      <LessonsStack.Screen name="QuestionScreen" component={QuestionScreen} options={{headerShown: false}} />
      <LessonsStack.Screen name="TestScreen" component={TestScreen} options={({ route }) => ({ title: route.params.title })}/>
    </LessonsStack.Navigator>
  );
}