import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { globalStyle } from '../style/style';
import HTML from "react-native-render-html";

export default function StepScreen({ route }) {

  const contentWidth = useWindowDimensions().width;

    return (
    <ScrollView style={globalStyle.lessontext}>
      <HTML source={{ html: route.params.text }} contentWidth={contentWidth} />
    </ScrollView>
    );
    
}