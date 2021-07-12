import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LessonScreen from '../screens/LessonScreen';
import StepScreen from '../screens/StepScreen';

const LessonsStack = createStackNavigator();

export default function LessonStack() {
  return (
    <LessonsStack.Navigator>
      <LessonsStack.Screen name="LessonScreen" component={LessonScreen} options={{headerShown: false}} />
      <LessonsStack.Screen name="StepScreen" component={StepScreen} options={({ route }) => ({ title: route.params.title })}/>
    </LessonsStack.Navigator>
  );
}