import * as React from "react";
import { Text, View, Button } from "react-native";
import { globalStyle } from "../style/style";
import * as Progress from "react-native-progress";
import { cacheClear, cacheGet } from "../components/Cache";
import { useState, useEffect } from "react";

export default function StatisticScreen({ navigation }) {
  var tempAnswers = 0;
  const [answers, setAnswers] = useState([0]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (answers < 1) {
        for (let i = 0; i < 14; i++) {
          cacheGet("test" + i).then((el) => {
            if (el != null) {
              tempAnswers += +el;
              setAnswers(tempAnswers);
              console.log("test" + i + tempAnswers);
            }
          });
        }
        tempAnswers = 0;
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={globalStyle.maintext}>
      <Text style={{ color: "#4F59DF" }}>Статистика</Text>
      <View style={globalStyle.statistic}>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginTop: 80,
            marginBottom: 20,
            fontWeight: "bold",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          Прогресс выполнения курса: {answers + "/" + 35}
        </Text>
        {/* <Button title="test" onPress={() => cacheClear()} /> */}
      </View>
      <Progress.Pie progress={answers / 35} size={200} />
    </View>
  );
}
